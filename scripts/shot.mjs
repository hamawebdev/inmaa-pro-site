#!/usr/bin/env node
/**
 * Looks at the page the way a visitor would, in Chrome.
 *
 *   npm run shot -- --locale ar --width 390                 whole page, phone width
 *   npm run shot -- --locale fr --width 1440 --split         whole page cut into screen-high slices
 *   npm run shot -- --section divisions --width 390          one section (by its id)
 *   npm run shot -- --locale all --width 390,1440 --split    every language at both widths
 *   npm run shot -- --links                                  list every link on the page
 *
 * Each run starts its own Vite server on a free port and stops it at the end,
 * so several people can run it at once. Pictures go to .shots/ (or --out DIR).
 * Every run also reports anything wider than the screen ("overflow").
 *
 * Options: --locale ar|fr|en|all  --width 390|1440|… (comma list)  --section ID
 *          --split  --no-header  --scale 1|2  --out DIR  --links  --wait MS
 */
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright-core";
import { createServer } from "vite";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

function parseArgs(argv) {
  const args = { locale: "ar", width: "1440", scale: "1", out: join(root, ".shots"), wait: "250" };
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    const name = key.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) args[name] = true;
    else {
      args[name] = next;
      i++;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const locales = args.locale === "all" ? ["ar", "fr", "en"] : String(args.locale).split(",");
const widths = String(args.width)
  .split(",")
  .map((w) => ({ phone: 390, desktop: 1440, tablet: 820 })[w] ?? Number(w));
const scale = Number(args.scale);
const outDir = resolve(String(args.out));
mkdirSync(outDir, { recursive: true });

const cacheDir = mkdtempSync(join(tmpdir(), "inmaa-site-vite-"));
const server = await createServer({
  root,
  configFile: join(root, "vite.config.ts"),
  cacheDir,
  logLevel: "error",
  clearScreen: false,
  server: { port: 5200 + Math.floor(Math.random() * 700), strictPort: false, hmr: false, watch: null },
});
await server.listen();
const base = server.resolvedUrls.local[0];

const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--hide-scrollbars"] });
let failed = false;

try {
  for (const locale of locales) {
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: { width, height: width < 700 ? 844 : 900 },
        deviceScaleFactor: scale,
        isMobile: width < 700,
        hasTouch: width < 700,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      await page.goto(`${base}?lang=${locale}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(Number(args.wait));
      if (args["no-header"]) await page.addStyleTag({ content: "[data-site-header]{display:none!important}" });

      const label = `${locale}-${width}${args.section ? `-${args.section}` : ""}`;
      if (errors.length) {
        failed = true;
        console.log(`[${label}] page errors:\n  ${errors.join("\n  ")}`);
      }

      // Overflow: lift the page's own clipping and measure what sticks out.
      const overflow = await page.evaluate(() => {
        const style = document.createElement("style");
        style.textContent = "html,body{overflow-x:visible!important}";
        document.head.appendChild(style);
        const vw = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        const offenders = [];
        if (sw > vw + 1) {
          for (const el of document.querySelectorAll("body *")) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;
            if (r.right > vw + 1 || r.left < -1) {
              // Report only the outermost element that sticks out.
              const parent = el.parentElement?.getBoundingClientRect();
              if (parent && (parent.right > vw + 1 || parent.left < -1)) continue;
              const cls = typeof el.className === "string" ? el.className.slice(0, 90) : "";
              const section = el.closest("section,header,footer")?.id || el.closest("header,footer")?.tagName.toLowerCase() || "";
              offenders.push(`${el.tagName.toLowerCase()} in #${section} [${Math.round(r.left)}..${Math.round(r.right)}] "${cls}"`);
            }
          }
        }
        style.remove();
        return { vw, sw, offenders: offenders.slice(0, 12) };
      });
      if (overflow.sw > overflow.vw + 1) {
        failed = true;
        console.log(`[${label}] OVERFLOW: page is ${overflow.sw}px wide in a ${overflow.vw}px window`);
        for (const o of overflow.offenders) console.log(`  ${o}`);
      } else console.log(`[${label}] overflow: none`);

      if (args.links) {
        const links = await page.$$eval("a[href]", (as) =>
          as.map((a) => `${a.getAttribute("href")}  <-  "${(a.textContent || a.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 60)}"${a.target ? ` (target=${a.target})` : ""}`),
        );
        console.log(`[${label}] ${links.length} links:\n  ${links.join("\n  ")}`);
      }

      if (args.section) {
        const el = page.locator(`#${args.section}`).first();
        if ((await el.count()) === 0) {
          failed = true;
          console.log(`[${label}] no element with id "${args.section}"`);
        } else {
          await el.scrollIntoViewIfNeeded();
          const file = join(outDir, `${label}.png`);
          await el.screenshot({ path: file });
          console.log(`[${label}] ${file}`);
        }
      } else if (args.split) {
        const height = await page.evaluate(() => document.documentElement.scrollHeight);
        const slice = width < 700 ? 1100 : 1000;
        let n = 0;
        for (let y = 0; y < height; y += slice) {
          n++;
          const file = join(outDir, `${label}-${String(n).padStart(2, "0")}.png`);
          await page.screenshot({ path: file, fullPage: true, clip: { x: 0, y, width, height: Math.min(slice, height - y) } });
        }
        console.log(`[${label}] ${n} slices of ${slice}px: ${join(outDir, `${label}-NN.png`)} (page ${height}px)`);
      } else if (!args.links) {
        const file = join(outDir, `${label}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`[${label}] ${file}`);
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await server.close();
  rmSync(cacheDir, { recursive: true, force: true });
}
process.exit(failed ? 1 : 0);

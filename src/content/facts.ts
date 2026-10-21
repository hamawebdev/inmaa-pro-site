/**
 * What the site may say, in three languages. Every list is the client's own,
 * taken from his request and contract forms (the Word files in the management
 * program's `client docs/`) and his worker registration form; the Arabic is his
 * wording. Sections draw their lists from here and write only their own prose.
 *
 * Nothing here may be invented: no prices, figures, client names, testimonials
 * or certifications. Every price comes from a first visit.
 */
import type { Localized } from "@/i18n/locale";

type Item = Localized;

// ── The centre ────────────────────────────────────────────────────────────────

export const centre = {
  /** His letterhead's Latin name. */
  latinName: "UNMAA Pro Center",
  shortName: { ar: "مركز إنماء برو", fr: "UNMAA Pro Center", en: "UNMAA Pro Center" } as Item,
  fullName: {
    ar: "مركز إنماء برو للتدريب والتنظيف والإحصاء",
    fr: "UNMAA Pro Center, centre de formation, de nettoyage et de statistique",
    en: "UNMAA Pro Center for training, cleaning and statistics",
  } as Item,
  tagline: {
    ar: "ثقتكم ... أساس نجاحنا",
    fr: "Votre confiance… le fondement de notre réussite",
    en: "Your trust… the foundation of our success",
  } as Item,
  city: { ar: "أم البواقي", fr: "Oum El Bouaghi", en: "Oum El Bouaghi" } as Item,
  country: { ar: "الجزائر", fr: "Algérie", en: "Algeria" } as Item,
  /** Cleaning is the subject of the site; the other two are mentioned only as the centre's other activities. */
  activities: {
    cleaning: { ar: "التنظيف", fr: "Nettoyage", en: "Cleaning" } as Item,
    training: { ar: "التدريب", fr: "Formation", en: "Training" } as Item,
    statistics: { ar: "الإحصاء", fr: "Statistique", en: "Statistics" } as Item,
  },
};

// ── Contact ───────────────────────────────────────────────────────────────────

export const contact = {
  /** As printed on his letterhead's footer: one number for calls and WhatsApp. */
  phoneDisplay: "0659 53 81 83",
  phoneInternational: "+213 659 53 81 83",
  phoneE164: "+213659538183",
  whatsappNumber: "213659538183",
  email: "unmaapro.center@gmail.com",
  /** His Facebook page. Named, never linked: its address is not known yet. */
  facebookPage: "مركز إنماء للخدمات",
  facebookPageLatin: "INMAA services center",
};

// ── The four divisions ────────────────────────────────────────────────────────

export const DIVISION_IDS = ["homes", "organisations", "buildings", "complexes"] as const;
export type DivisionId = (typeof DIVISION_IDS)[number];

export interface ItemGroup {
  /** His label for the group on the form. */
  label: Item;
  items: Item[];
}

export interface Division {
  id: DivisionId;
  name: Item;
  /** What the division covers, in a line. */
  scope: Item;
  /** Who or what the client is: property type, sector, who signs the contract. */
  kinds: ItemGroup[];
  /** The spaces his form describes for this kind of site (his «الوصف الفني للموقع», «مواصفات العمارة»), under a visitor's label. */
  spaces: ItemGroup;
  /** «الخدمات المقدمة»: the services ticked on this division's forms, in his order. */
  services: ItemGroup;
}

const SERVICES_LABEL: Item = { ar: "الخدمات المقدمة", fr: "Prestations proposées", en: "Services offered" };

const S = {
  floors: { ar: "تنظيف الأرضيات", fr: "Sols", en: "Floors" },
  kitchen: { ar: "تنظيف المطبخ", fr: "Cuisine", en: "Kitchen" },
  curtains: { ar: "تنظيف الستائر", fr: "Rideaux", en: "Curtains" },
  windows: { ar: "تنظيف النوافذ", fr: "Fenêtres", en: "Windows" },
  ceilings: { ar: "تنظيف الأسقف", fr: "Plafonds", en: "Ceilings" },
  fridge: { ar: "تنظيف الثلاجة", fr: "Réfrigérateur", en: "Fridge" },
  bathrooms: { ar: "تنظيف الحمامات", fr: "Salles de bain", en: "Bathrooms" },
  glass: { ar: "تنظيف الزجاج", fr: "Vitres", en: "Glass" },
  oven: { ar: "تنظيف الفرن", fr: "Four", en: "Oven" },
  carpets: { ar: "تنظيف السجاد", fr: "Tapis", en: "Carpets" },
  cupboards: { ar: "تنظيف الخزائن", fr: "Placards", en: "Cupboards" },
  childrenRooms: { ar: "تنظيف غرف الأطفال", fr: "Chambres d’enfants", en: "Children’s rooms" },
  garage: { ar: "تنظيف المرآب", fr: "Garage", en: "Garage" },
  furniture: { ar: "تنظيف الأثاث", fr: "Mobilier", en: "Furniture" },
  signs: { ar: "اللوحات والإعلانات", fr: "Enseignes et affichages", en: "Signs and displays" },
  toilets: { ar: "تنظيف دورات المياه", fr: "Sanitaires", en: "Toilets" },
  waste: { ar: "جمع وفرز النفايات", fr: "Collecte et tri des déchets", en: "Waste collection and sorting" },
  shelves: { ar: "تنظيف الرفوف", fr: "Étagères et rayonnages", en: "Shelves" },
  offices: { ar: "تنظيف المكاتب", fr: "Bureaux", en: "Offices" },
  carParks: { ar: "تنظيف مواقف السيارات", fr: "Parkings", en: "Car parks" },
  appliances: { ar: "تنظيف الأجهزة", fr: "Appareils", en: "Appliances" },
  receptionHall: { ar: "تنظيف قاعة الاستقبال", fr: "Hall d’accueil", en: "Reception hall" },
  meetingRooms: { ar: "تنظيف قاعات الاجتماعات", fr: "Salles de réunion", en: "Meeting rooms" },
  stores: { ar: "تنظيف المخازن", fr: "Réserves et entrepôts", en: "Storerooms" },
  gardens: { ar: "تنظيف الحدائق", fr: "Jardins", en: "Gardens" },
  courtyards: { ar: "الساحات", fr: "Cours", en: "Courtyards" },
  sweepDust: { ar: "كنس وإزالة الغبار", fr: "Balayage et dépoussiérage", en: "Sweeping and dusting" },
  stains: { ar: "تنظيف البقع", fr: "Taches", en: "Stains" },
  doors: { ar: "تنظيف الأبواب", fr: "Portes", en: "Doors" },
  corridors: { ar: "تنظيف الممرات", fr: "Couloirs", en: "Corridors" },
  walls: { ar: "تنظيف الجدران", fr: "Murs", en: "Walls" },
  corners: { ar: "تنظيف الزوايا", fr: "Coins et recoins", en: "Corners" },
  mailboxes: { ar: "تنظيف صناديق البريد", fr: "Boîtes aux lettres", en: "Mailboxes" },
  entrances: { ar: "المداخل", fr: "Entrées", en: "Entrances" },
  pavements: { ar: "الأرصفة", fr: "Trottoirs", en: "Pavements" },
} satisfies Record<string, Item>;

/** His building form, which the residential complexes use too. */
const BUILDING_SERVICES: Item[] = [
  S.floors, S.courtyards, S.sweepDust, S.stains, S.doors,
  S.ceilings, S.corridors, S.windows, S.waste, S.walls,
  S.glass, S.corners, S.mailboxes, S.carParks, S.appliances,
  S.entrances, S.pavements, S.garage, S.stores, S.gardens,
];

const CONTRACTING_PARTIES: ItemGroup = {
  label: { ar: "جهة التعاقد", fr: "Qui signe le contrat", en: "Who signs the contract" },
  items: [
    { ar: "مالك العمارة", fr: "Le propriétaire de l’immeuble", en: "The building’s owner" },
    { ar: "ممثل السكان", fr: "Le représentant des habitants", en: "The residents’ representative" },
    { ar: "مسير الإقامة", fr: "Le gestionnaire de la résidence", en: "The residence manager" },
    { ar: "سانديك", fr: "Le syndic", en: "The syndic" },
    { ar: "جمعية السكان", fr: "L’association des habitants", en: "The residents’ association" },
    { ar: "شركة تسيير عقاري", fr: "Une société de gestion immobilière", en: "A property management company" },
  ],
};

export const divisions: Division[] = [
  {
    id: "homes",
    name: { ar: "المنازل", fr: "Logements", en: "Homes" },
    scope: { ar: "الشقق والفلل", fr: "Appartements et villas", en: "Flats and villas" },
    kinds: [
      {
        label: { ar: "نوع العقار", fr: "Type de logement", en: "Type of home" },
        items: [
          { ar: "منزل", fr: "Maison", en: "House" },
          { ar: "شقة", fr: "Appartement", en: "Flat" },
          { ar: "دوبلكس", fr: "Duplex", en: "Duplex" },
          { ar: "فيلا", fr: "Villa", en: "Villa" },
        ],
      },
    ],
    spaces: {
      label: { ar: "الغرف والفضاءات", fr: "Les pièces et espaces", en: "Rooms and spaces" },
      items: [
        { ar: "الغرف", fr: "Chambres", en: "Bedrooms" },
        { ar: "المجالس", fr: "Pièces de réception", en: "Sitting rooms" },
        { ar: "الصالونات", fr: "Salons", en: "Lounges" },
        { ar: "المطابخ", fr: "Cuisines", en: "Kitchens" },
        { ar: "الحمامات", fr: "Salles de bain", en: "Bathrooms" },
        { ar: "الشرفات", fr: "Balcons", en: "Balconies" },
        { ar: "النوافذ", fr: "Fenêtres", en: "Windows" },
        { ar: "الأرضيات", fr: "Sols", en: "Floors" },
        { ar: "الحديقة", fr: "Jardin", en: "Garden" },
        { ar: "الفناء", fr: "Cour", en: "Courtyard" },
      ],
    },
    services: {
      label: SERVICES_LABEL,
      items: [
        S.floors, S.kitchen, S.curtains, S.windows,
        S.ceilings, S.fridge, S.bathrooms,
        S.glass, S.oven, S.carpets,
        S.cupboards, S.childrenRooms, S.garage,
      ],
    },
  },
  {
    id: "organisations",
    name: { ar: "المؤسسات", fr: "Établissements", en: "Organisations" },
    scope: {
      ar: "المحلات والمؤسسات الاقتصادية، القطاع العام والخاص",
      fr: "Commerces et entreprises, secteur public et privé",
      en: "Shops and businesses, public and private sector",
    },
    kinds: [
      {
        label: { ar: "نوع العقار", fr: "Type de local", en: "Type of premises" },
        items: [
          { ar: "محل صغير", fr: "Petit local", en: "Small shop" },
          { ar: "محل كبير", fr: "Grand local", en: "Large shop" },
          { ar: "شركة", fr: "Société", en: "Company" },
          { ar: "F2", fr: "F2", en: "F2" },
          { ar: "F3", fr: "F3", en: "F3" },
          { ar: "F4", fr: "F4", en: "F4" },
          { ar: "F5", fr: "F5", en: "F5" },
        ],
      },
      {
        label: { ar: "قطاع العمل", fr: "Secteur", en: "Sector" },
        items: [
          { ar: "عام", fr: "Public", en: "Public" },
          { ar: "خاص", fr: "Privé", en: "Private" },
        ],
      },
    ],
    spaces: {
      label: { ar: "المحلات والمرافق", fr: "Les locaux", en: "The premises" },
      items: [
        { ar: "المباني", fr: "Bâtiments", en: "Buildings" },
        { ar: "المكاتب", fr: "Bureaux", en: "Offices" },
        { ar: "القاعات", fr: "Salles", en: "Halls" },
        { ar: "المخازن", fr: "Réserves", en: "Storerooms" },
        { ar: "دورات المياه", fr: "Sanitaires", en: "Toilets" },
        { ar: "المطابخ", fr: "Cuisines", en: "Kitchens" },
        { ar: "النوافذ", fr: "Fenêtres", en: "Windows" },
        { ar: "الأبواب", fr: "Portes", en: "Doors" },
        { ar: "الأرضيات", fr: "Sols", en: "Floors" },
        { ar: "مواقف السيارات", fr: "Parkings", en: "Car parks" },
        { ar: "المداخل", fr: "Entrées", en: "Entrances" },
        { ar: "المخارج", fr: "Sorties", en: "Exits" },
      ],
    },
    services: {
      label: SERVICES_LABEL,
      items: [
        S.floors, S.kitchen, S.curtains, S.furniture, S.signs,
        S.ceilings, S.toilets, S.windows, S.waste, S.shelves,
        S.glass, S.offices, S.carpets, S.carParks, S.appliances,
        S.receptionHall, S.meetingRooms, S.garage, S.stores, S.gardens,
      ],
    },
  },
  {
    id: "buildings",
    name: { ar: "العمارات", fr: "Immeubles", en: "Apartment buildings" },
    scope: {
      ar: "الأجزاء المشتركة للعمارة",
      fr: "Les parties communes de l’immeuble",
      en: "The building’s common parts",
    },
    kinds: [CONTRACTING_PARTIES],
    spaces: {
      label: { ar: "الأجزاء المشتركة", fr: "Les parties communes", en: "The common parts" },
      items: [
        { ar: "المداخل", fr: "Entrées", en: "Entrances" },
        { ar: "الطوابق", fr: "Étages", en: "Storeys" },
        { ar: "السلالم", fr: "Escaliers", en: "Staircases" },
        { ar: "الممرات", fr: "Couloirs", en: "Corridors" },
        { ar: "المصاعد", fr: "Ascenseurs", en: "Lifts" },
        { ar: "الأقبية", fr: "Caves", en: "Cellars" },
        { ar: "المساحات الخضراء", fr: "Espaces verts", en: "Green spaces" },
        { ar: "المرائب", fr: "Garages", en: "Garages" },
        { ar: "الأسطح المشتركة", fr: "Terrasses communes", en: "Shared roofs" },
      ],
    },
    services: { label: SERVICES_LABEL, items: BUILDING_SERVICES },
  },
  {
    id: "complexes",
    name: { ar: "التجمعات السكنية", fr: "Ensembles résidentiels", en: "Residential complexes" },
    scope: {
      ar: "الساحات والمداخل والفضاءات المشتركة",
      fr: "Cours, entrées et espaces partagés",
      en: "Courtyards, entrances and shared spaces",
    },
    kinds: [CONTRACTING_PARTIES],
    spaces: {
      label: { ar: "الفضاءات المشتركة", fr: "Les espaces partagés", en: "The shared spaces" },
      items: [
        { ar: "الساحات", fr: "Cours", en: "Courtyards" },
        { ar: "المداخل", fr: "Entrées", en: "Entrances" },
        { ar: "الأرصفة", fr: "Trottoirs", en: "Pavements" },
        { ar: "المساحات الخضراء", fr: "Espaces verts", en: "Green spaces" },
        { ar: "مواقف السيارات", fr: "Parkings", en: "Car parks" },
        { ar: "المرائب", fr: "Garages", en: "Garages" },
        { ar: "السلالم", fr: "Escaliers", en: "Staircases" },
        { ar: "الممرات", fr: "Couloirs", en: "Corridors" },
        { ar: "صناديق البريد", fr: "Boîtes aux lettres", en: "Mailboxes" },
      ],
    },
    services: { label: SERVICES_LABEL, items: BUILDING_SERVICES },
  },
];

// ── Two ways to hire ──────────────────────────────────────────────────────────

export const serviceTypes = {
  onDemand: { ar: "عند الطلب", fr: "À la demande", en: "On demand" } as Item,
  contract: { ar: "عقد", fr: "Contrat", en: "Contract" } as Item,
};

/** «نوع الطلب» on his on-demand forms. */
export const requestKinds: Item[] = [
  { ar: "شامل", fr: "Complet", en: "Full" },
  { ar: "عميق", fr: "En profondeur", en: "Deep" },
];

/** «مدة التنفيذ» of an on-demand job is counted in hours or in days. */
export const durationUnits: Item[] = [
  { ar: "بالساعات", fr: "En heures", en: "In hours" },
  { ar: "بالأيام", fr: "En jours", en: "In days" },
];

/** «مدة العقد». */
export const contractDurations: Item[] = [
  { ar: "شهر", fr: "Un mois", en: "One month" },
  { ar: "3 أشهر", fr: "3 mois", en: "3 months" },
  { ar: "6 أشهر", fr: "6 mois", en: "6 months" },
  { ar: "سنة", fr: "Un an", en: "One year" },
];

/** «عدد الزيارات», one to six a week. `count` is the number. */
export const visitsPerWeek: Array<Item & { count: number }> = [
  { count: 1, ar: "واحدة بالأسبوع", fr: "Une fois par semaine", en: "Once a week" },
  { count: 2, ar: "اثنين بالأسبوع", fr: "Deux fois par semaine", en: "Twice a week" },
  { count: 3, ar: "ثلاثة بالأسبوع", fr: "Trois fois par semaine", en: "Three times a week" },
  { count: 4, ar: "أربعة بالأسبوع", fr: "Quatre fois par semaine", en: "Four times a week" },
  { count: 5, ar: "خمسة بالأسبوع", fr: "Cinq fois par semaine", en: "Five times a week" },
  { count: 6, ar: "ستة بالأسبوع", fr: "Six fois par semaine", en: "Six times a week" },
];

/** «أيام التنفيذ»: Saturday to Thursday, as his client forms list them. */
export const workDays: Array<{ name: Item; short: Item }> = [
  { name: { ar: "السبت", fr: "Samedi", en: "Saturday" }, short: { ar: "سبت", fr: "Sam", en: "Sat" } },
  { name: { ar: "الأحد", fr: "Dimanche", en: "Sunday" }, short: { ar: "أحد", fr: "Dim", en: "Sun" } },
  { name: { ar: "الاثنين", fr: "Lundi", en: "Monday" }, short: { ar: "اثنين", fr: "Lun", en: "Mon" } },
  { name: { ar: "الثلاثاء", fr: "Mardi", en: "Tuesday" }, short: { ar: "ثلاثاء", fr: "Mar", en: "Tue" } },
  { name: { ar: "الأربعاء", fr: "Mercredi", en: "Wednesday" }, short: { ar: "أربعاء", fr: "Mer", en: "Wed" } },
  { name: { ar: "الخميس", fr: "Jeudi", en: "Thursday" }, short: { ar: "خميس", fr: "Jeu", en: "Thu" } },
];

/** «تحديد الفترة». */
export const dayPeriods: Item[] = [
  { ar: "الصباحية", fr: "Le matin", en: "Morning" },
  { ar: "المسائية", fr: "Le soir", en: "Evening" },
  { ar: "معا", fr: "Les deux", en: "Both" },
];

/** «دورية السداد» on his contract forms. */
export const paymentFrequencies: Item[] = [
  { ar: "بعد كل زيارة", fr: "Après chaque passage", en: "After each visit" },
  { ar: "أسبوعيا", fr: "Chaque semaine", en: "Weekly" },
  { ar: "كل أسبوعين", fr: "Toutes les deux semaines", en: "Every two weeks" },
  { ar: "كل شهر", fr: "Chaque mois", en: "Monthly" },
];

/** «طريقة السداد». */
export const paymentMethods: Item[] = [
  { ar: "نقدًا", fr: "En espèces", en: "Cash" },
  { ar: "تحويل بنكي", fr: "Virement bancaire", en: "Bank transfer" },
  { ar: "تحويل بريدي", fr: "Virement postal", en: "Postal transfer" },
];

/** «مواد التنظيف» and «توفير النقل»: each is borne by the centre or by the client, as the contract says. */
export const bearers: Item[] = [
  { ar: "على عاتق المركز", fr: "À la charge du centre", en: "Borne by the centre" },
  { ar: "على عاتق صاحبها", fr: "À la charge du client", en: "Borne by the client" },
];
export const bornItems = {
  materials: { ar: "مواد التنظيف", fr: "Produits de nettoyage", en: "Cleaning products" } as Item,
  transport: { ar: "توفير النقل", fr: "Transport", en: "Transport" } as Item,
};

/** «دخول الفريق»: how the team gets in. */
export const teamAccess: Item[] = [
  { ar: "عن طريق الحارس", fr: "Par le gardien", en: "Through the caretaker" },
  { ar: "مفتاح خاص", fr: "Avec une clé confiée", en: "With a key you entrust" },
  { ar: "مسؤول العمارة", fr: "Par le responsable de l’immeuble", en: "Through the building manager" },
  { ar: "باب مفتوح خلال ساعات العمل", fr: "Porte ouverte pendant les heures de travail", en: "Door open during working hours" },
];

// ── Programmed services ───────────────────────────────────────────────────────

/** «الخدمات المبرمجة»: the occasions he lists on every form. */
export const programmedServices: Array<{ id: string; name: Item }> = [
  { id: "periodic", name: { ar: "تنظيف دوري", fr: "Nettoyage périodique", en: "Regular cleaning" } },
  { id: "after-construction", name: { ar: "تنظيف بعد البناء", fr: "Nettoyage après construction", en: "After construction" } },
  { id: "after-renovation", name: { ar: "تنظيف بعد الترميم", fr: "Nettoyage après rénovation", en: "After renovation" } },
  { id: "after-banquets", name: { ar: "تنظيف بعد الولائم", fr: "Nettoyage après une réception", en: "After a banquet" } },
  { id: "deep", name: { ar: "تنظيف شامل وعميق", fr: "Nettoyage complet en profondeur", en: "Full deep clean" } },
  { id: "after-travel", name: { ar: "تنظيف بعد السفر", fr: "Nettoyage au retour de voyage", en: "After a trip away" } },
  { id: "ramadan", name: { ar: "تنظيف رمضان", fr: "Grand ménage du Ramadan", en: "Ramadan cleaning" } },
  { id: "debris", name: { ar: "إزالة المخلفات", fr: "Évacuation des déchets et gravats", en: "Debris removal" } },
  { id: "events", name: { ar: "تنظيف قبل وبعد المناسبات", fr: "Avant et après vos événements", en: "Before and after events" } },
];

// ── How it works ──────────────────────────────────────────────────────────────

/** The path of every file at the centre, from the first call to the visits. */
export const processSteps: Array<{ id: string; name: Item }> = [
  { id: "request", name: { ar: "الطلب", fr: "La demande", en: "Your request" } },
  { id: "first-visit", name: { ar: "الزيارة الأولى", fr: "La première visite", en: "The first visit" } },
  { id: "quote", name: { ar: "عرض السعر", fr: "Le devis", en: "The quote" } },
  { id: "contract", name: { ar: "العقد", fr: "Le contrat", en: "The contract" } },
  { id: "visits", name: { ar: "الزيارات", fr: "Les passages", en: "The visits" } },
  { id: "quality", name: { ar: "الجودة والمتابعة", fr: "Qualité et suivi", en: "Quality and follow-up" } },
];

// ── The team: what every worker signs ─────────────────────────────────────────

/**
 * «إقرار وتعهد» on his worker registration form: each worker signs it on
 * joining. Only the lines that concern the client are here.
 */
export const workerPledge: Item[] = [
  { ar: "الالتزام بالمواعيد المحددة", fr: "Respecter les horaires convenus", en: "Keep to the agreed times" },
  { ar: "المحافظة على ممتلكات المؤسسة والعملاء", fr: "Préserver les biens du centre et des clients", en: "Look after the centre’s and clients’ property" },
  { ar: "عدم إفشاء أي معلومات تخص العملاء", fr: "Ne divulguer aucune information sur les clients", en: "Disclose nothing about clients" },
  { ar: "حسن التعامل مع العملاء", fr: "Se montrer courtois avec les clients", en: "Treat clients courteously" },
  { ar: "ارتداء الزي الرسمي أثناء العمل", fr: "Porter la tenue de travail", en: "Wear the uniform at work" },
  { ar: "الالتزام بتعليمات المشرف", fr: "Suivre les consignes du superviseur", en: "Follow the supervisor’s instructions" },
  { ar: "الإبلاغ الفوري عن أي حادث أو ضرر", fr: "Signaler sans délai tout incident ou dommage", en: "Report any incident or damage at once" },
  { ar: "عدم قبول أي مبالغ أو هدايا من العملاء دون علم المؤسسة", fr: "N’accepter ni argent ni cadeau d’un client à l’insu du centre", en: "Accept no money or gifts from clients without the centre’s knowledge" },
];

/** From the internal rules the worker signs (articles 7, 8 and 11). */
export const workerRules: Array<{ title: Item; text: Item }> = [
  {
    title: { ar: "ممتلكات العملاء", fr: "Les biens du client", en: "Your belongings" },
    text: {
      ar: "يجب المحافظة على ممتلكات العميل، ويمنع فتح الخزائن أو الأدراج أو استعمال الأشياء الشخصية دون إذن.",
      fr: "Les biens du client sont préservés : interdiction d’ouvrir placards ou tiroirs, ou d’utiliser ses affaires personnelles, sans sa permission.",
      en: "The client’s property is looked after: no opening cupboards or drawers, or using personal belongings, without permission.",
    },
  },
  {
    title: { ar: "السرية والخصوصية", fr: "Discrétion et vie privée", en: "Privacy" },
    text: {
      ar: "يلتزم العامل بعدم تصوير أو نشر أو نقل أي معلومات أو صور تخص العملاء أو المؤسسات، وعدم إفشاء أسرارهم.",
      fr: "L’agent ne photographie, ne publie et ne transmet aucune information ni image concernant les clients ou les établissements.",
      en: "Workers take, publish and pass on no information or pictures about clients or organisations, and keep their confidences.",
    },
  },
  {
    title: { ar: "الشكاوى", fr: "Les réclamations", en: "Complaints" },
    text: {
      ar: "لا يدخل العامل في نزاع مع العميل، تُرفع أي شكوى أو مشكلة فورًا إلى المشرف لمعالجتها رسميًا.",
      fr: "L’agent n’entre jamais en conflit avec le client : toute réclamation est remontée au superviseur, qui la traite officiellement.",
      en: "Workers never argue with a client: any complaint or problem goes straight to the supervisor, who deals with it formally.",
    },
  },
];

/** «القاعدة الذهبية للعامل», the last line of the rules every worker signs. */
export const goldenRule = {
  title: { ar: "القاعدة الذهبية للعامل", fr: "La règle d’or de l’agent", en: "The worker’s golden rule" } as Item,
  text: {
    ar: "احضر في الوقت، نظّف بإتقان، احترم العميل، حافظ على ممتلكاته، حافظ على معدات المؤسسة، التزم بالتعليمات، وأبلغ عن أي مشكلة فورًا.",
    fr: "Arrive à l’heure, nettoie avec soin, respecte le client, préserve ses biens, préserve le matériel du centre, suis les consignes et signale tout problème sans attendre.",
    en: "Arrive on time, clean thoroughly, respect the client, look after their belongings, look after the centre’s equipment, follow instructions, and report any problem at once.",
  } as Item,
};

/** What each worker is evaluated on (article 16). */
export const evaluationCriteria: Item[] = [
  { ar: "الانضباط", fr: "La discipline", en: "Discipline" },
  { ar: "الحضور", fr: "L’assiduité", en: "Attendance" },
  { ar: "جودة التنظيف", fr: "La qualité du nettoyage", en: "Quality of cleaning" },
  { ar: "احترام العميل", fr: "Le respect du client", en: "Respect for the client" },
  { ar: "المحافظة على المعدات", fr: "Le soin du matériel", en: "Care of equipment" },
  { ar: "السلامة", fr: "La sécurité", en: "Safety" },
  { ar: "الالتزام بالبرنامج", fr: "Le respect du programme", en: "Keeping to the programme" },
];

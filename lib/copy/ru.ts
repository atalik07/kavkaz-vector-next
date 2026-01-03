export const ru = {
  brand: {
    name: "Кавказский",
    tagline: "вектор",
  },

  nav: {
    tours: "Туры",
    about: "О нас",
    contacts: "Контакты",
  },

  theme: {
    label: "Тема",
    system: "Авто",
    light: "Светлая",
    dark: "Тёмная",
  },

  hero: {
    titleLine1: "Путешествия",
    titleLine2: "по Северному Кавказу",
    subtitle: "Незабываемые впечатления в сердце Кавказских гор",
    ctaTours: "Смотреть туры",
    ctaContacts: "Контакты",
    imageAlt: "Горы Кавказа (Эльбрус)",
  },

  tours: {
    title: "Туры",
    descriptionPlaceholder:
      "Здесь будет список туров (позже из Sanity). Пока заглушка.",
  },

  about: {
    title: "О нас",
    descriptionPlaceholder: "Описание — позже будет из админки.",
  },

  contacts: {
    title: "Контакты",
    descriptionPlaceholder: "Контакты — позже.",
  },

  footer: {
    copyright: "© {year} Кавказский вектор",
  },

  seo: {
    title: "Кавказский вектор",
    description: "Незабываемые приключения в сердце Кавказских гор",
  },
} as const;

export type Copy = typeof ru;

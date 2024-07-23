export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Gerenciamento de Documentos e Tradutores",
  description: "Sistema de gerenciamento de documentos e tradutores",
  navItems: [
    {
      label: "Tradutores",
      href: "/translators",
    },
    {
      label: "Documentos",
      href: "/documents",
    },
    {
      label: "Importações",
      href: "/imports",
    },
  ],
  links: {
    github: "https://github.com/yurikaffer",
  },
};

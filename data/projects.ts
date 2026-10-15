export type Project = {
  id: string; slug: string; title: string; year: string;
  categories: string[]; role: string; description: string; featured: boolean;
  accent: string; tone: string; cover: string; coverAlt: string; coverWidth: number;
  context: string; direction: string; heading: string; study?: {src: string; poster: string; title: string; description: string};
  images: { src: string; alt: string; caption: string }[];
};

export const projects: Project[] = [
  {
    id: "01", slug: "rooftop-arquitetura", title: "Rooftop Arquitetura", year: "",
    categories: ["Identidade visual", "Arquitetura"], role: "Identidade visual e direção de arte",
    description: "Uma assinatura construída para ocupar a escala dos espaços que a marca imagina.",
    featured: true, accent: "#33235d", tone: "tone-a",
    cover: "/projects/rooftop-premium.webp", coverWidth: 1672,
    heading: "Arquitetura em forma de assinatura.",
    study: {src: "/media/studies/stone.mp4", poster: "/media/studies/stone-poster.webp", title: "Luz, pedra e metal", description: "Um estudo cinematográfico de materialidade para a direção de arte do projeto. A cena explora superfícies e luz; a assinatura original está apresentada nas aplicações estáticas."},
    coverAlt: "Marca original Rooftop Arquitetura aplicada em placa metálica sobre pedra natural",
    context: "A identidade da Rooftop precisava traduzir uma atuação ligada à arquitetura em uma linguagem reconhecível, capaz de acompanhar apresentações, peças digitais e imagens de projetos.",
    direction: "O desenho vertical da assinatura estabelece uma presença precisa. A marca combina formas arquitetônicas, tipografia expressiva e uma paleta de azuis e violetas aplicada com consistência.",
    images: [
      { src: "/projects/rooftop-mark.webp", alt: "Assinatura Rooftop Arquitetura em composição violeta", caption: "Assinatura visual" },
      { src: "/projects/rooftop-system.webp", alt: "Variações da assinatura Rooftop no manual da marca", caption: "Sistema de assinatura" },
    ],
  },
  {
    id: "02", slug: "simetria-estetica", title: "Simetria Estética", year: "",
    categories: ["Identidade visual", "Estética"], role: "Identidade visual e aplicações",
    description: "Equilíbrio visual para uma marca de estética voltada ao cuidado.",
    featured: true, accent: "#315b49", tone: "tone-b",
    cover: "/projects/simetria-premium.webp", coverWidth: 1536,
    heading: "Uma presença que acolhe.",
    coverAlt: "Marca original Simetria Estética aplicada em painel verde na recepção",
    context: "A apresentação da Simetria Estética pede proximidade e confiança. Sua identidade precisava se manter clara em comunicação institucional e em objetos de uso cotidiano.",
    direction: "A assinatura combina um símbolo circular de movimento com uma tipografia contida. Verde, tons claros e um padrão geométrico criam continuidade entre peças e aplicações.",
    images: [
      { src: "/projects/simetria-mark.webp", alt: "Assinatura Simetria Estética e padrão gráfico sobre fundo verde", caption: "Assinatura e padrão" },
      { src: "/projects/simetria-detail.webp", alt: "Detalhe da assinatura original Simetria em painel verde", caption: "Estudo de sinalização · composição digital" },
    ],
  },
  {
    id: "03", slug: "amanda-araujo", title: "Amanda Araújo", year: "",
    categories: ["Identidade visual", "Consultoria financeira"], role: "Identidade visual e aplicações",
    description: "Uma marca pessoal com presença firme e acabamento cuidadoso.",
    featured: true, accent: "#b6503d", tone: "tone-c",
    cover: "/projects/amanda-premium.webp", coverWidth: 1024, coverAlt: "Assinatura original Amanda Araújo em pasta institucional grafite sobre pedra clara",
    heading: "Confiança em cada ponto de contato.",
    context: "Para uma consultoria financeira, a identidade precisava comunicar profissionalismo sem perder a presença pessoal de quem assina o trabalho.",
    direction: "O monograma e a assinatura tipográfica compõem uma linguagem direta. O laranja do símbolo, o contraste da assinatura e os suportes sóbrios organizam uma apresentação profissional, com atenção à legibilidade.",
    images: [
      { src: "/projects/amanda-cover.webp", alt: "Marca Amanda Araújo gravada em couro marrom", caption: "Aplicação original em couro" },
      { src: "/projects/amanda-signature.webp", alt: "Assinatura original Amanda Araújo, com símbolo laranja e tipografia branca", caption: "Assinatura visual original" },
    ],
  },
  {
    id: "04", slug: "eduardo-noronha", title: "Eduardo Noronha", year: "",
    categories: ["Identidade visual", "Advocacia"], role: "Identidade visual e manual da marca",
    description: "Uma assinatura institucional que ganha presença nos materiais certos.",
    featured: true, accent: "#a9683e", tone: "tone-d",
    cover: "/projects/eduardo-paper.webp", coverWidth: 864,
    heading: "Reconhecimento e sobriedade.",
    coverAlt: "Assinatura Eduardo Noronha impressa em papel texturizado branco, com acabamento laranja",
    context: "A identidade de Eduardo Noronha Advogado precisava reunir reconhecimento e sobriedade em diferentes pontos de contato profissionais.",
    direction: "O monograma geométrico EN se articula com uma tipografia direta. O manual apresenta contrastes de cor e aplicações em superfícies arquitetônicas e papelaria.",
    images: [
      { src: "/projects/eduardo-cover.webp", alt: "Marca Eduardo Noronha aplicada em parede", caption: "Aplicação arquitetônica original" },
      { src: "/projects/eduardo-stationery.webp", alt: "Sistema original de papelaria Eduardo Noronha, em azul e laranja", caption: "Sistema de papelaria original" },
    ],
  },
];

export const archivedProjects: Project[] = [{
  id: "05", slug: "reacesso", title: "REACESSO", year: "", categories: ["Identidade visual", "Aplicações"], role: "Identidade visual e aplicações",
  description: "Um símbolo de ritmo próprio, pensado para circular.", featured: false, accent: "#00af83", tone: "tone-e",
  cover: "/projects/reacesso-application.webp", coverWidth: 1600, coverAlt: "Boné preto com símbolo REACESSO em verde", heading: "Uma linguagem de alta identificação.",
  context: "REACESSO tem uma linguagem visual de alta identificação. O sistema foi explorado em suportes de diferentes escalas e materiais.",
  direction: "O símbolo angular, o verde intenso e a base escura criam contraste imediato. A identidade mantém leitura em crachá, vestuário e pequenos objetos.",
  images: [{src: "/projects/reacesso-detail.webp", alt: "Bottons verdes com símbolo REACESSO", caption: "Aplicação em pequena escala"}, {src: "/projects/reacesso-shirt.webp", alt: "Camiseta preta REACESSO com assinatura em verde", caption: "Aplicação em vestuário"}]
}];

export const getProject = (slug: string) => [...projects, ...archivedProjects].find((project) => project.slug === slug);

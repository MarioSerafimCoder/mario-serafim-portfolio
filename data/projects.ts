export type Project = {
  id: string; slug: string; title: string; year: string;
  categories: string[]; role: string; description: string; featured: boolean; accent: string; tone: string;
};

export const projects: Project[] = [
  { id:"01", slug:"granistone", title:"Granistone", year:"2026", categories:["Direção de Marca","Identidade Visual"], role:"Direção Criativa / Direção de Arte", description:"Matéria, peso e ritmo arquitetônico traduzidos em uma linguagem de marca.", featured:true, accent:"#8d8e89", tone:"tone-a" },
  { id:"02", slug:"queen-aquamarine", title:"Queen Aquamarine", year:"2025", categories:["Identidade Visual","Campanha"], role:"Direção de Arte", description:"Um estudo de identidade que equilibra precisão, escala e tipografia expressiva.", featured:true, accent:"#a5a6a2", tone:"tone-b" },
  { id:"03", slug:"fenda", title:"Fenda", year:"2025", categories:["Campanha","Experiência Digital"], role:"Direção Criativa", description:"Uma linguagem modular de campanha preparada para mudar entre formatos e telas.", featured:true, accent:"#777875", tone:"tone-c" },
  { id:"04", slug:"common-ground", title:"Common Ground", year:"2024", categories:["Design de Produto","Sistema Visual"], role:"Produto / Direção de Arte", description:"Uma interface que organiza informação complexa em um espaço claro e compartilhado.", featured:true, accent:"#b7b6b1", tone:"tone-d" },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

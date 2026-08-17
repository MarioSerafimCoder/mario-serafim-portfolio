export type Project = {
  id: string; slug: string; title: string; year: string; client: string;
  categories: string[]; role: string; description: string; featured: boolean; accent: string; tone: string;
};

export const projects: Project[] = [
  { id:"01", slug:"granistone", title:"Granistone", year:"2026", client:"[Add client]", categories:["Brand Direction","Visual Identity"], role:"Creative / Art Direction", description:"A visual system shaped around material, weight and architectural rhythm.", featured:true, accent:"#8d8e89", tone:"tone-a" },
  { id:"02", slug:"queen-aquamarine", title:"Queen Aquamarine", year:"2025", client:"[Add client]", categories:["Visual Identity","Campaign"], role:"Art Direction", description:"An identity study balancing precision, scale and expressive typography.", featured:true, accent:"#a5a6a2", tone:"tone-b" },
  { id:"03", slug:"fenda", title:"Fenda", year:"2025", client:"[Add client]", categories:["Campaign","Digital Experience"], role:"Creative Direction", description:"A modular campaign language built to shift across formats and screens.", featured:true, accent:"#777875", tone:"tone-c" },
  { id:"04", slug:"common-ground", title:"Common Ground", year:"2024", client:"[Add client]", categories:["Product Design","Visual System"], role:"Product / Art Direction", description:"A digital system that turns complex information into a clear shared space.", featured:true, accent:"#b7b6b1", tone:"tone-d" },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

import type { MetadataRoute } from "next";
import { projects } from "../data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mario-serafim-portfolio.mario-92.chatgpt.site";
  const routes = ["", "/work", "/process", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...routes.map((path) => ({ url: base + path, lastModified: new Date() })),
    ...projects.map((project) => ({ url: `${base}/work/${project.slug}`, lastModified: new Date() })),
  ];
}

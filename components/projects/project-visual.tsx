import type { CSSProperties } from "react";
import type { Project } from "../../data/projects";
import { FrameCorners } from "../interaction/frame-corners";

type ProjectVisualProps = {
  project: Project;
  context?: "card" | "hero" | "preview";
  className?: string;
};

const variants: Record<string, string> = {
  granistone: "material",
  "queen-aquamarine": "refracao",
  fenda: "divisao",
  "common-ground": "modulos",
};

export function ProjectVisual({ project, context = "card", className = "" }: ProjectVisualProps) {
  const variant = variants[project.slug] ?? "modulos";
  const style = {
    "--project-accent": project.accent,
    viewTransitionName: context === "preview" ? "none" : `project-${project.slug}`,
  } as CSSProperties;

  return (
    <div
      className={`project-visual project-visual--${variant} project-visual--${context} ${className}`}
      style={style}
      role="img"
      aria-label={`Composição visual procedural do projeto ${project.title}`}
      data-project={project.slug}
      data-media-slot="image|video|sequence|scroll-scrub"
      data-cursor="VER"
    >
      <div className="project-visual__system" aria-hidden="true">
        {Array.from({ length: variant === "modulos" ? 12 : 8 }, (_, index) => (
          <span key={index} style={{ "--i": index } as CSSProperties} />
        ))}
      </div>
      <div className="project-visual__label">
        <span>{project.id} / MS</span>
        <strong>{project.title}</strong>
        <small>{project.categories[0]}</small>
      </div>
      <FrameCorners />
    </div>
  );
}

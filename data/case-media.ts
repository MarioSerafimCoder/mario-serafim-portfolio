export type CaseAsset = { src: string; alt: string; caption: string; width: number; height: number };
// Add only approved project materials. Empty slots are intentionally disclosed.
export const caseMedia: Record<string, { context: string; title: string; application: string; assets: CaseAsset[] }> = {
  granistone: { context: "Matéria e presença de marca", title: "O peso da matéria.", application: "Materiais de marca e aplicações editoriais", assets: [] },
  "queen-aquamarine": { context: "Identidade e linguagem de campanha", title: "Luz como princípio.", application: "Identidade aplicada e peças de campanha", assets: [] },
  fenda: { context: "Campanha e variação de formatos", title: "O corte organiza.", application: "Variações de campanha entre formatos", assets: [] },
  "common-ground": { context: "Produto digital e organização da informação", title: "Um espaço comum.", application: "Interfaces e estados do produto", assets: [] },
};

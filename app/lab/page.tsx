import type { Metadata } from "next";
import { LabPlayground } from "../../components/lab/lab-playground";

export const metadata: Metadata = { title: "MS/LAB — Mário Serafim", description: "Experimentos visuais e sistemas interativos construídos em código." };

export default function LabPage() {
  return (
    <main className="inner-page dark-page lab-page">
      <header className="page-hero lab-hero"><p>03 / CAMPO DE EXPERIMENTOS</p><h1>MS/LAB.</h1><p>Quatro sistemas leves construídos em código. Sem mídia externa, sem APIs e sem som.</p></header>
      <section className="lab-manifesto"><p>Método de trabalho</p><h2>Testar rápido.<br />Guardar o essencial.</h2><p>O Laboratório documenta perguntas em movimento. Cada experimento transforma tipografia, grade, imagem ou identidade em uma ferramenta para pensar.</p></section>
      <LabPlayground />
      <section className="lab-status"><p>Status do sistema</p>{["Tipografia responsiva","Módulos reorganizáveis","Grade variável","Identidade cinética"].map((item, index) => <div key={item}><span>00{index + 1}</span><strong>{item}</strong></div>)}</section>
    </main>
  );
}

import type { Metadata } from "next";
import { LabPlayground } from "../../components/lab/lab-playground";

export const metadata: Metadata = { title: "MS/LAB — Mário Serafim", description: "Experimentos visuais e sistemas interativos construídos em código." };

export default function LabPage() {
  return (
    <main className="inner-page dark-page lab-page">
      <header className="page-hero lab-hero"><p>03 / CAMPO DE EXPERIMENTOS</p><h1>MS/LAB.</h1><p>Quatro estudos sobre tipografia, imagem, grade e identidade em movimento.</p></header>
      <section className="lab-manifesto"><p>Método de trabalho</p><h2>Testar rápido.<br />Guardar o essencial.</h2><p>O Laboratório documenta perguntas em movimento. Cada experimento transforma tipografia, grade, imagem ou identidade em uma ferramenta para pensar.</p></section>
      <LabPlayground />
    </main>
  );
}

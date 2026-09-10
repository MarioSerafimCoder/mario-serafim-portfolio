import type { Metadata } from "next";
import { LabPlayground } from "../../components/lab/lab-playground";

export const metadata: Metadata = { title: "MS/LAB — Mário Serafim", description: "Experimentos com tipografia, imagem, movimento e código." };

export default function LabPage() {
  return (
    <main className="inner-page dark-page lab-page">
      <header className="page-hero lab-hero"><p>03 / CAMPO DE EXPERIMENTOS</p><h1>MS/LAB.</h1><p>Quatro estudos sobre tipografia, imagem, grade e identidade em movimento.</p></header>
      <section className="lab-manifesto"><p>Método de trabalho</p><h2>Testar rápido.<br />Guardar o essencial.</h2><p>MS/LAB é onde testo ferramentas, comportamentos e linguagens antes de saber exatamente onde elas vão parar.</p></section>
      <LabPlayground />
    </main>
  );
}

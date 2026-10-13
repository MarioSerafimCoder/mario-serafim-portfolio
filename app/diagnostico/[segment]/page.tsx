import { notFound } from "next/navigation";
import { LeadForm } from "../../../components/lead-form";
export const metadata = { title: "Sua avaliação de marca | Mário Serafim" };
export default async function Page({ params }: { params: Promise<{ segment: string }> }) { const { segment } = await params; if (!["medicos", "arquitetos"].includes(segment)) notFound(); return <main className="diagnostic-page"><p className="eyebrow">Diagnóstico / {segment === "medicos" ? "Medicina" : "Arquitetura"}</p><h1>Sua marca,<br />em perspectiva.</h1><p>Responda com base no que você faz hoje. O relatório inicial apresenta recomendações a partir das suas respostas, sem análise automatizada de peças.</p><LeadForm diagnostic initialSegment={segment} /></main>; }

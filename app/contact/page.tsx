import type { Metadata } from "next";
import { ContactForm } from "../../components/contact-form";

export const metadata: Metadata = { title: "Contato", description: "Converse com Mário Serafim sobre um projeto de identidade visual ou direção de arte." };

export default function ContactPage() {
  return <main className="subpage contact-page content-wrap">
    <header className="subpage-heading"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Contato / próximo projeto</span><h1>Vamos<br /><em>conversar.</em></h1><p>Conte o essencial sobre a sua marca. A conversa começa por aqui.</p></header>
    <div className="contact-layout"><div className="contact-direct"><span className="eyebrow">Contato direto</span><a href="mailto:marioserafim.da@gmail.com">marioserafim.da@gmail.com <span aria-hidden="true">↗</span></a><p>Se preferir, escreva por e-mail. Compartilhe seu contexto e o que deseja desenvolver.</p></div><ContactForm /></div>
    <section className="contact-next-steps" aria-labelledby="contact-next-title"><div><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Depois do envio</span><h2 id="contact-next-title">O próximo passo, sem ruído.</h2></div><ol><li><span>01</span><strong>Leitura do contexto</strong><p>Reviso sua mensagem, o momento da marca e o que precisa ser construído.</p></li><li><span>02</span><strong>Conversa inicial</strong><p>Retorno por e-mail para alinhar objetivos, necessidades e os pontos de contato prioritários.</p></li><li><span>03</span><strong>Escopo e proposta</strong><p>Com o cenário definido, apresento o escopo recomendado, as etapas e as condições para começarmos.</p></li></ol></section>
  </main>;
}

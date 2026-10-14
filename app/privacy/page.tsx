import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacidade" };

export default function Privacy() {
  return <main className="legal-page">
    <p>Atualizada em 14/10/2026</p>
    <h1>Privacidade.</h1>
    <h2>Seus dados e seu contato</h2>
    <p>Mário Serafim é responsável pelas informações recebidas por este site. Para solicitar acesso, correção, exclusão ou revogar uma autorização, escreva para <a href="mailto:marioserafim.da@gmail.com">marioserafim.da@gmail.com</a>.</p>
    <h2>Formulário de contato</h2>
    <p>Ao enviar o formulário, registramos nome, e-mail, empresa ou marca informada, descrição do projeto, data, autorização para resposta e eventuais parâmetros de campanha. Essas informações são usadas para responder à sua solicitação. O cadastro só é confirmado após a gravação no banco de dados operado na infraestrutura Cloudflare.</p>
    <h2>Proteção e retenção</h2>
    <p>Não inclua dados sensíveis ou informações de terceiros na descrição do projeto. Um identificador temporário derivado do endereço de rede limita envios excessivos; o endereço de rede não é armazenado em texto aberto. O registro temporário expira em uma hora e é removido em envios posteriores. Os contatos são mantidos pelo tempo necessário ao atendimento ou até pedido de exclusão, ressalvadas obrigações aplicáveis.</p>
    <h2>No navegador</h2>
    <p>Parâmetros de campanha podem permanecer durante a sessão para identificar a origem do contato. O formulário não inscreve você em comunicações comerciais.</p>
  </main>;
}

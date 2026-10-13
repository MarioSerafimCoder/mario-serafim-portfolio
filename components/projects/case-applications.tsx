/* eslint-disable @next/next/no-img-element -- Approved local assets have explicit dimensions. */
import { caseMedia } from "../../data/case-media";
export function CaseApplications({ slug }: { slug: string }) {
 const media = caseMedia[slug];
 return <div className="case-applications"><h3>{media.application}</h3>{media.assets.length ? media.assets.map(asset => <figure className="case-media" key={asset.src}><img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} loading="lazy" /><figcaption>{asset.caption}</figcaption></figure>) : <p className="case-media-empty">Materiais definitivos ainda não publicados. As composições desta página são estudos de linguagem, não registros de aplicações comerciais executadas.</p>}</div>;
}

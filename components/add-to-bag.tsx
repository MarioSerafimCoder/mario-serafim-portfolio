"use client";
export function AddToBag({ item, disabled=false }: { item:{slug:string;name:string;price:number}; disabled?:boolean }) {
  return <button className="solid-button" data-cursor={disabled ? undefined : "ABRIR"} disabled={disabled} onClick={() => window.dispatchEvent(new CustomEvent("ms:add-to-bag",{detail:item}))}>{disabled ? "Em breve" : "Colocar na sacola"}</button>;
}

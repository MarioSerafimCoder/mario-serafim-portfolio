export type Product = { id:string; slug:string; name:string; description:string; category:string; price:number; currency:string; status:"available"|"coming-soon"|"sold-out"|"draft"; compatibility:string[]; version:string; fileType:string; fileSize:string; license:string; tone:string; };
export const products: Product[] = [
  { id:"P01", slug:"brand-presentation-system", name:"Brand Presentation System", description:"A modular presentation framework for clear, confident brand stories.", category:"Templates", price:79, currency:"BRL", status:"coming-soon", compatibility:["Figma","Keynote"], version:"1.0", fileType:"Template", fileSize:"[Add file size]", license:"Personal / Commercial", tone:"tone-a" },
  { id:"P02", slug:"creative-review-toolkit", name:"Creative Review Toolkit", description:"A practical structure for focused reviews and better creative decisions.", category:"Tools", price:49, currency:"BRL", status:"coming-soon", compatibility:["PDF","Notion"], version:"1.0", fileType:"Digital toolkit", fileSize:"[Add file size]", license:"Personal / Commercial", tone:"tone-c" },
];
export const getProduct = (slug:string) => products.find((product) => product.slug === slug);

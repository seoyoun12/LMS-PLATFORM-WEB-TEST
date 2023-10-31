import dynamic from "next/dynamic";

// export {CategoryCard } from './CategoryCard';

 export const CategoryCard = dynamic(()=> import('./CategoryCard') , {ssr:false})

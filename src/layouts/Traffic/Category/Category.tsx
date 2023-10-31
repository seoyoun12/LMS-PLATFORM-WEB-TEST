import { CategoryBoard } from '@components/ui/Traffic/CategoryBoard';
import { CategoryCard}  from '@components/ui/Traffic/CategoryCard';
import { CategoryCarousel } from '@components/ui/Traffic/CategoryCarousel';





export function Category() {
  return (
    <>
      <CategoryCarousel />
      <CategoryCard />
      <CategoryBoard />
    </>
  );
}

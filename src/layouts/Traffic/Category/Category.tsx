import { CategoryBoard } from "@components/ui/Traffic/CategoryBoard";
import { CategoryCard } from "@components/ui/Traffic/CategoryCard";
import { CategoryCarousel } from "@components/ui/Traffic/CategoryCarousel";

const bannerData = [
  {
    id: 1,
    img: '/assets/images/banner.jpg',
    title: 'test 1',
    description: 'description 1',
  },
  {
    id: 2,
    img: '/assets/images/banner.jpg',
    title: 'test 2',
    description: 'description 2',
  },
];

export function Category() {

  return (
    <div>
      <CategoryCarousel datas={bannerData} />

      <CategoryCard />

      <CategoryBoard />
    </div>
  );
}

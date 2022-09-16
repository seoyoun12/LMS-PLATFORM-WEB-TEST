import { CategoryBoard } from '@components/ui/Traffic/CategoryBoard';
import { CategoryCard } from '@components/ui/Traffic/CategoryCard';
import { CategoryCarousel } from '@components/ui/Traffic/CategoryCarousel';
import { CategoryCarouselMobile } from '@components/ui/Traffic/CategoryCarouselMobile';
import useResponsive from '@hooks/useResponsive';

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
  const isDesktop = useResponsive(1024);

  return (
    <div>
      {isDesktop ? (
        <CategoryCarousel datas={bannerData} />
      ) : (
        <CategoryCarouselMobile datas={bannerData} />
      )}

      <CategoryCard />

      <CategoryBoard />
    </div>
  );
}

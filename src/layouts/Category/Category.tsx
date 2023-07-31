import { CategoryCarousel } from '@components/ui';
import { Box } from '@mui/material';
import { CategoryCard } from '@components/ui/CategoryCard/CategoryCard';
import { CategoryBoard } from '@components/ui/CategoryBoard/CategoryBoard';
import useResponsive from '@hooks/useResponsive';
import { CategoryCarouselMobile } from '@components/ui/CategoryCarouselMobile';

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
    <>
      {
        isDesktop
        ? <CategoryCarousel datas={bannerData} />
        : <CategoryCarouselMobile datas={bannerData} />
      }
      <CategoryCard></CategoryCard>
      
      {/* 게시판 */}
      <CategoryBoard></CategoryBoard>
    </>
  );
}
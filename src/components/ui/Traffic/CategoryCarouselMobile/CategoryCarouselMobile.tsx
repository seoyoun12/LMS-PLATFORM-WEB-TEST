import { Navigation, Pagination, Controller, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useBannerList } from '@common/api/banner';
import useResponsive from '@hooks/useResponsive';
import { Spinner } from '@components/ui/Spinner';

interface Datas {
  id: number;
  img: string;
  title: string;
  description: string;
}

export const CategoryCarouselMobile = ({ datas: deprecated }: { datas: Array<any> }) => {
  const [firstSwiper, setFirstSwiper] = useState();
  const [secondSwiper, setSecondSwiper] = useState();
  const [swiperPageNumber, setSwiperPageNumber] = useState(0);
  // const { data, error } = useBannerList();
  const { data: BannerData } = useBannerList();
  const isDesktop = useResponsive(768);

  // 배너 타입 결정
  const data = BannerData?.filter(
    item => item.bannerTypeEnums === 'BANNER_TYPE_PROVINCIAL'
  );

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);

  const chkPages = (num: number) => {
    return num < 10 ? '0' + num : num;
  };

  const progress = () => {
    const progressbar = document.querySelector('.timeline-current');
    progressbar?.animate({ width: '100%' }, 4000);
    // const test = progressbar?.animate({ width: '100%' }, 4000);
    // test?.cancel();
    // test?.play();
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      width < 767 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  if (!data) return <Spinner />;
  if (!deprecated?.length) return <div>loading</div>;
  return (
    <Slider>
      <Swiper
        className="mobile-swiper"
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        // loop={true}
        // autoplay={{
        //   delay: 4000,
        //   disableOnInteraction: false,
        // }}
        // style={{ height: '200px' }}
      >
        <SwiperSlide>
          {data.length > 0 && data[0].s3Files.length > 0 ? (
            <Image
              src={data[0].s3Files[0].path}
              alt=""
              layout="fill"
              objectFit="cover"
              style={{ paddingRight: '16px' }}
            />
          ) : (
            <Box width="100%" height="100%" sx={{ background: '#d6d6d6' }} />
          )}
        </SwiperSlide>
        {/* {data.map(item => (
          <SwiperSlide // key props error
            key={item.seq}
            className="slide-item"
          >
            <Image
              className="slide-image"
              src={item.s3Files[0].path}
              alt=""
              layout="fill"
              style={{ paddingRight: '16px' }}
            />
          </SwiperSlide>
          
        ))} */}
      </Swiper>
    </Slider>
  );
};

const Slider = styled.div`
  position: relative;
  /* background: linear-gradient(
      270.44deg,
      rgb(255, 122, 0) 0.21%,
      rgba(255, 122, 0, 0.4) 99.18%
    )
    0% 0% / 100%; */
  /* margin-bottom: 32px; */

  .mobile-swiper {
    width: 100%;
    height: calc((100vw / 16) * 9);
  }

  //공부해야함.
  .slide-item {
    & > span {
      position: unset !important;
      & .slide-image {
        object-fit: contain;
        width: 100% !important;
        position: relative !important;
        height: calc((100vw / 16) * 9) !important;
      }
    }
  }

  .swiper-z-index {
    z-index: 111;
  }
`;

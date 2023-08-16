import { Navigation, Pagination, Controller, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useBannerList } from '@common/api/banner';
import { Spinner } from '../Spinner';


// 진성 정신병자 코드
export const CategoryCarousel = ({ datas: deprecated }: { datas: Array<any> }) => {
  const [firstSwiper, setFirstSwiper] = useState();
  const [secondSwiper, setSecondSwiper] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [swiperPageNumber, setSwiperPageNumber] = useState(0);
  const { data: BannerData } = useBannerList();
  
  // 배너 타입 결정
  const data = BannerData?.filter(item =>
    localStorage.getItem('site_course_type') === 'TYPE_TRANS_WORKER'
      ? item.bannerTypeEnums === 'BANNER_TYPE_TRANSPORT_WORKER'
      : item.bannerTypeEnums === 'BANNER_TYPE_LOW_FLOOR_BUS'
  );

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  
  useEffect(() => {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      width < 767 ? setIsMobile(true) : setIsMobile(false);
    });
    return () => {
      window.removeEventListener('resize', () => {
        const width = window.innerWidth;
        width < 767 ? setIsMobile(true) : setIsMobile(false);
      });
    }
  }, []);
  if (!data) return <Spinner />;
  if (!deprecated?.length) return <div>loading</div>;

  return (
    <Slider>
      <ImgBox width="100%" height="100%">
        <ImgOpacity></ImgOpacity>
        <ImgBack>
          {data.length > 0 && data[swiperPageNumber].s3Files.length > 0 ? (
            <Image src={data[swiperPageNumber].s3Files[0].path} layout="fill" alt='images' />
          ) : (
            <Box width="100%" height="100%" sx={{ background: '#e9e9e9' }} />
          )}
        </ImgBack>
      </ImgBox>
      <SliderLayout
        style={isMobile ? { flexDirection: 'column-reverse' } : { flexDirection: 'row' }}
      >
        <Swiper
          className="swiper-z-index"
          modules={[Navigation, Pagination, Controller, Autoplay]}
          spaceBetween={300}
          slidesPerView={1}
          onSwiper={(swiper: any) => setFirstSwiper(swiper)}
          controller={{ control: secondSwiper }}
          style={{
            maxWidth: '640px',
            width: '100%',
            minHeight: '360px',
            marginLeft: '0',
            top: '32px',
          }}
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
        </Swiper>

        <Swiper
          className="swiper-z-index"
          modules={[Navigation, Pagination, Controller, Autoplay]}
          spaceBetween={300}
          slidesPerView={1}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          resizeObserver={false}
          
          onSwiper={(swiper: any) => {
            setSecondSwiper(swiper);
          }}
          controller={{ control: firstSwiper }}
          style={
            isMobile
              ? {
                  margin: '20px 0',
                }
              : {
                  maxWidth: '450px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '32px 0',
                  marginLeft: '4px',
                }
          }
        > 
          <SwiperSlide key={data.length > 0 && data[0].seq}>
            <SlideInfo>
              <Box fontSize="24px" fontWeight="bold">
                {data.length > 0 &&
                  data[0].title.split('\n').map((item, idx) => {
                    if (idx > 1) return;
                    return <div key={idx} dangerouslySetInnerHTML={{ __html: item }} />;
                  })}
              </Box>
              <Box>
                {data.length > 0 &&
                  data[0].content.split('\n').map((item, idx) => {
                    if (idx > 8) return;
                    return <div key={idx} dangerouslySetInnerHTML={{ __html: item }} />;
                  })}
              </Box>
            </SlideInfo>
          </SwiperSlide>
        </Swiper>
      </SliderLayout>
    </Slider>
  );
};

const Slider = styled.div`
  position: relative;
  .swiper-z-index {
    z-index: 111;
  }
  .red {
    color: red;
  }
`;
const ImgBox = styled(Box)`
  position: absolute;
  width: 100%;
  overflow: hidden;
`;
const ImgOpacity = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;
`;
const ImgBack = styled(Box)`
  width: 100%;
  height: 100%;
  transform: scale(1.1);
  filter: blur(8px);
`;

const SliderLayout = styled.div`
  max-width: 1176px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  padding: 0 20px;
`;

const SlideInfo = styled.div`
  color: #fff;

  h1 {
    font-size: 34px;
    font-weight: 900;
    word-break: keep-all;
    padding: 16px 0 8px 0;
  }

  p {
    font-size: 16px;
    padding: 8px 0;
  }
`;

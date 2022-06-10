import { Navigation, Pagination, Controller, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';

interface Datas {
  id: number;
  img: string;
  title: string;
  description: string;
}

export const Carousel = ({ datas }: { datas: Array<any> }) => {
  const [ firstSwiper, setFirstSwiper ] = useState();
  const [ secondSwiper, setSecondSwiper ] = useState();

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);

  const chkPages = (num: number) => {
    return num < 10 ? '0' + num : num;
  };

  const progress = () => {
    const progressbar = document.querySelector('.timeline-current');
    progressbar?.animate({ 'width': '100%' }, 4000);
  };

  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      let width = window.innerWidth;
      width < 767 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  if (!datas?.length) return <div>loading</div>;
  return (
    <Slider>
      <SliderLayout style={isMobile ? { flexDirection: 'column-reverse' } : { flexDirection: 'row' }}>
        <Swiper
          modules={[ Navigation, Pagination, Controller, Autoplay ]}
          spaceBetween={300}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper: any) => setFirstSwiper(swiper)}
          // controller={{ control: secondSwiper }}
          style={{ maxWidth: '676px', width: '100%', marginLeft: '0', top: '32px' }}
        >
          {datas.map((data: Datas) => {
            return (
              <SwiperSlide key={data.id}>
                {isMobile ? (
                  <img src={data.img} alt=""
                       style={{ paddingRight: '16px', width: '100%', height: '192px', objectFit: 'cover' }} />
                ) : (
                  <img src={data.img} alt="" style={{ paddingRight: '16px', width: '100%' }} />
                )}

              </SwiperSlide>
            );
          })}
        </Swiper>

        <Swiper
          modules={[ Navigation, Pagination, Controller, Autoplay ]}
          spaceBetween={300}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          pagination={{
            type: 'custom',
            el: paginationRef.current,
            renderCustom: function (swiper, current, total) {
              return (`
                <span>${chkPages(current)}</span>
                <span style="font-size: 12px; margin: 0 4px">|</span>
                <span>${chkPages(total)}</span>
              `);
            },
          }}
          resizeObserver={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          onRealIndexChange={progress}
          onInit={progress}
          onSwiper={(swiper: any) => setSecondSwiper(swiper)}
          // controller={{ control: firstSwiper }}
          style={isMobile ? {
            margin: '20px 0',
          } : {
            maxWidth: '450px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '32px 0',
          }}
        >
          {datas.map((data: Datas) => {
            return (
              <SwiperSlide key={data.id}>
                <SlideInfo>
                  <Typography variant="h1" className="bold-700">{data.title}</Typography>
                  <Typography variant="inherit">{data.description}</Typography>
                </SlideInfo>
              </SwiperSlide>
            );
          })}

          {!isMobile ?
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                ref={paginationRef}
                style={{ display: 'inline-flex', alignItems: 'center', color: '#fff', width: 'initial', }}
              />
              <Timeline>
                <div className="timeline-bg">
                  <div className="timeline-current"></div>
                </div>
              </Timeline>
              <>
                <SliderButton ref={navigationPrevRef}>
                  <span className="swiper-button-prev"></span>
                </SliderButton>
                <SliderButton ref={navigationNextRef}>
                  <span className="swiper-button-next"></span>
                </SliderButton>
              </>
            </div>
            : ``}

        </Swiper>
      </SliderLayout>
    </Slider>
  );
};

const Slider = styled.div`
  background: linear-gradient(270.44deg,
  rgb(255, 122, 0) 0.21%,
  rgba(255, 122, 0, 0.4) 99.18%) 0% 0% / 100%;
  margin-bottom: 32px;
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

const Timeline = styled.div`
  display: flex;
  padding: 0 14px;
  flex: 1;

  .timeline-bg {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    height: 2px;
    overflow: hidden;
  }

  .timeline-current {
    width: 0;
    height: 2px;
    background: #fff;
  }
`;

const SliderButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background: rgba(255, 255, 255, 0.4);
  }

  span {
    position: inherit;
    width: 100%;
    height: 100%;
    margin: 0;

    &::after {
      font-size: 16px;
      color: #fff;
    }
  }
`;

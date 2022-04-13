import { Navigation, Pagination, Controller, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';

export const Carousel = ({datas}) => {
    console.log(datas)
    const [controlleredSlider, setControlleredSlider] = useState(null);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const paginationRef = useRef(null);

    const chkPages = (num) => {
        return num < 10 ? "0" + num : num;
    }

    const slideChangeAuto = () => {
        const timeline = document.querySelector('.timeline-current');
        timeline?.classList.add('timeline');

        setTimeout(() => {
            timeline?.classList.remove('timeline');
        }, 4000);
    }
    
    return (
        <Slider>
            <SliderLayout>
                <Swiper
                    modules={[Navigation, Pagination, Controller]}
                    spaceBetween={300}
                    slidesPerView={1}
                    loop={true}
                    touchRatio={0}
                    onSwiper={setControlleredSlider}
                    style={{maxWidth: "676px", marginLeft: "0", top: "32px"}}
                >
                    <SwiperSlide>
                        <img src="/assets/images/banner.jpg" width="676px" alt="" style={ {paddingRight: "16px"} } />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/images/banner.jpg" width="676px" alt="" style={ {paddingRight: "16px"} } />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/images/banner.jpg" width="676px" alt="" style={ {paddingRight: "16px"} } />
                    </SwiperSlide>
                </Swiper>

                <Swiper
                    modules={[Navigation, Pagination, Controller, Autoplay]}
                    spaceBetween={300}
                    slidesPerView={1}
                    loop={true}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current
                    }}
                    pagination={{
                        type: "custom",
                        el: paginationRef.current,
                        renderCustom: function(swiper, current, total){
                            return(`
                                <span>${chkPages(current)}</span>
                                <span style="font-size: 12px; margin: 0 4px">|</span>
                                <span>${chkPages(total)}</span>
                            `)
                        }
                    }}
                    autoplay={{ 
                        delay: 4000,
                        disableOnInteraction: false
                    }}
                    onActiveIndexChange={slideChangeAuto}
                    touchRatio={0}
                    controller={{control: controlleredSlider}}
                    style={{maxWidth: "450px", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px 0"}}
                >
                    <SwiperSlide>
                        <SlideInfo>
                            <h1>Test1</h1>
                            <span>description 1</span>
                        </SlideInfo>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideInfo>
                            <h1>Test2</h1>
                            <span>description 2</span>
                        </SlideInfo>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideInfo>
                            <h1>Test3</h1>
                            <span>description 3</span>
                        </SlideInfo>
                    </SwiperSlide>

                    <div style={{display: "flex", alignItems: "center"}}>
                        <>
                            <div ref={paginationRef} style={{display: "inline-flex", alignItems: "center", color: "#fff", width: "initial"}} />
                        </>
                        <>
                            <Timeline>
                                <div className='timeline-bg'>
                                    <div className='timeline-current'></div>
                                </div>
                            </Timeline>
                        </>
                        <>
                            <SliderButton ref={navigationPrevRef}><span className='swiper-button-prev'></span></SliderButton>
                            <SliderButton ref={navigationNextRef}><span className='swiper-button-next'></span></SliderButton>
                        </>
                    </div>
                </Swiper>
            </SliderLayout>
        </Slider>
    );
}

const Slider = styled.div`
    background: linear-gradient(270.44deg, rgb(255, 122, 0) 0.21%, rgba(255, 122, 0, 0.4) 99.18%) 0% 0% / 100%;
    margin-bottom: 32px;
`;

const SliderLayout = styled.div`
    max-width: 1176px;
    width: 100%;
    display: flex;
    margin: 0 auto;
`;

const SlideInfo = styled.div`
    h1{
        font-size: 34px;
        font-weight: 900;
        word-break: keep-all;
        padding: 16px 0;
        color: #fff;
    }

    span{
        font-size: 16px;
        padding: 16px 0;
        color: #fff;
    }
`;

const Timeline = styled.div`
    display: flex;
    padding: 0 14px;
    flex: 1;

    .timeline-bg{
        width: 100%;
        background-color: rgba(255, 255, 255, 0.4);
        height: 2px;
        overflow: hidden;
    }

    .timeline-current{
        width: 0%;
        height: 2px;
        background: #fff;
    }

    .timeline{
        animation: progressbar 4s linear;
    }

    @keyframes progressbar{
        0%{
            width: 0%;
        }
        100%{
            width: 100%;
        }
    }
`;

const SliderButton = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    :hover{
        background: rgba(255, 255, 255, 0.4)
    }

    span{
        position: inherit;
        width: 100%;
        height: 100%;
        margin: 0;

        &::after{
            font-size: 16px;
            color: #fff;
        }
    }
`;
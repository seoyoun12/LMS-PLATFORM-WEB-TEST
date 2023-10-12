import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useBannerList } from '@common/api/banner';
import { Spinner } from '@components/ui/Spinner';


export const CategoryCarousel = () => {
  
  
  const { data: BannerData } = useBannerList();
  const data = BannerData?.filter(item => item.bannerTypeEnums === 'BANNER_TYPE_PROVINCIAL');


  if (!data) return <Spinner />;
  
  return (
    <Box sx={{position:'relative'}}>
      <Banner>
        {data.length > 0 && data[0].s3Files.length > 0
        ? <>
        <ContentBox>
        <BasicImage
          src={data[0].s3Files[0].path}
          alt='도민교통교육'
        />
        <TextWrapper>
        <Typography fontSize="24px" fontWeight="bold">
          {data.length > 0 &&
            data[0].title.split('\n').map((item, idx) => {
              if (idx > 1) return;
              return <div key={idx} dangerouslySetInnerHTML={{ __html: item }} />;
            })}
        </Typography>
        
        <Typography>
          {data.length > 0 &&
            data[0].content.split('\n').map((item, idx) => {
              if (idx > 8) return;
              return <div key={idx} dangerouslySetInnerHTML={{ __html: item }} />;
            })}
        </Typography>
      </TextWrapper>
      </ContentBox>
        <ImageWrapper>
          <Image
            src={data[0].s3Files[0].path}
            width={1920}
            height={360}
            style={{
              minHeight: '360px',
            }}
            layout='fixed'
            alt='도민교통교육 백페이스'
          />
        </ImageWrapper>
        </>
        : <Box width="100%" height="100%" sx={{ background: '#d6d6d6' }} />
        }
      </Banner>
      
    </Box>
  );
};

const Banner = styled.div`
  width: 100%;  
  position: relative;
`


const ImageWrapper = styled(Box)`
 @media (min-width: 1024px) {
  filter: blur(4px) brightness(0.7);
 }
 @media (max-width: 1024px) {
    display: none;
  }
 margin-bottom: 48px;
`

const ContentBox = styled(Box)`
  position: absolute;
  display:flex;
  width: 100%;
  bottom: -40px;
  // center
  left: 50%;
  /* transform: translateX(-35%); */
  z-index: 20;
  @media (max-width: 1024px) {
    position: relative;
    width: 100%;
    left: 0;
    transform: translateX(0);
    bottom: 0;
    z-index: 0;
  } 
  @media (min-width: 1024px) {
    transform: translateX(-45%);
  }
  @media (min-width: 1280px) {
    transform: translateX(-35%);
  }

`
const BasicImage = styled.img`
  width: 640px;
  height: 360px;
  z-index: 10;
  @media (max-width: 1024px) {
    width: 100%;
  } 
`

const TextWrapper = styled(Box)`
  
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 32px;
  @media (max-width: 1024px) {
    display: none;
  }
`
import { MaterialTabType } from '@layouts/Traffic/LearningMaterial';
import { useRouter } from 'next/router';
import { useGetLearningMaterialDetail } from '@common/api/learningMaterial';
import {
  GuideDetailHeaderDateText,
  GuideDetailHeaderDateWrapper,
  GuideDetailHeaderTitleText,
  GuideDetailHeaderWrapper,
  GuideDetailWrapper,
  SlideArrowLeft,
  SlideArrowRight,
  SlideContainer,
  SlideContentContainer,
  SlideItem,
  SlideProgressBarWrapper,
  SlideProgressContainer,
  SlideProgressContentWrapper,
  SlideProgressSelectedText,
  SlideProgressText,
  SlideProgressTextWrapper,
  SlideThumbContainer,
  SlideThumbItem,
  SlideThumbWrapper,
  SlideWrapper,
} from '@layouts/Traffic/LearningMaterial/LearningGuide/Detail/style';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import useEmblaCarousel from 'embla-carousel-react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useCallback, useEffect, useState } from 'react';

export default function LearningGuideDetailLayout() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { id } = router.query as {
    type: MaterialTabType;
    id: string;
  };
  const { data } = useGetLearningMaterialDetail(id);

  const [slideRef, slide] = useEmblaCarousel({
    loop: true,
  });

  const [thumbRef, thumb] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const handleClickLeft = useCallback(() => {
    if (slideRef) {
      slide.scrollPrev();
    }
  }, [slideRef, slide]);

  const handleClickRight = useCallback(() => {
    if (slideRef) {
      slide.scrollNext();
    }
  }, [slideRef, slide]);

  const onSelect = useCallback(() => {
    if (!slide || !thumb) return;
    setSelectedIndex(slide.selectedScrollSnap());
    thumb.scrollTo(slide.selectedScrollSnap());
  }, [slide, thumb, setSelectedIndex]);

  const onThumbClick = useCallback(
    index => {
      if (!slide || !thumb) return;
      if (thumb.clickAllowed()) slide.scrollTo(index);
    },
    [slide, thumb]
  );

  useEffect(() => {
    if (!slide) return;
    onSelect();
    slide.on('select', onSelect);
  }, [slide, onSelect]);

  if (!data?.data) {
    return <NotFound content="해당하는 게시글이 없습니다." />;
  }

  const detailValue = data.data;

  // console.log(detailValue);

  return (
    <GuideDetailWrapper>
      <GuideDetailHeaderWrapper>
        <GuideDetailHeaderTitleText>{detailValue.title}</GuideDetailHeaderTitleText>
        <GuideDetailHeaderDateWrapper>
          <GuideDetailHeaderDateText>
            {format(new Date(detailValue.createdDtime), 'yyyy. MM. dd')}
          </GuideDetailHeaderDateText>
        </GuideDetailHeaderDateWrapper>
      </GuideDetailHeaderWrapper>

      <SlideContentContainer>
        <SlideContainer ref={slideRef}>
          <SlideWrapper>
            {detailValue.s3Files.map(value => (
              <SlideItem key={value.seq}>
                <img src={value.path} alt="thumb" />
              </SlideItem>
            ))}
          </SlideWrapper>
          <SlideArrowLeft onClick={handleClickLeft}>
            <PlayArrowRoundedIcon />
          </SlideArrowLeft>
          <SlideArrowRight onClick={handleClickRight}>
            <PlayArrowRoundedIcon />
          </SlideArrowRight>
        </SlideContainer>
        <SlideProgressContainer>
          <SlideProgressContentWrapper>
            <SlideProgressBarWrapper
              style={{
                transform: `translateX(${
                  ((selectedIndex + 1) / detailValue.s3Files.length) * 100
                }%)`,
              }}
            />
          </SlideProgressContentWrapper>
          <SlideProgressTextWrapper>
            <SlideProgressSelectedText>{selectedIndex + 1}</SlideProgressSelectedText>
            <SlideProgressText>/{detailValue.s3Files.length}</SlideProgressText>
          </SlideProgressTextWrapper>
        </SlideProgressContainer>
      </SlideContentContainer>

      <SlideThumbContainer ref={thumbRef}>
        <SlideThumbWrapper>
          {detailValue.s3Files.map((value, index) => (
            <SlideThumbItem
              key={value.seq}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
            >
              <img src={value.path} alt="thumb" />
            </SlideThumbItem>
          ))}
        </SlideThumbWrapper>
      </SlideThumbContainer>
    </GuideDetailWrapper>
  );
}

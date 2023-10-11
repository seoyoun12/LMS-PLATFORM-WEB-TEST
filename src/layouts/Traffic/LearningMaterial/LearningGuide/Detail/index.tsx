import { MaterialTabType } from '@layouts/Traffic/LearningMaterial';
import { useRouter } from 'next/router';
import { useGetLearningMaterialDetail } from '@common/api/learningMaterial';
import { GuideDetailHeaderDateText,GuideDetailHeaderDateWrapper,GuideDetailHeaderTitleText,GuideDetailHeaderWrapper,GuideDetailWrapper } from '@layouts/Traffic/LearningMaterial/LearningGuide/Detail/style';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';

export default function LearningGuideDetailLayout() {
  const router = useRouter();
  const { id } = router.query as {
    type: MaterialTabType;
    id: string;
  };
  const { data } = useGetLearningMaterialDetail(id);

  if (!data?.data) {
    return <NotFound content="해당하는 게시글이 없습니다." />;
  }

  const detailValue = data.data;
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
      <ContentWrapper>
        <Typography>여기에 영상자료 올라와야 함</Typography>
      </ContentWrapper>
    </GuideDetailWrapper>
  );
}

const ContentWrapper = styled(Box)`
  width: 100%;
  height: 800px;
  border: 2px solid #2d63e2;
`;
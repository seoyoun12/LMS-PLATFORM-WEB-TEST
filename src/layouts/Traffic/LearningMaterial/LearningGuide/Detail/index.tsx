import { MaterialTabType } from '@layouts/Traffic/LearningMaterial';
import { useRouter } from 'next/router';
import { useGetLearningMaterialDetail } from '@common/api/learningMaterial';
import { GuideDetailHeaderWrapper,GuideDetailWrapper } from '@layouts/Traffic/LearningMaterial/LearningGuide/Detail/style';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Youtube from 'react-youtube';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor'
import { useEffect, useRef } from 'react';



export default function LearningGuideDetailLayout() {
  const router = useRouter();
  const { id } = router.query as { type: MaterialTabType; id: string; };
  const { data } = useGetLearningMaterialDetail(id);
  const editorRef = useRef<Viewer>(null);

  console.log(id);
  useEffect(() => {
    if(!data?.data) return;
      editorRef.current.getInstance().setMarkdown(data?.data.content);
    
  },[data])

  if (!data?.data) {
    return <NotFound content="해당하는 게시글이 없습니다." />;
  }
  
  return (
    <GuideDetailWrapper>
      <GuideDetailHeaderWrapper>
        <Typography className='post-title' sx={{fontSize:'18px', fontWeight:'semibold'}}>{data.data.title}</Typography>
        <Typography className='post-date'>{format(new Date(data.data.createdDtime), 'yyyy. MM. dd')}</Typography>
      </GuideDetailHeaderWrapper>
    <ContentWrapper>
      
    <YoutubeWrapper>
      <Youtube
        title='핼로월드'
        loading='lazy'
        videoId={data.data.origin.split('v=')[1]}
        style={{width:'100%'}}
        // onError={(e) => {console.log(e)}}
        />
    </YoutubeWrapper>
        
          
        <LectureMaterialsWrapper>
          <SubTitle>보충자료</SubTitle>
          <Viewer
            ref={editorRef}
            initialValue={data.data.content}
            usageStatistics={false}
          />  
        </LectureMaterialsWrapper>
      </ContentWrapper>
    </GuideDetailWrapper>
  );
}

const SubTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 700;
  align-self: flex-start;
  border-bottom: 1px solid #e7e7e7e7;
  width:100%;
  margin-bottom: 1rem;
  color: #a7a7a7;
  
`;

const LectureMaterialsWrapper = styled(Box)`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 800px;
`;

const YoutubeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom:4rem;
`
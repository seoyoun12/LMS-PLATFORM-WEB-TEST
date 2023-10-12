import { MaterialTabType } from '@layouts/Traffic/LearningMaterial';
import { useRouter } from 'next/router';
import { useGetLearningMaterialDetail } from '@common/api/learningMaterial';
import { GuideDetailHeaderWrapper,GuideDetailWrapper } from '@layouts/Traffic/LearningMaterial/LearningGuide/Detail/style';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Youtube from 'react-youtube';
import Image from 'next/image';



// Youtube 비디오 아이디로 썸네일 이미지 가져오기
// const API_KEY = 'YOUR_API_KEY';
// const VIDEO_ID = 'VIDEO_ID';

// // YouTube API를 호출하여 동영상 정보 가져오기
// axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${VIDEO_ID}&part=snippet`)
//   .then(response => {
//     const videoData = response.data.items[0].snippet;
//     const thumbnailUrl = videoData.thumbnails.default.url;

//     // thumbnailUrl을 사용하여 썸네일 이미지를 표시하거나 저장할 수 있습니다.
//     console.log('썸네일 URL:', thumbnailUrl);
//   })
//   .catch(error => {
//     console.error('Error fetching video data:', error);
//   });
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
        <Typography sx={{fontSize:'18px', fontWeight:'semibold'}}> {detailValue.title} </Typography>
        <Typography>{format(new Date(detailValue.createdDtime), 'yyyy. MM. dd')}</Typography>
            
      </GuideDetailHeaderWrapper>
      <ContentWrapper>
        <YoutubeWrapper>
        <Youtube videoId="aNMlq-hOIoc" />
        </YoutubeWrapper>
        <LectureMaterialsWrapper>
                난 너를 믿었던만큼 난 내 친구도 믿었기에난 아무런 부담없이 널 내 친구에게 소개시켜 줬고그런 만남이 있은 후부터 우리는 자주 함께 만나며즐거운 시간을 보내며 함께 어울렸던 것뿐인데그런 만남이 어디부터 잘못됐는지난 알 수 없는 예감에 조금씩 빠져들고 있을때쯤넌 나보다 내 친구에게 관심을 더 보이며날 조금씩 멀리하던그 어느 날 너와 내가 심하게 다툰 그 날 이후로너와 내 친구는 연락도 없고 날 피하는 것 같아그제서야 난 느낀거야 모든 것이 잘못돼 있는걸너와 내 친구는 어느새 다정한 연인이 돼 있었지있을 수 없는 일이라며 난 울었어내 사랑과 우정을 모두 버려야 했기에또 다른 내 친구는 내 어깰 두드리며잊어버리라 했지만 잊지 못할 것 같아너를 사랑했던 것만큼 난 내 친구도 믿었기에
        <Box sx={{display:'flex', justifyContent:'center',flexDirection:'column',alignItems:'center',padding: '2rem', border:'3px solid #2d63e2'}}>
          <img src="https://img.youtube.com/vi/aNMlq-hOIoc/maxresdefault.jpg" width={250} height={250} alt="배워서 나주자" />
          <Typography sx={{fontSize:'20px', fontWeight:'bold'}}>아 저는 썸네일에서 설명을 맡고 있습니다</Typography>
        </Box>
         난 자연스럽게 너와 함께 어울렸던 것뿐인데 어디서부터 우리의 믿음이 깨지기 시작했는지 난 알지도 못한 채 어색함을 느끼면서 그렇게 함께 만나온 시간이 길어지면 질수록 넌 내게서 더 조금씩 멀어지는 것을 느끼며 난 예감을 했었지 넌 나보다 내 친구에게 관심이 더 있었다는 걸 그 어느 날 너와 내가 심하게 다툰 그 날 이후로 너와 내 친구는 연락도 없고 날 피하는 것같아 그제서야 난 느낀거야 모든 것이 잘못돼 있는걸 너와 내 친구는 어느새 다정한 연인이 돼 있었지 있을 수 없는 일이라며 난 울었어 내 사랑과 우정을 모두 버려야 했기에 또 다른 내 친구는 내 어깰 두드리며 잊어버리라 했지만 잊지 못할 것 같아
        </LectureMaterialsWrapper>
      </ContentWrapper>
    </GuideDetailWrapper>
  );
}

const LectureMaterialsWrapper = styled(Box)`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border: 3px solid green;
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
  width: 100%;
  height: 100%;
  border: 3px solid red;
  
`
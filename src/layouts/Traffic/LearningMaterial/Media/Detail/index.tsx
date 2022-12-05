import { ProvincialBoardResponseDto } from '@common/api/Api';
import {
  EduTargetMain,
  EduTargetSub,
  getTrafficMediaBoardDetail,
} from '@common/api/learningMaterial';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MaterialTabType } from '../..';
import {
  EducationChipItem,
  MediaDetailHeaderDateText,
  MediaDetailHeaderTitleText,
  MediaDetailHeaderWrapper,
  MediaDetailWrapper,
  VideoItemContentWrapper,
} from './style';

export default function MediaDetailLayout() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { id } = router.query as {
    type: MaterialTabType;
    id: string;
  };
  const [data, setData] = useState<ProvincialBoardResponseDto>();
  const [eduTargetTypes, setEduTargetTypes] = useState<{
    eduTargetMain: string;
    eduTargetSub: string;
  }>();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getTrafficMediaBoardDetail(Number(id));
        const eduTargetMain = Object.entries(EduTargetMain).filter(
          r => r[0] === data.eduTargetMain
        )[0][1];
        const eduTargetSub = Object.entries(EduTargetSub).filter(
          r => r[0] === data.eduTargetSub
        )[0][1];
        console.log('안녕하세요', data, id);
        console.log(eduTargetSub);
        setEduTargetTypes({ eduTargetMain: eduTargetMain, eduTargetSub: eduTargetSub });
        setData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!data) return <NotFound content="게시물이 존재하지 않습니다." />;

  return (
    <MediaDetailWrapper>
      <MediaDetailHeaderWrapper>
        <MediaDetailHeaderTitleText>{data.title}</MediaDetailHeaderTitleText>
        <MediaDetailHeaderDateText>
          {format(new Date(data.createdDtime.replaceAll('-', '/')), 'yyyy.MM.dd')}
        </MediaDetailHeaderDateText>
        <EducationChipItem
          label={eduTargetTypes.eduTargetMain}
          color="warning"
          variant={'filled'}
        />
        <EducationChipItem
          label={eduTargetTypes.eduTargetSub}
          color="primary"
          variant={'filled'}
        />
      </MediaDetailHeaderWrapper>
      <VideoItemContentWrapper>
        <iframe
          src={data.youtubeLink}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoItemContentWrapper>
      <div>{data.content}</div>
    </MediaDetailWrapper>
  );
}

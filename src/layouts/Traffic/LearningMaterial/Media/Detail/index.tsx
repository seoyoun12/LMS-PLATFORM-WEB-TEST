import { ProvincialBoardResponseDto } from '@common/api/Api';
import {
  EduTargetMain,
  EduTargetSub,
  getTrafficMediaBoard,
  getTrafficMediaBoardDetail,
} from '@common/api/learningMaterial';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MaterialTabType } from '../..';
import {
  EducationChipItem,
  MediaDetailBoardLinkItem,
  MediaDetailBoardLinkItemBlock,
  MediaDetailBoardLinkItemDescription,
  MediaDetailBoardLinkItemTitle,
  MediaDetailBoardLinksWrapper,
  MediaDetailContentWrapper,
  MediaDetailHeaderDateText,
  MediaDetailHeaderTitleText,
  MediaDetailHeaderWrapper,
  MediaDetailWrapper,
  VideoItemContentWrapper,
} from './style';

export default function MediaDetailLayout() {
  const router = useRouter();
  const { id } = router.query as {
    type: MaterialTabType;
    id: string;
  };
  const [data, setData] = useState<ProvincialBoardResponseDto>();
  const [eduTargetTypes, setEduTargetTypes] = useState<{
    eduTargetMain: string;
    eduTargetSub: string;
  }>();
  const [boardLinks, setBoardLinks] = useState<{
    prevBoard: ProvincialBoardResponseDto;
    nextBoard: ProvincialBoardResponseDto;
  }>();

  const handleBoardLinkClick = (boardSeq: number) => {
    setData(undefined);
    router.push(`/traffic/learning-material/media/${boardSeq}`);
  };

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
        setEduTargetTypes({
          eduTargetMain: eduTargetMain,
          eduTargetSub: eduTargetSub,
        });
        setData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async function () {
      if (!data) return;
      try {
        const prevAndNextBoard = { prevBoard: {}, nextBoard: {} };
        const datas = await getTrafficMediaBoard(data.eduTargetSub);
        datas.data.forEach((r, idx) => {
          if (data.seq === r.seq) {
            prevAndNextBoard.prevBoard = datas.data[idx - 1];
            prevAndNextBoard.nextBoard = datas.data[idx + 1];
          }
        });
        setBoardLinks(prevAndNextBoard);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [data]);

  if (!data) return <NotFound content="게시물이 존재하지 않습니다." />;

  return (
    <MediaDetailWrapper>
      <MediaDetailHeaderWrapper>
        <MediaDetailHeaderTitleText>{data.title}</MediaDetailHeaderTitleText>
        <MediaDetailHeaderDateText>
          {format(
            new Date(data.createdDtime.replaceAll('-', '/')),
            'yyyy.MM.dd'
          )}
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
          src={`https://www.youtube.com/embed/${
            data.youtubeLink.split('https://www.youtube.com/watch?v=')[1]
          }`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoItemContentWrapper>
      <MediaDetailContentWrapper>{data.content}</MediaDetailContentWrapper>

      <MediaDetailBoardLinksWrapper>
        <MediaDetailBoardLinkItem>
          {boardLinks?.prevBoard && (
            <MediaDetailBoardLinkItemBlock
              onClick={() => handleBoardLinkClick(boardLinks.prevBoard.seq)}
            >
              <MediaDetailBoardLinkItemDescription>
                이전 게시글
              </MediaDetailBoardLinkItemDescription>
              <MediaDetailBoardLinkItemTitle>
                {boardLinks.prevBoard.title}
              </MediaDetailBoardLinkItemTitle>
            </MediaDetailBoardLinkItemBlock>
          )}
        </MediaDetailBoardLinkItem>
        <MediaDetailBoardLinkItem>
          {boardLinks?.nextBoard && (
            <MediaDetailBoardLinkItemBlock
              onClick={() => handleBoardLinkClick(boardLinks.nextBoard.seq)}
            >
              <MediaDetailBoardLinkItemDescription>
                다음 게시글
              </MediaDetailBoardLinkItemDescription>
              <MediaDetailBoardLinkItemTitle>
                {boardLinks.nextBoard.title}
              </MediaDetailBoardLinkItemTitle>
            </MediaDetailBoardLinkItemBlock>
          )}
        </MediaDetailBoardLinkItem>
      </MediaDetailBoardLinksWrapper>
    </MediaDetailWrapper>
  );
}

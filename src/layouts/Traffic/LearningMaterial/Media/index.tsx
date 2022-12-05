import {
  MaterialType,
  useTrafficMediaBoard,
  EduTargetSubType,
  EduTargetMain,
  EduTargetMainType,
} from '@common/api/learningMaterial';
import { GET } from '@common/httpClient';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  MediaChipItem,
  MediaMainChipWrap,
  MediaContainer,
  MediaContentContainer,
  MediaItemContainer,
  MediaItemContentContainer,
  MediaItemContentHeaderContainer,
  MediaItemContentSubtitle,
  MediaItemContentTitle,
  MediaItemImageContainer,
  MediaSubChipWrap,
} from './style';

interface MediaLayoutProps {
  materialType: MaterialType;
}

export default function MediaLayout({ materialType }: MediaLayoutProps) {
  const router = useRouter();
  const [eduMain, setEduMain] = useState<EduTargetMainType>('TYPE_CHILDREN');
  const [eduSub, setEduSub] = useState<EduTargetSubType>('TYPE_KINDERGARTEN');
  const { data } = useTrafficMediaBoard(eduSub);

  console.log(data, '하이여');

  const handleClickPost = (id: number) => {
    router.push(`/traffic/learning-material/media/${id}`);
  };

  const handleMainChipClick = (eduMainType: EduTargetMainType) => {
    const getFirstChild = eduArr.filter(r => r.eduMainType === eduMainType)[0].child[0];
    setEduMain(eduMainType);
    setEduSub(getFirstChild.eduSubType);
  };

  return (
    <MediaContainer>
      <MediaMainChipWrap>
        {eduArr.map(r => (
          <MediaChipItem
            label={r.eduMainTypeKo}
            color="primary"
            variant={eduMain === r.eduMainType ? 'filled' : 'outlined'}
            onClick={() => handleMainChipClick(r.eduMainType)}
          />
        ))}
      </MediaMainChipWrap>
      <MediaSubChipWrap>
        {eduArr
          .filter(r => r.eduMainType === eduMain)[0]
          .child.map(r => (
            <MediaChipItem
              label={r.eduSubTypeKo}
              color="primary"
              variant={eduSub === r.eduSubType ? 'filled' : 'outlined'}
              onClick={() => setEduSub(r.eduSubType)}
            />
          ))}
      </MediaSubChipWrap>
      <MediaContentContainer>
        {!data || data.length <= 0 ? (
          <NotFound
            style={{ height: '300px' }}
            content="권한이 없거나 신청한 과정이 존재하지 않습니다!"
          />
        ) : (
          <>
            {data &&
              data.map((item, index) => (
                <MediaItemContainer key={index} onClick={() => handleClickPost(item.seq)}>
                  <MediaItemImageContainer>
                    {(item.s3Files && item.s3Files.length > 0 && (
                      <img src={item.s3Files[0].path} alt="course thumbnail" />
                    )) || (
                      <NotFound
                        style={{ height: '100%' }}
                        content="이미지를 찾을 수 없음."
                      />
                    )}
                  </MediaItemImageContainer>

                  <MediaItemContentContainer>
                    <MediaItemContentHeaderContainer>
                      <MediaItemContentTitle>{item.title}</MediaItemContentTitle>
                      {/*<LearningGuideItemContentDate>*/}
                      {/*  조회수: 0*/}
                      {/*</LearningGuideItemContentDate>*/}
                    </MediaItemContentHeaderContainer>
                    <MediaItemContentSubtitle>
                      {format(new Date(item.createdDtime), 'yyyy. MM. dd')}
                    </MediaItemContentSubtitle>
                  </MediaItemContentContainer>
                </MediaItemContainer>
              ))}
          </>
        )}
      </MediaContentContainer>
    </MediaContainer>
  );
}

const eduArr: {
  eduMainType: EduTargetMainType;
  eduMainTypeKo: string;
  child: { eduSubType: EduTargetSubType; eduSubTypeKo: string }[];
}[] = [
  {
    eduMainType: 'TYPE_CHILDREN',
    eduMainTypeKo: '어린이',
    child: [
      {
        eduSubType: 'TYPE_KINDERGARTEN',
        eduSubTypeKo: '유치원',
      },
    ],
  },
  {
    eduMainType: 'TYPE_TEENAGER',
    eduMainTypeKo: '청소년',
    child: [
      {
        eduSubType: 'TYPE_ELEMENTARY',
        eduSubTypeKo: '초등학생',
      },
      {
        eduSubType: 'TYPE_MIDDLE',
        eduSubTypeKo: '중학생',
      },
      {
        eduSubType: 'TYPE_HIGH',
        eduSubTypeKo: '고등학생',
      },
    ],
  },
  {
    eduMainType: 'TYPE_ELDERLY',
    eduMainTypeKo: '노인',
    child: [
      {
        eduSubType: 'TYPE_ELDERLY',
        eduSubTypeKo: '노인',
      },
    ],
  },
  {
    eduMainType: 'TYPE_SELF_DRIVING',
    eduMainTypeKo: '자가운전자',
    child: [
      {
        eduSubType: 'TYPE_SELF_DRIVER',
        eduSubTypeKo: '자가운전자',
      },
    ],
  },
];

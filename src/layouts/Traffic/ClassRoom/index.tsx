import {
  MaterialType,
  useTrafficMediaBoard,
  EduTargetSubType,
  EduTargetMain,
  EduTargetMainType,
  getTrafficMediaBoardRole,
} from '@common/api/learningMaterial';
import { GET } from '@common/httpClient';
import { isLoginState, userInfo } from '@common/recoil';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
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

// interface MediaLayoutProps {
//   materialType: MaterialType;
// }

// export default function MediaLayout({ materialType }: MediaLayoutProps) {
export default function ClassRoomLayout() {
  const router = useRouter();
  const [eduMain, setEduMain] = useState<EduTargetMainType>('TYPE_CHILDREN');
  const [eduSub, setEduSub] = useState<EduTargetSubType>('TYPE_KINDERGARTEN');
  const [chipAllowed, setChipAllowed] = useState<{
    eduTargetMain: EduTargetMainType[];
    eduTargetSub: EduTargetSubType[];
  }>();

  // if (!isLogin) return <NotFound content="로그인이 필요한 서비스입니다." />;
  const { data } = useTrafficMediaBoard(eduSub);

  const handleClickPost = (id: number) => {
    router.push(`/traffic/class-room/${id}`);
  };

  const handleMainChipClick = (eduMainType: EduTargetMainType) => {
    const getChildAllowedSub = eduArr
      .filter(f => f.eduMainType === eduMainType)[0]
      .child.filter(f => chipAllowed.eduTargetSub.includes(f.eduSubType));
    setEduMain(eduMainType);
    setEduSub(getChildAllowedSub[0].eduSubType);
  };

  // 권한

  useEffect(() => {
    (async function () {
      try {
        const roleData = await getTrafficMediaBoardRole();
        const roleDataMainRoles = roleData.data.mainRoles;
        const roleDataSubRoles = roleData.data.subRoles;
        //indexOf의 첫 아이템의 위치가 반환됩니다. 필터의 idx가 계속 돌면 첫 아이템 위치랑 같을 경우에만 반환하므로 결국엔 중복이 제거됩니다.
        const eduMainRemoveDuplication = roleDataMainRoles.filter(
          (f, idx) => roleDataMainRoles.indexOf(f) === idx
        ) as EduTargetMainType[];
        const eduSubRemoveDeplication = roleDataSubRoles.filter(
          (f, idx) => roleDataSubRoles.indexOf(f) === idx
        ) as EduTargetSubType[];
        setChipAllowed({
          eduTargetMain: eduMainRemoveDuplication,
          eduTargetSub: eduSubRemoveDeplication,
        });
        const getEduMain = eduArr.filter(r => {
          let flag = false;
          r.child.forEach(c => {
            if (c.eduSubType === roleData.data.subRoles[0]) flag = true;
          });
          return flag;
        });
        const getChildAllowedSub = getEduMain[0].child.filter(f =>
          roleDataSubRoles.includes(f.eduSubType)
        );
        setEduMain(getEduMain[0].eduMainType);
        setEduSub(getChildAllowedSub[0].eduSubType);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <MediaContainer>
      <MediaMainChipWrap>
        {eduArr
          .filter(f => chipAllowed?.eduTargetMain.includes(f.eduMainType))
          .map(r => (
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
          .filter(f => f.eduMainType === eduMain)[0]
          .child.filter(f => chipAllowed?.eduTargetSub.includes(f.eduSubType))
          .map(r => (
            <MediaChipItem
              label={r.eduSubTypeKo}
              color="success"
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
      {
        eduSubType: 'TYPE_ELEMENTARY',
        eduSubTypeKo: '초등학교',
      },
    ],
  },
  {
    eduMainType: 'TYPE_TEENAGER',
    eduMainTypeKo: '청소년',
    child: [
      {
        eduSubType: 'TYPE_MIDDLE',
        eduSubTypeKo: '중학교',
      },
      {
        eduSubType: 'TYPE_HIGH',
        eduSubTypeKo: '고등학교',
      },
    ],
  },
  {
    eduMainType: 'TYPE_ELDERLY',
    eduMainTypeKo: '어르신',
    child: [
      {
        eduSubType: 'TYPE_ELDERLY',
        eduSubTypeKo: '어르신',
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

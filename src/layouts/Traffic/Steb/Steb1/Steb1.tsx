import { EduTargetMainType } from '@common/api/learningMaterial';
import { NotFound } from '@components/ui/NotFound';
import { Box, Container, styled, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { StebHeader } from '../StebHeader';

// 도민교통교육 교육대상자 선택 card 화면
export function Steb1() {
  return (
    <Steb1Wrap>
      <StebHeader value={1} />
      <EduTargetCardsWrap>
        {eduTargetList.map(r => (
          <Link key={r.title} href={`/traffic/stebMove/steb2?eduTargetMain=${r.target}`}>
            <a>
              <EduTargetCard sx={{ borderBottom: `2px solid ${r.borderBottomColor}` }}>
                <EduTargetCardImgWrap>
                  {/* <NotFound
                    content="이미지가 존재하지 않습니다."
                    style={{ height: '100%' }}
                  /> */}
                  <Image src={r.imgPath || ''} alt="eduImg" layout="fill" />
                </EduTargetCardImgWrap>
                <EduTargetCardTitleWrap>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                    {r.title}
                  </Typography>
                </EduTargetCardTitleWrap>
              </EduTargetCard>
            </a>
          </Link>
        ))}
      </EduTargetCardsWrap>
    </Steb1Wrap>
  );
}

const Steb1Wrap = styled(Box)``;

const EduTargetCardsWrap = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
  margin: 128px auto;
  @media (max-width: 1200px) {
    max-width: 800px;
  }
  a {
    color: black;
    text-decoration: none;
    outline: none;
  }

  a:hover,
  a:active {
    text-decoration: none;
    transform: scale(1.03);
    transition: transform 0.2s ease-in-out;
  }
`;

// const EduTargetCardLink = styled(Link)`
//   cursor: pointer;
// `;

const EduTargetCard = styled(Box)`
  width: 250px;
  height: 250px;
  box-shadow: 2px 2px 8px 4px #bbbbbb;
`;

const EduTargetCardImgWrap = styled(Box)`
  height: 200px;
  background-color: #e0e0e0;
  position: relative;
`;
const EduTargetCardTitleWrap = styled(Box)`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const eduTargetList: {
  title: string;
  borderBottomColor: string;
  target: EduTargetMainType;
  imgPath: string;
}[] = [
  {
    title: '어린이',
    borderBottomColor: '#f1c40f',
    target: 'TYPE_CHILDREN',
    imgPath: '/assets/images/domin.jpg',
  },
  {
    title: '청소년',
    borderBottomColor: '#2980b9',
    target: 'TYPE_TEENAGER',
    imgPath: '/assets/images/teen.jpg',
  },
  {
    title: '자가운전자',
    borderBottomColor: '#27ae60',
    target: 'TYPE_SELF_DRIVING',
    imgPath: '/assets/images/self.jpg',
  },
  {
    title: '어르신',
    borderBottomColor: '#c0392b',
    target: 'TYPE_ELDERLY',
    imgPath: '/assets/images/old.png',
  },
];

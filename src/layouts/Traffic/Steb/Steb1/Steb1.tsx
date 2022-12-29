import { EduTargetMainType } from '@common/api/learningMaterial';
import { Box, Container, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { StebHeader } from '../StebHeader';

export function Steb1() {
  return (
    <Steb1Wrap>
      <StebHeader value={1} />
      <EduTargetCardsWrap>
        {eduTargetList.map(r => (
          <EduTargetCardLink
            href={`/traffic/stebMove/steb2?eduTargetMain=${r.target}`}
          >
            <EduTargetCard
              sx={{ borderBottom: `2px solid ${r.borderBottomColor}` }}
            >
              <EduTargetCardImgWrap></EduTargetCardImgWrap>
              <EduTargetCardTitleWrap>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                  {r.title}
                </Typography>
              </EduTargetCardTitleWrap>
            </EduTargetCard>
          </EduTargetCardLink>
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
`;

const EduTargetCardLink = styled(Link)``;

const EduTargetCard = styled(Box)`
  width: 250px;
  height: 250px;
  box-shadow: 2px 2px 8px 4px #bbbbbb;
`;

const EduTargetCardImgWrap = styled(Box)`
  height: 200px;
  background-color: #e0e0e0;
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
    imgPath: '',
  },
  {
    title: '청소년',
    borderBottomColor: '#2980b9',
    target: 'TYPE_TEENAGER',
    imgPath: '',
  },
  {
    title: '자가운전자',
    borderBottomColor: '#27ae60',
    target: 'TYPE_SELF_DRIVING',
    imgPath: '',
  },
  {
    title: '어르신',
    borderBottomColor: '#c0392b',
    target: 'TYPE_ELDERLY',
    imgPath: '',
  },
];

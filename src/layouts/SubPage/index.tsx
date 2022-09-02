import * as React from 'react';
import styled from 'styled-components';
import { Box, Button, Card, CardActions, CardContent } from '@mui/material';

const cardData = [
  {
    id: 1,
    title: '운수종사자교육',
    herfString: 'woonsu',
    color: '#1c9a29',
    isShow: true,
  },
  {
    id: 2,
    title: '저상버스운전자교육',
    herfString: 'lowFloorBus',
    color: '#41a3f4',
    isShow: true,
  },
  {
    id: 3,
    title: '도민교통안전교육',
    herfString: 'domin',
    color: '#e4c12c',
    isShow: true,
  },
];

const SubPage = () => {
  return (
    <SubPageWrap>
      <div className="main-title">충남교통연수원</div>
      {/* <Notice /> 어따넣지 */}
      <SelectWrap>
        {cardData.map(item => (
          <Card
            key={item.id}
            sx={{
              maxWidth: 345,
              boxShadow: '1px 1px 8px 6px rgba(0, 0, 0, 0.5)',
              borderRadius: '25% 25% 1rem 1rem',
              width: '270px',
              display: item.isShow ? 'block' : 'none',
            }}
          >
            <Box sx={{ height: '188px', background: item.color }} />
            <CardContent sx={{ paddingLeft: '8px', paddingRight: '8px' }}>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '28px',
                  fontWeight: 'bold',
                }}
              >
                {item.title}
              </div>
            </CardContent>
            <CardActions>
              <Button
                className="move-page"
                size="small"
                sx={{
                  background: item.color,
                }}
              >
                바로가기
              </Button>
            </CardActions>
          </Card>
        ))}
      </SelectWrap>
    </SubPageWrap>
  );
};

const SubPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 1200px;
  padding: 0 2rem;
  margin-bottom: 32px;
  background: #dcf3ff;
  font-family: HanSans;
  .main-title {
    font-weight: bold;
    font-size: 40px;
    width: fit-content;
    margin: auto;
    margin-top: 2rem;
  }
`;

const SelectWrap = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  top: 64px;
  margin: auto;
  .move-page {
    margin: auto;
    color: white;
    font-weight: bold;
    font-size: 18px;
    border-radius: 1rem;
    line-height: 2.5rem;
    padding: 0 0.5rem;
  }
`;

export default SubPage;

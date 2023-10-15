import styled from "@emotion/styled";
import SelectBox from "@layouts/AdminCenter/CourseTrafficManagement/common/SelectBox";
import { Box, Button, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

export function CourseInfomationTraffic() {
  const [editTarget, setEditTarget] = useState(false);

  const onClickEdit = () => {
    setEditTarget(prev => !prev);
  }

  return (
    <Wrapper>
      <Table>
        <TableTitle>수강정보</TableTitle>
        <OutRow>
          <InRow>
            <InRowTitle>과정명</InRowTitle>
            <InRowContent>2023_어린이 과정</InRowContent>
          </InRow>
          <InRow>
            <InRowTitle>회원아이디</InRowTitle>
            <InRowContent>some</InRowContent>
          </InRow>
        </OutRow>
        <OutRow>
          <InRow>
            <InRowTitle>회원명</InRowTitle>
            <InRowContent>김명성</InRowContent>
          </InRow>
          <InRow>
            <InRowTitle>등록일</InRowTitle>
            <InRowContent>2023-10-15 18:09:23</InRowContent>
          </InRow>
        </OutRow>
        <OutRow>
          <InRow>
            <InRowTitle>신청희망날짜</InRowTitle>
            <InRowContent>2023-10-21</InRowContent>
          </InRow>
          <InRow>
            <InRowTitle>수강 종료기간</InRowTitle>
            <InRowContent>2023-11-21</InRowContent>
          </InRow>
        </OutRow>
        <OutRow>
          <InRow>
            <InRowTitle>상태</InRowTitle>
            <InRowContent>정상</InRowContent>
          </InRow>
          <InRow>
            <InRowTitle>수료여부</InRowTitle>
            <InRowContent>수료</InRowContent>
          </InRow>
        </OutRow>
      </Table>
    
      <Table>
        <TableTitle>신청대상자 정보 </TableTitle>
        <OutRow>
          <InRowTitle>교육대상자</InRowTitle>
          <InRowContent>어린이</InRowContent>
        </OutRow>
        <OutRow>
          <InRowTitle>교육대상자 세부</InRowTitle>
          <InRowContent>
            <SelectBox
              id="educationDetailType"
              label="교육 대상자 세부타입"
              value={0}
              onChange={() => {console.log('hello world')}}
              options={Array.from({length: 2}, (_, i) => i)}
              sx={{width:'240px',marginBottom:'0px'}}
              disabled={!editTarget}
            />
            </InRowContent>
        </OutRow>
        
        {
          Array.from({length: 6}, (_, i) => i).map((_, i) => (
            <OutRow key={i}>
              <InRowTitle>{i + 1}학년</InRowTitle>
              <InRowContent>
                <OutlinedInput
                  endAdornment={<InputAdornment position="end">명</InputAdornment>}
                  inputProps={{ style: { height: '8px' } }}
                  inputMode="numeric"
                  type="number"
                  
                  disabled={!editTarget}
                />
              </InRowContent>
            </OutRow>
          ))}
      </Table>
      <Button
        variant={editTarget ? "contained" : "outlined"}
        onClick={onClickEdit}
        sx={{margin:'0 auto'}}>
          {editTarget ? '수정완료' : '수정하기'}
      </Button>

      <Table>
        <TableTitle>학습현황</TableTitle>
        <OutRow>
          <InRow>
            <InRowTitle>항목</InRowTitle>
            <InRowTitle>이수(과락)기준</InRowTitle>
            <InRowTitle>성적</InRowTitle>
            <InRowTitle>제출일</InRowTitle>
            <InRowTitle>제출여부</InRowTitle>
          </InRow>
        </OutRow>
        <OutRow>
          <InRow>
            <InRowContent justifyContent="center" bgcolor="#ffe" >진도율</InRowContent>
            <InRowContent justifyContent="center" >90%</InRowContent>
            <InRowContent justifyContent="center" >100.0%</InRowContent>
            <InRowContent justifyContent="center" >2023-10-15 18:09:23</InRowContent>
            <InRowContent justifyContent="center" >제출</InRowContent>
          </InRow>
        </OutRow>
        <OutRow>
          <InRow>
            <InRowContent justifyContent="center" bgcolor="#ffe" >설문/만족도 조사</InRowContent>
            <InRowContent justifyContent="center" >N</InRowContent>
            <InRowContent justifyContent="center" >-</InRowContent>
            <InRowContent justifyContent="center" >2023-11-30</InRowContent>
            <InRowContent justifyContent="center" >미제출</InRowContent>
          </InRow>
        </OutRow>
      </Table>

      <Table>
        <ProgressTitle >
          <Typography sx={{ fontSize: '1.15rem', fontWeight: 'bold',width:'40%' }}>진도현황</Typography>
          <Box sx={{alignSelf:'center',flex:1,gap:'.25rem',display:'flex'}}>
          <Button variant="contained" size="small">전체 이수처리</Button>
          <Button variant="contained" size="small">전체 미이수처리</Button>
          </Box>
        </ProgressTitle>
        <OutRow>
          <InRow>
            <InRowTitle>챕터</InRowTitle>
            <InRowContent justifyContent="center" fontweight={700}>강의명</InRowContent>
            <InRowTitle>강의시간</InRowTitle>
            <InRowTitle>학습시간</InRowTitle>
            <InRowTitle>진도율</InRowTitle>
            <InRowTitle>완료여부</InRowTitle>
            <InRowTitle>완료처리일</InRowTitle>
            <InRowTitle>처리</InRowTitle>
          </InRow>
        </OutRow>

        <OutRow>
          <InRow>
            <InRowTitle>1</InRowTitle>
            <InRowContent justifyContent="center">어떤레슨</InRowContent>
            <InRowTitle bgcolor='#fff' fontweight={400}>28분55초</InRowTitle>
            <InRowTitle bgcolor='#fff' fontweight={400}>28분50초</InRowTitle>
            <InRowTitle bgcolor='#fff' fontweight={400}>99.6%</InRowTitle>
            <InRowTitle bgcolor='#fff' fontweight={400}>미수료</InRowTitle>
            <InRowTitle bgcolor='#fff' fontweight={400}>2023.10.13</InRowTitle>
            <InRowTitle bgcolor='#fff' fontweight={400}>
              <Button variant="contained" size="small">진도삭제</Button>
              </InRowTitle>
          </InRow>
        </OutRow>
        
      </Table>
    </Wrapper>
  );
}



const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 1.15rem;
  margin-bottom: 4rem;
  
`;

const Table = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
`


const TableTitle = styled(Box)`
  width: 100%;
  font-size: 1.15rem;
  font-weight: bold;
  align-self: flex-start;
  padding: 0 0.5rem;
  color: #222;
  background-color: #ffe;
  height: 48px;
  vertical-align: middle;
  line-height: 48px;
  border: 1px solid #e7e7e7;
  border-bottom: none;
`;



const Row = styled(Box)`
  display: flex;
  flex-direction: row;  
`;

const InRow = styled(Row)`
  width: 100%;
`;

const ProgressTitle = styled(Box)`
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  background-color: #ffe;
  height: 48px;
  padding: 1rem;
  border: 1px solid #e7e7e7;
  border-bottom: none;
`

const InRowTitle = styled(Row)<{bgcolor?:string,fontweight?:number;}>`
  flex: 0.2;
  border-right: 1px solid #e7e7e7;
  justify-content: center;
  align-items: center;
  font-weight: ${({fontweight}) => fontweight || 'bold'};
  background-color: ${({bgcolor}) => bgcolor || '#ffe'};
  
`;
const InRowContent = styled(Row)<{fontweight?:number,bgcolor?:string;}>`
  flex: 0.8;
  border-right: 1px solid #e7e7e7;
  padding: 8px;
  font-weight: ${({fontweight}) => fontweight || 400};
  background-color: ${({bgcolor}) => bgcolor || '#fff'};
`;

const OutRow = styled(Row)`
  width: 100%;
  border: 1px solid #e7e7e7;
  border-bottom: none;
  vertical-align: middle;
  line-height: 36px;
`;
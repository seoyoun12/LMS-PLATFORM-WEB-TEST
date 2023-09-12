import { Button, TableCell, TableRow as MuiTableRow } from '@mui/material';
import styled from '@emotion/styled';
import { UserCourseInfoDetailProgressStatusDto } from '@common/api/Api';
import {
  modifyCancelCourseInfo,
  modifyCompleteCourseInfo,
} from '@common/api/adm/learningInfo';
import { useState } from 'react';
import { Spinner } from '@components/ui';
import { useDialog } from '@hooks/useDialog';

interface Props {
  courseUserSeq: number;
  item: UserCourseInfoDetailProgressStatusDto;
  allLoading: boolean;
  onMutate: () => void;
  progressList: UserCourseInfoDetailProgressStatusDto[];
}

// 수료처리: console.log(progressList[0].completeYn); 타겟넘버 전 N으로 본다
// 수료취소처리: 타겟넘버 이후 Y로 본다.

export function ProgressStatusItem({ courseUserSeq, item, onMutate, allLoading,progressList }: Props) {
  const dialog = useDialog();
  const [loading, setLoading] = useState(false);

  //강제수강처리(100%)
  const onClickForcedProgressY = async (courseProcessSeq: number) => {
    
    

    if(item.chapter > 1) {
      for(let i = 0; i < item.chapter - 1; i++){
        if(progressList[i].completeYn === 'N'){
          console.log(progressList[i]);
          console.log(progressList[i].completeYn);
          alert('이전 챕터를 수료처리 해주세요.');
          return;
        }
      }  
    }
    try {
      const dialogConfirmed = await dialog({
        title: '강의 이수처리',
        description: '정말 강의를 이수처리 하겠습니까?',
        confirmText: '처리하기',
        cancelText: '취소하기',
      });

      if (!dialogConfirmed) return;

      setLoading(true);
      await modifyCompleteCourseInfo(Number(courseUserSeq), courseProcessSeq);
      setLoading(false);
      onMutate();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const onClickForcedProgressN = async (courseProcessSeq: number) => {

    if(item.chapter < progressList.length) {
      for(let i = item.chapter; i < progressList.length; i++){
        if(progressList[i].completeYn === 'Y'){
          console.log(progressList[i]);
          console.log(progressList[i].completeYn);
          alert('수료 취소는 순서대로 진행되어야 합니다.');
          return;
        }
      }
    }

    try {
      const dialogConfirmed = await dialog({
        title: '강의 미이수처리',
        description: '정말 강의를 미이수처리 하겠습니까?',
        confirmText: '처리하기',
        cancelText: '취소하기',
      });

      if (!dialogConfirmed) return;
      setLoading(true);
      await modifyCancelCourseInfo(Number(courseUserSeq), courseProcessSeq);
      setLoading(false);
      onMutate();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableChapterCell>{item.chapter}</TableChapterCell>
      <TablechapterNameCell>{item.chapterName}</TablechapterNameCell>
      <TabletotalTimeCell>{item.totalTimeStr}</TabletotalTimeCell>
      <TablelearningTimeCell>{item.learningTimeStr}</TablelearningTimeCell>
      <TableprogressRatioCell>{item.progressRatio}</TableprogressRatioCell>
      <TablecompleteYnCell>
        {item.completeYn === 'Y' ? '수료' : '미수료'}
      </TablecompleteYnCell>
      <TablecompletedDateCell>{item.completedDate}</TablecompletedDateCell>
      <TableprocessBtnCell>
        {item.completeYn === 'Y' ? (
          <Button
            variant="contained"
            disabled={loading || allLoading}
            // disabled={loading}
            color="error"
            onClick={() => onClickForcedProgressN(item.courseProgressSeq)}
          >
            {/* {loading || allLoading ? <Spinner fit={true} /> : '진도삭제'} */}
            {loading ? <Spinner fit={true} /> : '진도삭제'}
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={loading || allLoading}
            // disabled={loading}
            onClick={() => onClickForcedProgressY(item.courseProgressSeq)}
          >
            {/* {loading  ? <Spinner fit={true} /> : '수료처리'} */}
            {loading ? <Spinner fit={true} /> : '수료처리'}
          </Button>
        )}
      </TableprocessBtnCell>
    </TableRow>
  );
}
const TableRow = styled(MuiTableRow)`
  border: 0;
  border-right: 1px solid #c4c4c4;
  padding: 8px 12px;
  /* background-color: #eef7fc; */
  /* background-color: #f5f5f5; */
`;

const TableChapterCell = styled(TableCell)`
  width: 5%;
  border-right: 1px solid #c4c4c4;
  padding: 8px 12px;
  text-align: center;
`;
const TablechapterNameCell = styled(TableCell)`
  width: 50%;
  border-right: 1px solid #c4c4c4;
  padding: 8px 12px;
  text-align: center;
`;
const TabletotalTimeCell = styled(TableCell)`
  width: 7%;
  border-right: 1px solid #c4c4c4;
  padding: 8px 12px;
  text-align: center;
`;
const TablelearningTimeCell = styled(TableCell)`
  width: 7%;
  border-right: 1px solid #c4c4c4;
  padding: 8px 12px;
  text-align: center;
`;
const TableprogressRatioCell = styled(TableCell)`
  width: 7%;
  border-right: 1px solid #c4c4c4;
  padding: 8px 12px;
  text-align: center;
`;
const TablecompleteYnCell = styled(TableCell)`
  width: 7%;
  border-right: 1px solid #c4c4c4;
  padding: 8px 12px;
  text-align: center;
`; //완료여부
const TablecompletedDateCell = styled(TableCell)`
  width: 7%;
  border-right: 1px solid #c4c4c4;
  padding: 8px 12px;
  text-align: center;
`; //수료일
const TableprocessBtnCell = styled(TableCell)`
  width: 10%;
  text-align: center;
  padding: 8px 12px;
`; //처리 버튼

import { useSnackbar } from '@hooks/useSnackbar';
import {
  Backdrop,
  Box,
  Button,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
} from '@mui/material';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { UserCourseInfoDetailProgressStatusDto } from '@common/api/Api';
import {
  modifyCancelAllCourseInfo,
  modifyCancelCourseInfo,
  modifyCompleteAllCourseInfo,
  modifyCompleteCourseInfo,
} from '@common/api/adm/learningInfo';
import { ProgressStatusItem } from './ProgressStatusItem';
import { useState } from 'react';
import { Spinner } from '@components/ui';
import { useDialog } from '@hooks/useDialog';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: '챕터', align: 'center', width: '5%' },
  { name: '강의명', align: 'center', width: '50%' },
  { name: '강의시간', align: 'center', width: '7%' },
  { name: '학습시간', align: 'center', width: '7%' },
  { name: '진도율', align: 'center', width: '7%' },
  { name: '완료여부', align: 'center', width: '7%' },
  { name: '완료처리일', align: 'center', width: '7%' },
  { name: '처리', align: 'center', width: '10%' },
];

interface Props {
  progressList: UserCourseInfoDetailProgressStatusDto[];
  onMutate: () => void;
}

export function ProgressStatus({ progressList, onMutate }: Props) {
  const dialog = useDialog();
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query;
  const [allLoading, setAllLoading] = useState(false);

  const onClickForcedProcessCompleteAll = async () => {
    try {
      const dialogConfirmed = await dialog({
        title: '전체 강의 이수처리',
        description: '정말 전체 강의을 이수처리 하겠습니까?',
        confirmText: '처리하기',
        cancelText: '취소하기',
      });

      if (!dialogConfirmed) return;
      setAllLoading(true);
      await modifyCompleteAllCourseInfo(Number(courseUserSeq));
      onMutate();
      setAllLoading(false);
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: e.data.message });
      setAllLoading(false);
    }
  };
  const onClickForcedProcessCancelAll = async () => {
    try {
      const dialogConfirmed = await dialog({
        title: '전체 강의 미이수처리',
        description: '정말 전체 강의을 미이수처리 하겠습니까?',
        confirmText: '처리하기',
        cancelText: '취소하기',
      });

      if (!dialogConfirmed) return;
      setAllLoading(true);
      await modifyCancelAllCourseInfo(Number(courseUserSeq));
      onMutate();
      setAllLoading(false);
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: e.data.message });
      setAllLoading(false);
    }
  };

  // 인정시간 필요없음

  return (
    <ProgressStatusBox>
      <TableHead sx={{ display: 'table', width: '100%' }}>
        <TableTopHeadCell
          colSpan={4}
          sx={{ borderLeft: '1px solid #c4c4c4', fontWeight: 'bold' }}
        >
          진도현황
        </TableTopHeadCell>
        <TableTopHeadCell colSpan={4} align="center">
          <Button
            variant="contained"
            onClick={onClickForcedProcessCompleteAll}
            disabled={allLoading}
          >
            {/* {allLoading ? <Spinner fit={true} /> : '전체 이수처리'} */}
            전체 이수처리
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onClickForcedProcessCancelAll}
            disabled={allLoading}
            sx={{ marginLeft: '4px' }}
          >
            {/* {allLoading ? <Spinner fit={true} /> : '전체 미이수처리'} */}
            전체 미이수처리
          </Button>
        </TableTopHeadCell>
        <TableTopHeadCell
          colSpan={4}
          sx={{ borderRight: '1px solid #c4c4c4' }}
        ></TableTopHeadCell>
      </TableHead>
      <TableHead sx={{ display: 'table', width: '100%', marginTop: '4px' }}>
        <TableHeaderRow>
          {headRows.map(item => (
            <TableHeadercell align={item.align} sx={{ width: item.width }}>
              {item.name}
            </TableHeadercell>
          ))}
        </TableHeaderRow>
      </TableHead>
      {/* <TableBody className={pt20} sx={{ display: 'table', width: '100%' }}> */}
      <TableBody>
        {progressList.map(item => (
          <ProgressStatusItem
            courseUserSeq={Number(courseUserSeq)}
            item={item}
            allLoading={allLoading}
            onMutate={onMutate}
          />
        ))}
      </TableBody>
      <Backdrop open={allLoading}>
        <Spinner />
      </Backdrop>
    </ProgressStatusBox>
  );
}

const ProgressStatusBox = styled(Box)`
  margin-top: 10px;
  .MuiTableRow-root:first-of-type {
    td {
      border-top: 1px solid rgba(224, 224, 224, 1);
    }
  }
`;

const TableTopHeadCell = styled(MuiTableCell)`
  width: 33.3%;
  background: #f5f5f5;
  border-top: 1px solid #c4c4c4;
  font-weight: bold;
`;

const TableHeaderRow = styled(MuiTableRow)`
  .MuiTableCell-root:first-of-type {
    border-left: 1px solid #c4c4c4;
    border-right: 0;
  }
  .MuiTableCell-root:nth-of-type(2) {
    border-left: 1px solid #c4c4c4;
  }
`;
const TableHeadercell = styled(MuiTableCell)`
  border-bottom: 0;
  border-top: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  font-weight: bold;
  background-color: #f5f5f5;
`;

const TableBody = styled(MuiTableBody)`
  display: table;
  width: 100%;
  border-left: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
`;

const TablecompleteTimeCell = styled(MuiTableCell)`
  width: 7%;
`; //인정시간..? 이건빼라고하신거같은데 나중에 문의

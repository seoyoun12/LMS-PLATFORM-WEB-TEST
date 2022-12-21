import { Modal, Spinner } from '@components/ui';
import styled from '@emotion/styled';
import {
  Backdrop,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow as MuiTableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  cancelEnrollProvincial,
  getEnrollProvincialDetail,
} from '@common/api/provincialEnroll';
import { ProvincialEnrollResponseDto } from '@common/api/Api';
import { EduTargetMain, EduTargetSub } from '@common/api/learningMaterial';
import { useSnackbar } from '@hooks/useSnackbar';

const filterEnrollPeoples = [
  'age3',
  'age4',
  'age5',
  'grade1',
  'grade2',
  'grade3',
  'grade4',
  'grade5',
  'grade6',
  'elderly',
  'selfDriver',
];

interface Props {
  open: boolean;
  handleClose: () => void;
  enrollSeq: number;
  enrollOrganization: string;
}

interface EnrollData extends ProvincialEnrollResponseDto {
  persons: { age: string; count: number }[];
}

export function EnrollHistoryTrafficModal({
  open,
  handleClose,
  enrollSeq,
  enrollOrganization,
}: Props) {
  const snackbar = useSnackbar();
  const [enrollDetailData, setEnrollDetailData] = useState<EnrollData>();

  const handleEnrollCancel = async (enrollSeq: number) => {
    try {
      await cancelEnrollProvincial(enrollSeq);
      snackbar({ variant: 'success', message: '취소가 완료되었습니다.' });
      handleClose();
    } catch (e) {
      console.log(e);
      snackbar({
        variant: 'error',
        message: e.data.message,
      });
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getEnrollProvincialDetail(enrollSeq);
        const filteredPeople = Object.entries(data).filter(r =>
          filterEnrollPeoples.includes(r[0])
        );
        const notFilteredPeople = Object.entries(data).filter(
          r => !filterEnrollPeoples.includes(r[0])
        );
        const getExistPeople = filteredPeople.filter(r => r[1]);
        const enrollData = { persons: [] };
        getExistPeople.forEach(r => {
          enrollData.persons.push({ age: r[0], count: r[1] });
        });
        notFilteredPeople.forEach(r => {
          Object.assign(enrollData, { [r[0]]: r[1] });
        });
        setEnrollDetailData(enrollData);
      } catch (e) {
        console.log(e);
        snackbar({
          variant: 'error',
          message: e.data?.message || '정보를 불러오는중에 문제가 발생했습니다.',
        });
        handleClose();
      }
    })();
  }, []);

  if (!enrollDetailData)
    return (
      <Backdrop open={open}>
        <Spinner />
      </Backdrop>
    );

  return (
    <Modal
      open={open}
      onCloseModal={handleClose}
      title={enrollOrganization}
      maxWidth="lg"
      action={
        <>
          <Button
            variant="contained"
            // color="warning"
            sx={{
              width: '100px',
              background: 'red',
              '&:hover': { background: '#cc0000' },
            }}
            onClick={() => handleEnrollCancel(enrollDetailData.seq)}
          >
            신청 취소
          </Button>
        </>
      }
    >
      <ModalWrap>
        <Table sx={{ width: '100%' }}>
          <TableBody sx={{ display: 'table', width: '100%' }}>
            <TableDoubleRow>
              <TableDoubleParantLeftCell sx={{ width: '50%' }}>
                <TableDoubleLeftCell className="left-cell-border">NO</TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {enrollDetailData.seq}
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>
              <TableDoubleParantRightCell sx={{ width: '50%' }}>
                <TableDoubleLeftCell className="left-cell-border">
                  예약자
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {enrollDetailData.userInfo.name}
                </TableDoubleRightCell>
              </TableDoubleParantRightCell>
            </TableDoubleRow>

            <TableDoubleRow>
              <TableDoubleParantLeftCell>
                <TableDoubleLeftCell className="left-cell-border">
                  교육 대상자
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {
                    Object.entries(EduTargetMain).filter(
                      r => r[0] === enrollDetailData.eduTargetMain
                    )[0][1]
                  }
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>
              <TableDoubleParantRightCell>
                <TableDoubleLeftCell className="left-cell-border">
                  대상자 세부
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {
                    Object.entries(EduTargetSub).filter(
                      r => r[0] === enrollDetailData.eduTargetSub
                    )[0][1]
                  }
                </TableDoubleRightCell>
              </TableDoubleParantRightCell>
            </TableDoubleRow>
            {enrollDetailData.persons.map(r => (
              <TableRow>
                <TableLeftCell className="left-cell-border large-font">
                  {eduSubArr.filter(d => d.subType === r.age)[0].subKo}
                </TableLeftCell>
                <TableRightCell className="right-cell">{r.count}명</TableRightCell>
              </TableRow>
            ))}
            <TableRow>
              <TableLeftCell className="left-cell-border">교육 희망일</TableLeftCell>
              <TableRightCell className="right-cell">
                {enrollDetailData.expectedToStartDtime}
              </TableRightCell>
            </TableRow>
            <TableRow>
              <TableLeftCell className="left-cell-border">교육 만료일</TableLeftCell>
              <TableRightCell className="right-cell">
                {enrollDetailData.expiredDtime}
              </TableRightCell>
            </TableRow>
          </TableBody>
        </Table>
      </ModalWrap>
    </Modal>
  );
}

const ModalWrap = styled(Box)`
  width: 768px;
  padding: 0 12px;
  td {
    padding: 0;
    border: 0;
  }
  .left-cell-border {
    border: 1px solid rgb(52, 152, 219) !important;
    border-radius: 4px;
    /* padding: 6px 4px; */

    padding: 16px 0;
    font-weight: bold;
    font-size: 16px;
  }
  .right-cell {
    padding-left: 18px !important;
    /* padding: 6px 4px;
        padding: 16px 0; */
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    .left-cell-border {
      border: 1px solid rgb(52, 152, 219) !important;
      border-radius: 4px;
      /* padding: 6px 4px; */
      padding: 16px 0;
      font-weight: bold;
      font-size: 14px;
    }
    .right-cell {
      padding-left: 8px !important;
      padding: 0;
      /* padding: 6px 4px; */
      /* padding: 16px 0; */
      font-size: 16px;
      display: flex;
      align-items: center;
    }
    /* .large-font {
          font-size: 12px;
        } */
  }
  @media (max-width: 460px) {
    width: 100%;
    .left-cell-border {
      border: 1px solid rgb(52, 152, 219) !important;
      border-radius: 4px;
      /* padding: 6px 4px; */
      padding: 16px 0;
      font-weight: bold;
      font-size: 13px;
      display: flex;
      flex-direction: column;
    }
    /* .large-font {
          font-size: 10px;
        } */
  }
`;

const TableDoubleRow = styled(MuiTableRow)`
  display: flex;
  width: 100%;
  margin-bottom: 4px;
`;
const TableDoubleParantLeftCell = styled(TableCell)`
  display: flex;
  width: 50%;
`;
const TableDoubleParantRightCell = styled(TableCell)`
  display: flex;
  width: 50%;
`;
const TableDoubleLeftCell = styled(TableCell)`
  width: 40%;
  padding: 16px 0;
  font-size: 16px;
  background: rgba(52, 152, 219, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TableDoubleRightCell = styled(TableCell)`
  width: 60%;
  padding: 16px 0;
  font-size: 18px;
`;

const TableRow = styled(MuiTableRow)`
  display: flex;
  width: 100%;
  margin-bottom: 4px;
`;
const TableLeftCell = styled(TableCell)`
  width: 20%;
  background: rgba(52, 152, 219, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TableRightCell = styled(TableCell)`
  width: 80%;
`;

const eduSubArr: {
  subType: string;
  subKo: string;
}[] = [
  {
    subType: 'age3',
    subKo: '3세',
  },
  {
    subType: 'age4',
    subKo: '4세',
  },
  {
    subType: 'age5',
    subKo: '5세',
  },
  {
    subType: 'grade1',
    subKo: '1학년',
  },
  {
    subType: 'grade2',
    subKo: '2학년',
  },
  {
    subType: 'grade3',
    subKo: '3학년',
  },
  {
    subType: 'grade4',
    subKo: '4학년',
  },
  {
    subType: 'grade5',
    subKo: '5학년',
  },
  {
    subType: 'grade6',
    subKo: '6학년',
  },
  {
    subType: 'grade1',
    subKo: '1학년',
  },
  {
    subType: 'grade2',
    subKo: '2학년',
  },
  {
    subType: 'grade3',
    subKo: '3학년',
  },
  {
    subType: 'grade1',
    subKo: '1학년',
  },
  {
    subType: 'grade2',
    subKo: '2학년',
  },
  {
    subType: 'grade3',
    subKo: '3학년',
  },
  {
    subType: 'selfDriver',
    subKo: '자가운전자',
  },
  {
    subType: 'elderly',
    subKo: '어르신',
  },
];

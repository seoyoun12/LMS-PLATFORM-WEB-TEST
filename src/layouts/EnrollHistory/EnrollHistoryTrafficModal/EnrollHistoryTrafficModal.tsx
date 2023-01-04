import { Modal, Spinner } from '@components/ui';
import styled from '@emotion/styled';
import {
  Backdrop,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow as MuiTableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  cancelEnrollProvincial,
  getEnrollProvincialDetail,
} from '@common/api/provincialEnroll';
import { ProvincialEnrollResponseDto } from '@common/api/Api';
import { EduTargetMain, EduTargetSub } from '@common/api/learningMaterial';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { useForm } from 'react-hook-form';
import {
  CourseTrafficTargetType,
  TargetSubTypeReg,
} from 'src/staticDataDescElements/staticType';

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
  const dialog = useDialog();
  const { register, setValue, reset, watch } =
    useForm<ProvincialEnrollResponseDto>();

  console.log('enrollDetailData : ', enrollDetailData);

  const handleEnrollCancel = async (enrollSeq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '과정 취소하기',
        description: (
          <div>
            <div>취소시 교육과정을 다시 신청하셔야 합니다.</div>
            <div>정말로 취소하시겠습니까?</div>
            {/* <div style={{ color: 'red', fontSize: '14px' }}>*복구가 불가능합니다.*</div> */}
          </div>
        ),
        confirmText: '확인',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await cancelEnrollProvincial(enrollSeq);
        snackbar({ variant: 'success', message: '취소가 완료되었습니다.' });
        handleClose();
      }
    } catch (e) {
      console.log(e);
      snackbar({
        variant: 'error',
        message: e.data.message,
      });
    }
  };

  // 대상자 - 세부 변경을 위한 onChange
  const onChangeEduTargetSub = async (e: { target: { value: any } }) => {
    setValue('eduTargetSub', e.target.value);
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getEnrollProvincialDetail(enrollSeq);
        console.log('Enroll-history Modal Data : ', data);

        //신청자 grade1 , grade2...속성의 키와 값만 가져옵니다.
        const filteredPeople = Object.entries(data).filter(r =>
          filterEnrollPeoples.includes(r[0])
        );
        //그 외의 속성만 가져옵니다(대상자 , 대상자세부 , 교육만료일 등등...)
        const notFilteredPeople = Object.entries(data).filter(
          r => !filterEnrollPeoples.includes(r[0])
        );
        //신청자 grade1... 속성들중 값이 있는, 0 || null || undefined가 아닌 속성들만 필터링합니다.
        const getExistPeople = filteredPeople.filter(r => r[1]);
        //최종적으로 데이터를 가공하는 단계입니다. map메서드를 사용하여 편하게 코드작성하도록 모든 신청대상자들을
        //persons에 넣어주고 나머지 정보는 서버에서 받아온 그대로 속성을 그대로 넣어줍니다.
        const enrollData = { persons: [] };
        getExistPeople.forEach(r => {
          enrollData.persons.push({ age: r[0], count: r[1] });
        });
        notFilteredPeople.forEach(r => {
          Object.assign(enrollData, { [r[0]]: r[1] });
        });
        //최종적으로 별도의 로컬 상태에 넣어줍니다.
        //(변경을 고려하지 않았기 때문에 use hook form으로 변경하여 사용하면 편할것 같습니다.)
        setEnrollDetailData(enrollData);
      } catch (e) {
        console.log(e);
        snackbar({
          variant: 'error',
          message:
            e.data?.message || '정보를 불러오는중에 문제가 발생했습니다.',
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
                <TableDoubleLeftCell className="left-cell-border">
                  No
                </TableDoubleLeftCell>
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
                  교육 희망일
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {enrollDetailData.expectedToStartDtime}
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>
              <TableDoubleParantRightCell>
                <TableDoubleLeftCell className="left-cell-border">
                  교육 만료일
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {enrollDetailData.expiredDtime}
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
                  {/* {
                    Object.entries(EduTargetSub).filter(
                      r => r[0] === enrollDetailData.eduTargetSub
                    )[0][1]
                  } */}
                  {/*  */}
                  <FormControl fullWidth>
                    <Select
                      sx={{
                        marginLeft: '-10px',
                        mr: '10px',
                        fontWeight: 'bold',
                      }}
                      labelId="eduTargetSub"
                      id="eduTargetSub"
                      placeholder="세부 선택"
                      value={watch().eduTargetSub || ''}
                      onChange={onChangeEduTargetSub}
                    >
                      {CourseTrafficTargetType.filter(
                        item => item.type === enrollDetailData?.eduTargetMain
                      ).map(item =>
                        item.child.map(item => (
                          <MenuItem
                            key={item.type}
                            value={item.type}
                            sx={{ fontWeight: 'bold' }}
                          >
                            {item.ko}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                  {/*  */}
                </TableDoubleRightCell>
              </TableDoubleParantRightCell>
            </TableDoubleRow>

            {/* <TableDoubleRow>
              <TableDoubleParantLeftCell>
                <TableDoubleLeftCell className="left-cell-border">
                  대상자 세부
                </TableDoubleLeftCell>

                <TableDoubleRightCell className="right-cell">
                  <FormControl fullWidth>
                    <Select
                      sx={{
                        marginLeft: '-10px',
                        mr: '10px',
                        fontWeight: 'bold',
                      }}
                      labelId="eduTargetSub"
                      id="eduTargetSub"
                      placeholder="세부 선택"
                      value={watch().eduTargetSub || ''}
                      onChange={onChangeEduTargetSub}
                    >
                      {CourseTrafficTargetType.filter(
                        item => item.type === enrollDetailData?.eduTargetMain
                      ).map(item =>
                        item.child.map(item => (
                          <MenuItem
                            key={item.type}
                            value={item.type}
                            sx={{ fontWeight: 'bold' }}
                          >
                            {item.ko}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>

              <TableDoubleParantRightCell>
                <TableDoubleLeftCell className="left-cell-border">
                  123
                </TableDoubleLeftCell>

                <TableDoubleRightCell className="right-cell">
                  1234
                </TableDoubleRightCell>
              </TableDoubleParantRightCell>
            </TableDoubleRow> */}

            {enrollDetailData.persons.map(r => (
              <TableRow>
                <TableLeftCell className="left-cell-border large-font">
                  {eduSubArr.filter(d => d.subType === r.age)[0].subKo}
                </TableLeftCell>
                <TableRightCell className="right-cell">
                  {r.count}명
                </TableRightCell>
              </TableRow>
            ))}
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

export const eduSubArr: {
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

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
  updateEnrollProvincial,
} from '@common/api/provincialEnroll';
import { ProvincialEnrollResponseDto } from '@common/api/Api';
import { EduTargetMain } from '@common/api/learningMaterial';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { useForm } from 'react-hook-form';
import { CourseTrafficTargetType } from 'src/staticDataDescElements/staticType';

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

export function EnrollHistoryTrafficModal({
  open,
  handleClose,
  enrollSeq,
  enrollOrganization,
}: Props) {
  const snackbar = useSnackbar();
  // const [enrollDetailData, setEnrollDetailData] = useState<ProvincialEnrollResponseDto>();
  const dialog = useDialog();
  const {
    register,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProvincialEnrollResponseDto | null>({ defaultValues: null });
  const [loading, setLoading] = useState(false);

  //
  const handleEduPersonCount = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length > 6) return;
    if (value === '') return setValue(e.target.name as any, Number(value));
    if (value.length === 0 || value === '0') {
      return setValue(e.target.name as any, Number(value));
    }

    if (!Number(e.target.value)) return;
    setValue(e.target.name as any, Number(value.replace(/[^0-9]/g, '')));
  };

  //

  // console.log('enrollDetailData.persons : ', enrollDetailData?.persons);

  //

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
        // console.log('Enroll-history Modal Data : ', data);
        // console.log('useEffect 안의 data.eduTargetSub : ', data.eduTargetSub);

        // //신청자 grade1 , grade2...속성의 키와 값만 가져옵니다.
        // const filteredPeople = Object.entries(data).filter(r =>
        //   filterEnrollPeoples.includes(r[0])
        // );
        // //그 외의 속성만 가져옵니다(대상자 , 대상자세부 , 교육만료일 등등...)
        // const notFilteredPeople = Object.entries(data).filter(
        //   r => !filterEnrollPeoples.includes(r[0])
        // );
        // //신청자 grade1... 속성들중 값이 있는, 0 || null || undefined가 아닌 속성들만 필터링합니다.
        // const getExistPeople = filteredPeople.filter(r => r[1]);
        // //최종적으로 데이터를 가공하는 단계입니다. map메서드를 사용하여 편하게 코드작성하도록 모든 신청대상자들을
        // //persons에 넣어주고 나머지 정보는 서버에서 받아온 그대로 속성을 그대로 넣어줍니다.
        // const enrollData = { persons: [] };
        // getExistPeople.forEach(r => {
        //   enrollData.persons.push({ age: r[0], count: r[1] });
        // });
        // notFilteredPeople.forEach(r => {
        //   Object.assign(enrollData, { [r[0]]: r[1] });
        // });
        // // 수정하기 전 기존 데이터 setValue 해주기
        // console.log('useEffect 안의 data.eduTargetSub : ', data.eduTargetSub);

        // setValue('eduTargetSub', data.eduTargetSub);
        //최종적으로 별도의 로컬 상태에 넣어줍니다.
        //(변경을 고려하지 않았기 때문에 use hook form으로 변경하여 사용하면 편할것 같습니다.)
        reset(data);
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

  // 수정
  const onSubmit = async () => {
    const resetEduTargets = {
      age3: 0,
      age4: 0,
      age5: 0,
      grade1: 0,
      grade2: 0,
      grade3: 0,
      grade4: 0,
      grade5: 0,
      grade6: 0,
      elderly: 0,
      selfDriver: 0,
    };

    const filteredMainType = CourseTrafficTargetType.filter(
      f => f.type === watch().eduTargetMain
    )[0];
    const filteredSubType = filteredMainType.child.filter(
      f => f.type === watch().eduTargetSub
    )[0];
    filteredSubType.applicants.forEach(
      fo => (resetEduTargets[fo] = watch(fo as any))
    );

    const enrollInput = {
      ...watch(),
      ...resetEduTargets,
    };

    const dialogConfirmed = await dialog({
      title: '과정 수정하기',
      description: (
        <div>
          <div>정말로 과정을 수정하시겠습니까?</div>
        </div>
      ),
      confirmText: '확인',
      cancelText: '취소',
    });
    if (!dialogConfirmed) return;

    try {
      setLoading(true);
      await updateEnrollProvincial(enrollSeq, enrollInput);
      snackbar({
        variant: 'success',
        message: '성공적으로 수정완료 했습니다.',
      });
      setLoading(false);
      handleClose();
    } catch (e) {
      setLoading(false);
      console.log(e);
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  if (!Object.keys(watch())[0])
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
            onClick={() => handleEnrollCancel(watch().seq)}
          >
            신청 취소
          </Button>
          <Button
            variant="contained"
            sx={{ width: '100px' }}
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <Spinner fit={true} /> : '신청 수정'}
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
                  {watch().seq}
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>
              <TableDoubleParantRightCell sx={{ width: '50%' }}>
                <TableDoubleLeftCell className="left-cell-border">
                  예약자
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {watch().userInfo.name}
                </TableDoubleRightCell>
              </TableDoubleParantRightCell>
            </TableDoubleRow>

            <TableDoubleRow>
              <TableDoubleParantLeftCell>
                <TableDoubleLeftCell className="left-cell-border">
                  교육 희망일
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {watch().expectedToStartDtime}
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>
              <TableDoubleParantRightCell>
                <TableDoubleLeftCell className="left-cell-border">
                  교육 만료일
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {watch().expiredDtime}
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
                      r => r[0] === watch().eduTargetMain
                    )[0][1]
                  }
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>

              <TableDoubleParantRightCell>
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
                      value={watch().eduTargetSub}
                      onChange={onChangeEduTargetSub}
                    >
                      {CourseTrafficTargetType.filter(
                        item => item.type === watch()?.eduTargetMain
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
                  {/* ------------------------------------------------------------------- */}
                </TableDoubleRightCell>
              </TableDoubleParantRightCell>
            </TableDoubleRow>

            {/* 도민 온라인교육신청내역 수정폼 - 인원 */}
            {CourseTrafficTargetType.filter(
              mt => mt.type === watch()?.eduTargetMain
            ).map(item =>
              item.child
                .filter(st => st.type === watch().eduTargetSub)
                .map(item =>
                  item.applicants.map(ap => (
                    <TableDoubleParantLeftCell key={ap}>
                      <TableDoubleLeftCell
                        className="left-cell-border"
                        key={ap}
                        sx={{ mb: '4px' }}
                      >
                        {eduSubArr.filter(f => f.subType === ap)[0].subKo}
                      </TableDoubleLeftCell>
                      <TableDoubleRightCell className="right-cell">
                        <TextField
                          onChange={handleEduPersonCount}
                          name={ap}
                          // defaultValue={enrollDetailData.persons[ap] || 0}
                          // defaultValue={watch(ap as any)|| 0}
                          // 하기의 코드가 문제였습니다. watch(ap as any)를 하면 enrollData.[ap]로 동작하기때문에 맞지 않습니다. 그래서 데이터를 넣는 중 없는 속성 오류가 발생하여 or의 다음값인 0이 들어간 것입니다.
                          // 따라서 아래와 같이 바꿔주면 정상동작합니다.
                          value={watch(ap as any) || 0}
                          InputProps={{ endAdornment: <Box>명</Box> }}
                          sx={{
                            marginLeft: '-10px',
                            mr: '10px',
                            fontWeight: 'bold',
                            mb: '4px',
                          }}
                        />
                      </TableDoubleRightCell>
                    </TableDoubleParantLeftCell>
                  ))
                )
            )}
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

import { Modal, Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { Backdrop,Box,Button,FormControl,MenuItem,Select,Table,TableBody,TableCell,TableRow as MuiTableRow,TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getEnrollProvincialDetail,updateEnrollProvincial } from '@common/api/provincialEnroll';
import { ProvincialEnrollResponseDto } from '@common/api/Api';
import { EduTargetMain } from '@common/api/learningMaterial';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { useForm } from 'react-hook-form';
import { CourseTrafficTargetType } from 'src/staticDataDescElements/staticType';
import { isAllowedType } from '@utils/isAllowedType';
import { DeleteCourseInfoTrafficDetail } from '@common/api/adm/courseInfoTraffic';

interface Props {
  open: boolean;
  handleClose: () => void;
  enrollSeq: number;
  enrollOrganization: string;
}

export function EnrollHistoryTrafficModal({ open,handleClose,enrollSeq,enrollOrganization }: Props) {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const { setValue,reset,watch } = useForm<ProvincialEnrollResponseDto | null>({ defaultValues: null });
  const [loading, setLoading] = useState(false);

  const handleEduPersonCount = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const {name, value} = e.target;
    // name이 ProvinceEnrollResponse가 아니라면 return
    const isAllowed = isAllowedType(name);
    if(!isAllowed) return;

    if (value.length > 6) return;
    if (value === '') return setValue(name, Number(value)) 
    if (value.length === 0 || value === '0') {
      return setValue(name, Number(value));
    }
    if (!Number(value)) return;
    setValue(name, Number(value.replace(/[^0-9]/g , '')));
  };

  const handleEnrollCancel = async (enrollSeq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '과정 취소하기',
        description: (
          <div>
            <div>취소시 교육과정을 다시 신청하셔야 합니다.</div>
            <div>정말로 취소하시겠습니까?</div>
            
          </div>
        ),
        confirmText: '확인',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await DeleteCourseInfoTrafficDetail(enrollSeq);
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
  const onChangeEduTargetSub = async (e) => {
    setValue('eduTargetSub', e.target.value);
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getEnrollProvincialDetail(enrollSeq);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const filteredMainType = CourseTrafficTargetType.filter(f => f.type === watch().eduTargetMain)[0];
    const filteredSubType = filteredMainType.child.filter(f => f.type === watch().eduTargetSub)[0];
    filteredSubType.applicants.forEach((fo) => (resetEduTargets[fo] = watch(fo as any)));

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
              '&:hover': { background: 'rgb(191,49,51)' },
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
                          value={isAllowedType(ap) ? watch(ap as any) : 0}
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

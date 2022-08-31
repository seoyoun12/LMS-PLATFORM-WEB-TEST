import { getCourseClassStep, RegisterType } from '@common/api/courseClass';
import {
  getSingleCourseUser,
  modifyCourseUserIndi,
  modifyCourseUserOrga,
  ModifyCourseUserReqDto,
  RegType,
  delelteCourseUserIndi,
  delelteCourseUserOrga,
  FindCourseUserRes,
} from '@common/api/courseUser';
import { Modal, Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import { locationList } from '@layouts/MeEdit/MeEdit';
import {
  userBusinessTypeOne,
  userBusinessTypeTwo,
} from '@layouts/MeEdit/TransWorker/TransWorker';
import {
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
import { useForm } from 'react-hook-form';

interface Props {
  open: boolean;
  handleClose: () => void;
  courseUserSeq: number;
  courseTitle: string;
  regType: RegisterType;
}

export function EnrollHistoryModal({
  open,
  handleClose,
  courseUserSeq,
  regType,
  courseTitle,
}: Props) {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const { register, setValue, reset, watch } = useForm<FindCourseUserRes>();
  const [getDateLoading, setGetDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stepsRes, setStepsRes] = useState<
    {
      seq: number;
      step: number;
      studyStartDate: string;
      studyEndDate: string;
      enrolledPeopleCnt: number;
      limitPeople: number;
    }[]
  >([]); //기수 교육시작 교육끝
  const [stepSeq, setStepSeq] = useState<number>();

  useEffect(() => {
    (async function () {
      try {
        setGetDataLoading(true);
        const { data } = await getSingleCourseUser(
          courseUserSeq,
          (regType === RegisterType.TYPE_INDIVIDUAL ? 'individual' : 'organization') ===
            RegType.TYPE_INDIVIDUAL
            ? RegType.TYPE_INDIVIDUAL
            : RegType.TYPE_ORGANIZATION
        );
        console.log(data, '하ㅣ하');
        // setValue('businessName', data.userCompanyName);
        // setValue('businessSubType', data.userSubBusinessType);
        // setValue('businessType', data.userBusinessType);
        // setValue('carNumber', data.carNumber);
        // setValue('carRegisteredRegion', data.carRegisteredRegion);
        // setValue('phone', data.phone);
        // setValue('seq', data.seq);
        reset({ ...data });
        setPhone1(data.phone.slice(0, 3));
        setPhone2(data.phone.slice(3, 7));
        setPhone3(data.phone.slice(7, 11));
        setStepSeq(data.courseClassSeq);

        const stepData = await getCourseClassStep(
          data.courseType,
          data.categoryType,
          data.businessType
        );
        setStepsRes(
          stepData.data.map(item => {
            return {
              seq: item.seq,
              step: item.step,
              studyStartDate: item.studyStartDate,
              studyEndDate: item.studyEndDate,
              enrolledPeopleCnt: item.enrolledPeopleCnt,
              limitPeople: item.limitPeople,
            };
          })
        );
        setGetDataLoading(false);
      } catch (e: any) {
        setGetDataLoading(false);
        snackbar({ variant: 'error', message: e.data.message });
      }
    })();
  }, []);

  const onSubmit = async () => {
    // for (let [key, obj] of Object.entries(watch())) {
    //   if (!obj || obj === '') return window.alert('모두 입력해 주세요!');
    // }
    // if (phone1.length !== 3 || phone2.length !== 4 || phone3.length !== 4) {
    //   return window.alert('모두 입력해 주세요!');
    // }

    try {
      setLoading(true);
      const dialogConfirmed = await dialog({
        title: '정보 수정하기',
        description: '정말로 수정하시겠습니까?',
        confirmText: '수정하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        const dataValue = {
          businessName: watch().userCompanyName,
          businessSubType: watch().userSubBusinessType,
          businessType: watch().userBusinessType,
          carNumber: watch().carNumber,
          carRegisteredRegion: watch().carRegisteredRegion,
          courseClassSeq: stepSeq,
          phone: watch().phone,
        };

        if (regType === RegisterType.TYPE_INDIVIDUAL) {
          const data = await modifyCourseUserIndi(courseUserSeq, dataValue);
        }
        if (regType === RegisterType.TYPE_ORGANIZATION) {
          const data = await modifyCourseUserOrga(courseUserSeq, dataValue);
        }
        snackbar({ variant: 'success', message: '성공적으로 수정완료 했습니다.' });
        handleClose();
      }
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const onClickDelete = async () => {
    try {
      const dialogConfirmed = await dialog({
        title: '신청 취소하기',
        description: '정말로 신청을 취소하시겠습니까?',
        confirmText: '신청 취소하기',
        cancelText: '돌아가기',
      });
      if (!dialogConfirmed) return;
      if (regType === RegisterType.TYPE_INDIVIDUAL) {
        await delelteCourseUserIndi(courseUserSeq);
      }
      if (regType === RegisterType.TYPE_ORGANIZATION) {
        await delelteCourseUserOrga(courseUserSeq);
      }
      snackbar({ variant: 'success', message: '성공적으로 수정완료 했습니다.' });
      handleClose();
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  if (getDateLoading) return <Spinner />;
  return (
    <Modal
      open={open}
      onCloseModal={handleClose}
      title={courseTitle}
      maxWidth="lg"
      action={
        <Box width="100%" display="flex" justifyContent="flex-end" gap={2}>
          {loading ? (
            <Spinner fit={true} />
          ) : (
            <>
              <Button
                variant="contained"
                // color="warning"
                sx={{
                  width: '100px',
                  background: 'red',
                  '&:hover': { background: '#cc0000' },
                }}
                onClick={onClickDelete}
              >
                신청 취소
              </Button>
              <Button variant="contained" sx={{ width: '100px' }} onClick={onSubmit}>
                기수 변경
              </Button>
            </>
          )}
        </Box>
      }
    >
      <ModalWrap>
        <Table sx={{ width: '100%' }}>
          <TableBody sx={{ display: 'table', width: '100%' }}>
            <TableDoubleRow>
              <TableDoubleParantLeftCell sx={{ width: '50%' }}>
                <TableDoubleLeftCell className="left-cell-border">NO</TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {watch().seq}
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>
              <TableDoubleParantRightCell sx={{ width: '50%' }}>
                <TableDoubleLeftCell className="left-cell-border">
                  예약자
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {watch().name}
                </TableDoubleRightCell>
              </TableDoubleParantRightCell>
            </TableDoubleRow>
            <TableRow>
              <TableLeftCell className="left-cell-border large-font">
                <Box>주민등록</Box>
                <Box>번호</Box>
              </TableLeftCell>
              <TableRightCell className="right-cell">
                {watch().identityNumber?.substring(0, 6)} -{' '}
                {watch().identityNumber?.substring(6, 13)}
              </TableRightCell>
            </TableRow>
            <TableRow>
              <TableLeftCell className="left-cell-border">예약신청일</TableLeftCell>
              <TableRightCell className="right-cell">{watch().regDate}</TableRightCell>
            </TableRow>
            <TableRow>
              <TableLeftCell className="left-cell-border">교육일</TableLeftCell>
              <TableRightCell className="right-cell">{watch().studyDate}</TableRightCell>
            </TableRow>
            <TableDoubleRow>
              <TableDoubleParantLeftCell>
                <TableDoubleLeftCell className="left-cell-border">
                  교육시간
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {watch().learningTime}
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>
              <TableDoubleParantRightCell>
                <TableDoubleLeftCell className="left-cell-border">
                  교육장
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  동영상(VOD)
                </TableDoubleRightCell>
              </TableDoubleParantRightCell>
            </TableDoubleRow>
            {/* <TableRow>
              <TableLeftCell>회사명</TableLeftCell>
              <TableRightCell>
                <TextField {...register('')} fullWidth />
              </TableRightCell>
            </TableRow> */}
            {/* <TableRow>
              <TableLeftCell>차량번호</TableLeftCell>
              <TableRightCell>
                <TextField {...register('carNumber')} fullWidth />
              </TableRightCell>
            </TableRow> */}
            <TableDoubleRow>
              <TableDoubleParantLeftCell>
                <TableDoubleLeftCell className="left-cell-border">
                  교육구분
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  {watch().userBusinessType === 'FREIGHT' ? '화물' : '여객'}
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>
              <TableDoubleParantLeftCell>
                <TableDoubleLeftCell className="left-cell-border">
                  온라인과정
                </TableDoubleLeftCell>
                <TableDoubleRightCell className="right-cell">
                  보수일반
                </TableDoubleRightCell>
              </TableDoubleParantLeftCell>
            </TableDoubleRow>
            <TableRow>
              <TableLeftCell className="left-cell-border large-font">
                <Box>기수 / </Box>
                <Box>교육일자</Box>
              </TableLeftCell>
              <TableRightCell className="right-cell ">
                <FormControl fullWidth>
                  <Select
                    id="student"
                    value={stepSeq}
                    onChange={e => {
                      setStepSeq(Number(e.target.value));
                      // setStepSeq(Number(e.target.value));
                      // setValue('courseClassSeq', Number(e.target.value));
                      // setEnrollInfo({ seq: Number(e.target.value) });
                    }}
                  >
                    {stepsRes.map(item => {
                      return (
                        <MenuItem key={item.step} value={item.seq}>
                          {item.step}기 / {item.studyStartDate} ~ {item.studyEndDate} (
                          {item.limitPeople === 0
                            ? '제한없음'
                            : `${item.enrolledPeopleCnt} / ${item.limitPeople}`}
                          )
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
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

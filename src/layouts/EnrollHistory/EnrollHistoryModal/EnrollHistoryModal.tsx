import {
  courseSubCategoryType,
  getCourseClassStep,
  RegisterType,
} from '@common/api/courseClass';
import {
  getSingleCourseUser,
  modifyCourseUserIndi,
  modifyCourseUserOrga,
  RegType,
  delelteCourseUserIndi,
  delelteCourseUserOrga,
  FindCourseUserRes,
} from '@common/api/courseUser';
import { phoneList } from '@common/constant';
import { Modal, Spinner } from '@components/ui';
import { EnrollHistoryCarNumberBox } from '@components/ui/EnrollHistory';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import { locationList, residenceList } from '@layouts/MeEdit/MeEdit';
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
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableRow as MuiTableRow,
  TextField,
} from '@mui/material';
import { checkDatePeriod } from '@utils/checkDate';
import { carNumberRegex, Phone4Regex } from '@utils/inputRegexes';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const { register, setValue, reset, watch } = useForm<FindCourseUserRes>();
  const { setValue: setPhone, watch: watchPhone } = useForm<{
    phone1: string;
    phone2: string;
    phone3: string;
  }>();
  const [getDateLoading, setGetDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stepsRes, setStepsRes] = useState<
    {
      seq: number;
      step: number;
      studyStartDate: string;
      studyEndDate: string;
      enrolledPeopleCnt?: number;
      limitPeople?: number;
    }[]
  >([]); //기수 교육시작 교육끝
  const [stepSeq, setStepSeq] = useState<number>();
  const [isStudyPeriod, setIsStudyPeriod] = useState<boolean>(true);
  const [isAfterStudyDate, setIsAfterStudyDate] = useState<boolean>(false); //학습종료일자가 지났으면 버튼삭제.
  const [hideCarNumber, setHideCarNumber] = useState<boolean>(false); //특정 비지니스 서브업종은 비활성화
  const [disabledCompany, setDisabledCompany] = useState<boolean>(false); //특정 비지니스 서브업종은 비활성화

  useEffect(() => {
    (async function () {
      try {
        setGetDataLoading(true);
        const { data } = await getSingleCourseUser(
          courseUserSeq,
          (regType === RegisterType.TYPE_INDIVIDUAL
            ? 'individual'
            : 'organization') === RegType.TYPE_INDIVIDUAL
            ? RegType.TYPE_INDIVIDUAL
            : RegType.TYPE_ORGANIZATION
        );
        reset({ ...data });
        setIsStudyPeriod(
          checkDatePeriod(
            watch().studyStartDate,
            watch().studyEndDate,
            dateFormat(new Date(), 'yyyy-mm-dd')
          )
        );
        const isAfter =
          new Date(watch().studyEndDate.replaceAll('-', '/')).getTime() <
          new Date().getTime();
        setIsAfterStudyDate(isAfter);

        onChangeBusinessSubType(data.userSubBusinessType, data.userCompanyName);

        setPhone('phone1', data.phone.slice(0, 3));
        setPhone('phone2', data.phone.slice(3, 7));
        setPhone('phone3', data.phone.slice(7, 11));
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
              studyStartDate: dateFormat(
                item.studyStartDate.replaceAll('-', '/'),
                'yyyy-mm-dd'
              ),
              studyEndDate: dateFormat(
                item.studyEndDate.replaceAll('-', '/'),
                'yyyy-mm-dd'
              ),
              enrolledPeopleCnt: item.enrolledPeopleCnt,
              limitPeople: item.limitPeople,
            };
          })
        );
        if (
          checkDatePeriod(
            watch().studyStartDate,
            watch().studyEndDate,
            dateFormat(new Date(), 'yyyy-mm-dd')
          ) ||
          isAfter
        ) {
          setStepsRes([
            {
              seq: data.courseClassSeq,
              step: data.step,
              studyStartDate: dateFormat(
                data.studyStartDate.replaceAll('-', '/'),
                'yyyy-mm-dd'
              ),
              studyEndDate: dateFormat(
                data.studyEndDate.replaceAll('-', '/'),
                'yyyy-mm-dd'
              ),
              enrolledPeopleCnt: data.enrolledPeopleCnt,
              limitPeople: data.limitPeople,
            },
          ]);
        }
        setGetDataLoading(false);
      } catch (e: any) {
        setGetDataLoading(false);
        snackbar({ variant: 'error', message: e.data.message });
      }
    })();
  }, []);

  //기수변경
  const onSubmit = async () => {
    // for (let [key, obj] of Object.entries(watch())) {
    //   if (!obj || obj === '') return window.alert('모두 입력해 주세요!');
    // }
    // if (phone1.length !== 3 || phone2.length !== 4 || phone3.length !== 4) {
    //   return window.alert('모두 입력해 주세요!');
    // }

    if (!hideCarNumber && !carNumberRegex.test(watch().carNumber)) {
      return snackbar({
        variant: 'error',
        message: '올바른 형식의 차량번호를 입력해주세요!',
      });
    }
    if (watch().userCompanyName === '' || !watch().userCompanyName) {
      return snackbar({
        variant: 'error',
        message: '회사명을 입력해주세요!',
      });
    }
    if (
      watchPhone().phone1.length !== 3 ||
      watchPhone().phone2.length !== 4 ||
      watchPhone().phone3.length !== 4
    ) {
      return snackbar({
        variant: 'error',
        message: '올바른 휴대번호를 입력해주세요!',
      });
    }
    try {
      setLoading(true);
      const dialogConfirmed = await dialog({
        title: '정보 수정하기',
        description: '정말로 수정하시겠습니까?',
        confirmText: '수정하기',
        cancelText: '취소',
      });
      if (!dialogConfirmed) {
        setLoading(false);
      }

      if (dialogConfirmed) {
        const dataValue = {
          businessName: watch().userCompanyName,
          businessSubType: watch().userSubBusinessType,
          businessType: watch().userBusinessType,
          carNumber: watch().carNumber,
          carRegisteredRegion: watch().carRegisteredRegion,
          courseClassSeq: stepSeq,
          residence: watch().residence,
          phone:
            watchPhone().phone1 + watchPhone().phone2 + watchPhone().phone3,
        };

        if (regType === RegisterType.TYPE_INDIVIDUAL) {
          const data = await modifyCourseUserIndi(courseUserSeq, dataValue);
        }
        if (regType === RegisterType.TYPE_ORGANIZATION) {
          const data = await modifyCourseUserOrga(courseUserSeq, dataValue);
        }
        snackbar({
          variant: 'success',
          message: '성공적으로 수정완료 했습니다.',
        });
        handleClose();
      }
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  //신청취소
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
      snackbar({
        variant: 'success',
        message: '성공적으로 신청취소 했습니다.',
      });
      handleClose();
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  //인풋 잠금처리를 위한 change
  const onChangeBusinessSubType = (value: string, userCompanyName?: string) => {
    // const {
    //   target: { value },
    // } = e;
    if (courseSubCategoryType.CHARTER_BUS === value) {
      // setValue('userCompanyName', '');
      setValue('userSubBusinessType', value as courseSubCategoryType);
      setDisabledCompany(false);
      return setHideCarNumber(false);
    }

    if (courseSubCategoryType.SPECIAL_PASSENGER === value) {
      // setValue('userCompanyName', '');
      setValue('userSubBusinessType', value as courseSubCategoryType);
      setDisabledCompany(false);
      return setHideCarNumber(true);
    }

    if (courseSubCategoryType.PRIVATE_TAXI === value) {
      setValue(
        'userCompanyName',
        userBusinessTypeTwo.filter(item => item.enType === value)[0].type
      );
      setValue('userSubBusinessType', value as courseSubCategoryType);
      setDisabledCompany(true);
      return setHideCarNumber(false);
    }

    //차량번호 비활성화
    if (
      courseSubCategoryType.BUS === value ||
      courseSubCategoryType.CHARTER_BUS === value ||
      courseSubCategoryType.CORPORATE_TAXI === value
    ) {
      setValue('carNumber', null);
      // setValue('userCompanyName', '');
      setValue('userSubBusinessType', value as courseSubCategoryType);
      setDisabledCompany(false);
      return setHideCarNumber(true);
    }

    //회사명 고정
    if (
      courseSubCategoryType.PRIVATE_TAXI === value ||
      courseSubCategoryType.CONSIGNMENT === value ||
      courseSubCategoryType.INDIVIDUAL_CARGO === value
    ) {
      setDisabledCompany(true);
      setValue(
        'userCompanyName',
        userBusinessTypeTwo.filter(item => item.enType === value)[0].type
      );
      if (courseSubCategoryType.PRIVATE_TAXI === value)
        setDisabledCompany(false); //개인택시 보이게
      return setValue('userSubBusinessType', value);
    }
    setDisabledCompany(false);
    setHideCarNumber(false);
    setValue('userCompanyName', userCompanyName);
    setValue('userSubBusinessType', value as courseSubCategoryType);
  };

  if (getDateLoading) return <Spinner />;
  return (
    <Modal
      open={open}
      onCloseModal={handleClose}
      title={courseTitle}
      maxWidth="lg"
      action={
        isAfterStudyDate ? (
          ''
        ) : (
          <Box width="100%" display="flex" justifyContent="flex-end" gap={2}>
            {loading ? (
              <Spinner fit={true} />
            ) : isStudyPeriod ? (
              <Button
                variant="contained"
                onClick={() => {
                  window.open(
                    `/course/${watch().seq}/lesson/${watch().firstChapterSeq}`,
                    // '',
                    '_blank'
                  );
                }}
              >
                학습하기
              </Button>
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
                <Button
                  variant="contained"
                  sx={{ width: '100px' }}
                  onClick={onSubmit}
                >
                  신청 수정
                </Button>
              </>
            )}
          </Box>
        )
      }
    >
      <ModalWrap>
        <Table sx={{ width: '100%' }}>
          <TableBody sx={{ display: 'table', width: '100%' }}>
            <TableDoubleRow>
              <TableDoubleParantLeftCell sx={{ width: '50%' }}>
                <TableDoubleLeftCell className="left-cell-border">
                  NO
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
              <TableLeftCell className="left-cell-border">
                예약신청일
              </TableLeftCell>
              <TableRightCell className="right-cell">
                {watch().regDate}
              </TableRightCell>
            </TableRow>
            <TableRow>
              <TableLeftCell className="left-cell-border">교육일</TableLeftCell>
              <TableRightCell className="right-cell">
                {watch().studyDate}
              </TableRightCell>
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

            <TableRow>
              <TableLeftCell className="left-cell-border">
                온라인과정
              </TableLeftCell>

              <TableRightCell className="right-cell">
                {watch().courseType === 'TYPE_LOW_FLOOR_BUS'
                  ? '저상버스 운전자교육'
                  : '보수일반'}
              </TableRightCell>
            </TableRow>

            {watch().courseType === 'TYPE_LOW_FLOOR_BUS' ? (
              ''
            ) : (
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
                    업종
                  </TableDoubleLeftCell>
                  <TableDoubleRightCell className="right-cell">
                    <FormControl fullWidth>
                      <Select
                        {...register('userSubBusinessType')}
                        onChange={e => {
                          onChangeBusinessSubType(e.target.value);
                        }}
                        value={watch().userSubBusinessType || ''}
                        disabled={isStudyPeriod || isAfterStudyDate}
                      >
                        {userBusinessTypeTwo
                          .filter(
                            filter =>
                              filter.TYPE_BUSINESS === watch().businessType
                          )
                          .map(item => (
                            <MenuItem key={item.enType} value={item.enType}>
                              {item.type}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </TableDoubleRightCell>
                </TableDoubleParantLeftCell>
              </TableDoubleRow>
            )}

            <TableRow>
              <TableLeftCell className="left-cell-border">회사명</TableLeftCell>

              <TableRightCell className="right-cell">
                <TextField
                  {...register('userCompanyName')}
                  disabled={
                    isStudyPeriod || isAfterStudyDate || disabledCompany
                  }
                  fullWidth
                />
              </TableRightCell>
            </TableRow>
            {hideCarNumber === false && (
              <TableRow>
                <TableLeftCell className="left-cell-border">
                  차량번호
                </TableLeftCell>

                <TableRightCell className="right-cell">
                  <EnrollHistoryCarNumberBox
                    parantSetValue={setValue}
                    localName={watch().carNumber?.substring(0, 2)}
                    digit2={watch().carNumber?.substring(2, 4)}
                    oneWord={watch().carNumber?.substring(4, 5)}
                    digit4={watch().carNumber?.substring(5, 9)}
                    isStudyPeriod={isStudyPeriod || isAfterStudyDate}
                  />
                </TableRightCell>
              </TableRow>
            )}

            <TableRow>
              <TableLeftCell className="left-cell-border">
                차량등록지
              </TableLeftCell>

              <TableRightCell className="right-cell">
                <FormControl fullWidth>
                  <Select
                    {...register('carRegisteredRegion')}
                    value={watch().carRegisteredRegion || ''}
                    disabled={isStudyPeriod || isAfterStudyDate}
                  >
                    {locationList.map(item => (
                      <MenuItem key={item.en} value={item.en}>
                        {item.ko}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableRightCell>
            </TableRow>
            <TableRow>
              <TableLeftCell className="left-cell-border">거주지</TableLeftCell>

              <TableRightCell className="right-cell">
                <FormControl fullWidth>
                  <Select
                    {...register('residence')}
                    value={watch().residence || '없음'}
                    disabled={isStudyPeriod || isAfterStudyDate}
                  >
                    {residenceList.map(item => (
                      <MenuItem key={item.en} value={item.en}>
                        {item.ko}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableRightCell>
            </TableRow>
            <TableRow>
              <TableLeftCell className="left-cell-border">
                휴대번호
              </TableLeftCell>

              <TableRightCell className="right-cell">
                <FormControl fullWidth>
                  <Select
                    labelId="phone-type-label"
                    id="phone-type"
                    onChange={e => {
                      setPhone('phone1', e.target.value);
                    }}
                    value={watchPhone().phone1 || ''}
                    disabled={isStudyPeriod || isAfterStudyDate}
                  >
                    <MenuItem value={''}>선택</MenuItem>
                    {phoneList.map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                -
                <TextField
                  onChange={e => {
                    if (Phone4Regex.test(e.target.value)) return;
                    setPhone('phone2', e.target.value.replace(/[^0-9]/g, ''));
                  }}
                  value={watchPhone().phone2}
                  disabled={isStudyPeriod || isAfterStudyDate}
                  inputProps={{ inputMode: 'numeric' }}
                  fullWidth
                />
                -
                <TextField
                  onChange={e => {
                    if (Phone4Regex.test(e.target.value)) return;
                    setPhone('phone3', e.target.value.replace(/[^0-9]/g, ''));
                  }}
                  value={watchPhone().phone3}
                  disabled={isStudyPeriod || isAfterStudyDate}
                  inputProps={{ inputMode: 'numeric' }}
                  fullWidth
                />
              </TableRightCell>
            </TableRow>
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
                    disabled={isStudyPeriod || isAfterStudyDate}
                  >
                    {stepsRes.map(item => {
                      return (
                        <MenuItem key={item.step} value={item.seq}>
                          {item.step}기 / {item.studyStartDate} ~{' '}
                          {item.studyEndDate} (
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

import { CourseLearningInfoInput } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import {
  ProvincialEnrollResponseDto,
  ProvincialEnrollUpdateRequestDto,
  UserCourseInfoDetailCourseInfoDto,
} from '@common/api/Api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { courseSubCategory } from '@layouts/Calendar/CalendarBody/CalendarBody';
import { ErrorMessage } from '@hookform/error-message';
import { Spinner } from '@components/ui';
import {
  businessSubType,
  businessSubTypeCategoryReg,
  businessSubTypeReg,
  CourseTrafficTargetType,
  locationList,
  residenceList,
  TargetSubTypeReg,
} from 'src/staticDataDescElements/staticType';
import { carNumberRegex } from '@utils/inputRegexes';
import { eduSubArr } from '@layouts/EnrollHistory/EnrollHistoryTrafficModal/EnrollHistoryTrafficModal';

interface FormType extends ProvincialEnrollUpdateRequestDto {}

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

const defaultValues: ProvincialEnrollUpdateRequestDto = {
  age3: 0,
  age4: 0,
  age5: 0,
  eduTargetMain: 'TYPE_CHILDREN',
  eduTargetSub: 'TYPE_KINDERGARTEN',
  elderly: 0,
  expectedToStartDtime: 'yyyy-MM-dd',
  grade1: 0,
  grade2: 0,
  grade3: 0,
  grade4: 0,
  grade5: 0,
  grade6: 0,
  organization: 'string',
  region: 'CHEONAN',
  selfDriver: 0,
};

export function CourseInfomationTraffic({
  enrollInfo,
  onHandleSubmit,
}: {
  enrollInfo?: ProvincialEnrollResponseDto;

  onHandleSubmit: ({
    enrollInput,
    provincialEnrollSeq,
    setLoading,
  }: {
    enrollInput: ProvincialEnrollUpdateRequestDto;
    provincialEnrollSeq: number;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void;
}) {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { enrollSeq } = router.query;
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProvincialEnrollUpdateRequestDto>({ defaultValues });

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

  const onSubmit: SubmitHandler<FormType> = async (formData, event) => {
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

    const filteredMainType = CourseTrafficTargetType.filter(f => f.type === watch().eduTargetMain)[0]
    const filteredSubType = filteredMainType.child.filter(f => f.type === watch().eduTargetSub)[0]
    filteredSubType.applicants.forEach(fo => (resetEduTargets[fo] = watch(fo as any)));
    // CourseTrafficTargetType.filter(f => f.type === watch().eduTargetMain)[0]
    //   .child.filter(f => f.type === watch().eduTargetSub)[0]
    //   .applicants.forEach(fo => (resetEduTargets[fo] = watch(fo as any)));

    const enrollInput = {
      ...formData,
      ...resetEduTargets,
    };


    onHandleSubmit({
      enrollInput: enrollInput,
      provincialEnrollSeq: Number(enrollSeq),
      setLoading,
    });
  };
  //초기화
  useEffect(() => {
    reset(enrollInfo);
  }, []);

  return (
    <CourseInfomationBox component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* <CourseInfomationBox component="form" onSubmit={onSubmit}> useForm을 사용하지 않을때.*/}
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        수강정보
      </TableHeadFull>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell align="center">회원명</TableLeftCell>
          <TableRightCell>{enrollInfo?.userInfo?.name}</TableRightCell>
          <TableLeftCell align="center">회원아이디</TableLeftCell>
          <TableRightCell>
            {enrollInfo?.userInfo?.username
              ? enrollInfo?.userInfo?.username
              : '-'}
          </TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">소속</TableLeftCell>
          <TableRightCell>{enrollInfo?.organization}</TableRightCell>
          <TableLeftCell align="center">등록일</TableLeftCell>
          <TableRightCell>{enrollInfo?.createdDtime}</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">신청희망날짜</TableLeftCell>
          <TableRightCell>{enrollInfo?.expectedToStartDtime}</TableRightCell>
          <TableLeftCell align="center">수강 종료기간</TableLeftCell>
          <TableRightCell>{enrollInfo?.expiredDtime}</TableRightCell>
        </TableRow>
      </TableBody>

      <TableHeadFull
        colSpan={4}
        sx={{ display: 'table', width: '100%', mt: '10px' }}
      >
        신청대상자 정보
      </TableHeadFull>

      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell align="center">교육대상자</TableLeftCell>
          <TableRightCell>
            {
              CourseTrafficTargetType.filter(
                f => f.type === enrollInfo.eduTargetMain
              )[0].ko
            }
          </TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">교육대상자 세부</TableLeftCell>
          <TableRightCell>
            <Select
              onChange={e => setValue('eduTargetSub', e.target.value as any)}
              value={watch().eduTargetSub}
            >
              {CourseTrafficTargetType.filter(
                f => f.type === enrollInfo.eduTargetMain
              )[0].child.map(m => (
                <MenuItem key={m.type} value={m.type}>
                  {m.ko}
                </MenuItem>
              ))}
            </Select>
          </TableRightCell>
        </TableRow>
        {CourseTrafficTargetType.filter(
          f => f.type === watch().eduTargetMain
        )[0]
          .child.filter(f => f.type === watch().eduTargetSub)[0]
          .applicants.map(m => (
            <TableRow key={m}>
              <TableLeftCell align="center">
                {eduSubArr.filter(f => f.subType === m)[0].subKo}
              </TableLeftCell>
              <TableRightCell>
                <TextField
                  onChange={handleEduPersonCount}
                  name={m}
                  defaultValue={enrollInfo[m] || 0}
                  value={watch(m as any) || 0}
                  InputProps={{ endAdornment: <Box>명</Box> }}
                />
              </TableRightCell>
            </TableRow>
          ))}
      </TableBody>

      <ButtonBox>
        <SubmitBtn variant="contained" type="submit" disabled={loading}>
          {loading ? <Spinner fit={true} /> : '수정하기'}
        </SubmitBtn>
      </ButtonBox>
    </CourseInfomationBox>
  );
}

const CourseInfomationBox = styled(Box)``;

const TableHeadFull = styled(TableCell)`
  width: 100%;
  background: #f5f5f5;
  border: 1px solid #c4c4c4;
  font-weight: bold;
`;

const TableLeftCell = styled(TableCell)`
  width: 10%;
  background: #f5f5f5;
  border-right: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  &:first-of-type {
    border-left: 1px solid #c4c4c4;
    width: 10%;
  }
`;

const TableRightCell = styled(TableCell)`
  width: 40%;
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  font: 14px;
`;

const ButtonBox = styled(Box)`
  margin: 10px 0 10px 0;
  text-align: center;
`;

const SubmitBtn = styled(Button)`
  width: 8%;
`;

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

interface FormType extends UserCourseInfoDetailCourseInfoDto {
  firstStr?: string;
  firstNum?: string;
  secondStr?: string;
  secondNum?: string;
}

const localList = [
  { title: '충남', type: 'NAM' },
  { title: '세종', type: 'SEJONG' },
];
const oneWordList = ['아', '바', '사', '자', '배'];

const defaultValues = {
  // 처음 undefined면 value 가 변경되어도 적용이 안된다. 그래서 초기값 defaultValues 로 빈 스트링을 넣어준다.
  // businessSubType: '',
  businessName: '',
  firstStr: '',
  firstNum: '',
  secondStr: '',
  secondNum: '',
  // carRegistrationRegion: '',
  // residence: '',
  phone: '',
};

export function CourseInfomationTraffic({
  enrollInfo,
  onHandleSubmit,
}: {
  enrollInfo?: ProvincialEnrollResponseDto;
  onHandleSubmit: ({
    courseLearningInfoInput,
    courseUserSeq,
    setLoading,
  }: {
    courseLearningInfoInput: CourseLearningInfoInput;
    courseUserSeq: number;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void;
}) {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { enrollSeq } = router.query;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormType>({ defaultValues });

  return (
    <CourseInfomationBox component="form">
      {/* <CourseInfomationBox component="form" onSubmit={onSubmit}> useForm을 사용하지 않을때.*/}
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        수강정보
      </TableHeadFull>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell align="center">소속</TableLeftCell>
          <TableRightCell>{enrollInfo?.organization}</TableRightCell>
          <TableLeftCell align="center">신청희망날짜</TableLeftCell>
          <TableRightCell>{enrollInfo?.expectedToStartDtime}</TableRightCell>
        </TableRow>
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
          <TableLeftCell align="center">만료기간</TableLeftCell>
          <TableRightCell>{enrollInfo?.expiredDtime}</TableRightCell>
          <TableLeftCell align="center">등록일</TableLeftCell>
          <TableRightCell>{enrollInfo?.createdDtime}</TableRightCell>
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
            {
              TargetSubTypeReg.filter(
                f => f.type === enrollInfo.eduTargetSub
              )[0].ko
            }
          </TableRightCell>
        </TableRow>
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

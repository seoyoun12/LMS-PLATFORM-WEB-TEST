import { CourseType } from '@common/api/adm/courseClass';
import {
  CompleteType,
  StatusType,
  useLearningInfoCourses,
  useLearningInfoStep,
} from '@common/api/adm/learningInfo';
import ApiClient from '@common/api/ApiClient';
import styled from '@emotion/styled';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface FormType {
  page: number;
  notFound: boolean;
  nameOrUsername: string; //이름 혹은 아이디
  courseType: CourseType; //운수종사자 저상 도민 타입
  completeType: CompleteType | null; //수료타입
  statusType: StatusType | null; //퇴교여부 타입
  courseSeq: number | null; //과정 시퀀스
  courseClassSeq: number | null; //과정 클래스 시퀀스
  businessName: string; //업체명
  businessType: string | null; //업종 PASSENGER , FREIGHT
  carRegitRegion: string | null; //차량등록지
  carNumber: string | null; //차량번호
  studyStartDate: string; //학습시작일
  studyEndDate: string; //학습종료일
  phone: string | null; //전화번호
  identityNumber: string | null; //주민번호 (-포함)
}

interface Props {
  register: UseFormRegister<FormType>;
  onChangeCompanyName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeIdentify: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function HeadRowsRight({
  register,
  onChangeCompanyName,
  onChangePhone,
  onChangeIdentify,
}: Props) {
  return (
    <HeadRowsRightWrap>
      <Box width="100%">
        <Typography>업체명</Typography>
        <TextField
          {...register('businessName')}
          onChange={onChangeCompanyName}
          placeholder="업체명"
          fullWidth
        />
      </Box>
      <Box width="100%">
        <Typography>핸드폰번호</Typography>
        <TextField {...register('phone')} placeholder='"-" 없이 입력' fullWidth />
      </Box>
      <Box width="100%">
        <Typography>주민번호</Typography>
        <TextField
          {...register('identityNumber')}
          placeholder='"-" 없이 입력'
          fullWidth
        />
      </Box>
    </HeadRowsRightWrap>
  );
}
const HeadRowsRightWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 33.3%;
`;

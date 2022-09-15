import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { StebHeader } from '../StebHeader';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { courseClassTrafficInfo } from '@common/recoil';
import { useSnackbar } from '@hooks/useSnackbar';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { locationList } from '@layouts/MeEdit/MeEdit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import { ko } from 'date-fns/locale';
import { CourseClassTraffic } from '@common/recoil/courseClassTraffic/atom';
import { enrollCourseUserProvincial } from '@common/api/courseUser';
import { CourseUserProvincialSaveRequestDto } from '@common/api/Api';

interface detailCounts {
  [prop: string]: { [prop: string]: number };
}

interface FormDatas {
  locate: string;
}

export function Steb2() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const ref = useRef<boolean>(false);
  const [trafficInfo, setTrafficInfo] = useRecoilState(courseClassTrafficInfo);

  const [detailCounts, setDetailCounts] = useState<detailCounts>({
    HIGH_SCHOOL: { grade1: 0, grade2: 0, grade3: 0 },
  });

  const { register, setValue, watch, reset } =
    useForm<CourseUserProvincialSaveRequestDto>({
      defaultValues: { studyStartDate: dateFormat(new Date(), 'yyyy-mm-dd') },
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { province, businessName, studyStartDate, candidateType, candidateDetailType } =
      watch();

    let isPeople = null;
    for (let [key, obj] of Object.entries(detailCounts)) {
      for (let [kkey, value] of Object.entries(obj)) {
        isPeople = isPeople || value;
      }
    }

    if (
      !province ||
      !businessName ||
      !studyStartDate ||
      !candidateType ||
      !candidateDetailType
    )
      return window.alert('모두 입력해 주세요!');
    if (!isPeople || isPeople <= 0) return window.alert('교육생 명수를 기입해주세요!');

    try {
      const obj = watch();
      Object.assign(obj, detailCounts[watch().candidateType]);
      await enrollCourseUserProvincial(obj);
      setTrafficInfo({ ...watch(), peopleCounts: { ...detailCounts } });
      router.push('steb3');
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  return (
    <Steb2Wrap>
      <StebHeader value={1} />
      <Container
        component="form"
        onSubmit={handleSubmit}
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '2rem',
          marginBottom: '4rem',
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="location">지역</InputLabel>
          <Select
            labelId="location"
            id="location"
            {...register('province', { required: true })}
            label="location"
          >
            {locationList.map(item => (
              <MenuItem key={item.en} value={item.en}>
                {item.ko}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField label="소속(학교 , 기관 , 단체)" {...register('businessName')} />
          <FormHelperText sx={{ color: 'red' }}></FormHelperText>
        </FormControl>
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          showPopperArrow={false}
          minDate={new Date()}
          customInput={<TextField fullWidth />}
          selected={new Date(watch().studyStartDate)}
          onSelect={() => {}}
          onChange={date =>
            setValue(
              'studyStartDate',
              date ? dateFormat(date, 'yyyy-mm-dd') : dateFormat(new Date(), 'yyyy-mm-dd')
            )
          }
        />
        <FormControl fullWidth>
          <Typography id="student">교육 대상자</Typography>
          <Select
            labelId="student"
            id="student"
            {...register('candidateType')}
            // label="student"
          >
            {studentList.map((item, index) => (
              <MenuItem key={item.enType} value={item.enType}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Typography id="student-category">교육생 세부구분</Typography>
          <Select
            labelId="student-category"
            id="student-category"
            {...register('candidateDetailType')}
          >
            {studentList
              .filter(studentList => watch().candidateType === studentList.enType)[0]
              ?.category.map(({ type, enType, ageList }) => (
                <MenuItem key={enType} value={enType}>
                  {type}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TableContainer
          component={Paper}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <TableBody sx={{ width: '80%' }}>
            {studentList
              .filter(item => watch().candidateType === item.enType)[0]
              ?.category.filter(item => watch().candidateDetailType === item.enType)[0]
              ?.ageList.map(item => (
                <CustomInput
                  ageInfo={item}
                  candidateDetailType={watch().candidateDetailType}
                  setDetailCounts={setDetailCounts}
                  detailCounts={detailCounts}
                />
              ))}
          </TableBody>
        </TableContainer>
        <Button variant="contained" type="submit" fullWidth>
          교육 신청하기
        </Button>
      </Container>
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Box)`
  .react-datepicker__month-container {
  }
`;

function CustomInput({
  ageInfo,
  setDetailCounts,
  detailCounts,
  candidateDetailType,
}: {
  ageInfo: { age: string; enAge: string };
  detailCounts: detailCounts;
  setDetailCounts: React.Dispatch<React.SetStateAction<detailCounts>>;
  candidateDetailType: string;
}) {
  const keyName: string = ageInfo.enAge;

  return (
    <TableRow>
      <TableCell sx={{ width: '50%' }}>{ageInfo.age}</TableCell>
      <TableCell>
        <TextField
          name={ageInfo.enAge}
          placeholder="0~000명"
          value={detailCounts[candidateDetailType]?.[keyName]}
          onChange={e => {
            if (e.target.value.length > 10) return;
            if (/^[0-9]+$/.test(e.target.value))
              setDetailCounts(prev => {
                return {
                  [candidateDetailType]: {
                    ...prev[candidateDetailType],
                    [e.target.name]: Number(e.target.value),
                  },
                };
              });
          }}
          fullWidth
        />
      </TableCell>
    </TableRow>
  );
}

export const studentList = [
  {
    type: '어린이',
    enType: 'TYPE_CHILDREN',
    category: [
      {
        type: '유치원',
        enType: 'TYPE_KINDERGARTEN',
        ageList: [
          // { age: '만3세', enAge: 'thirdYearOldChild' },
          // { age: '만4세', enAge: 'fourthYearOldChild' },
          // { age: '만5세', enAge: 'fifthYearOldChild' },
          { age: '만3세', enAge: 'age3' },
          { age: '만4세', enAge: 'age4' },
          { age: '만5세', enAge: 'age5' },
        ],
      },
    ],
  },
  {
    type: '청소년',
    enType: 'TYPE_TEENAGER',
    category: [
      {
        type: '초등학교',
        enType: 'TYPE_ELEMENTARY',
        ageList: [
          // { age: '1학년', enAge: 'firstGrade' },
          // { age: '2학년', enAge: 'secondGrade' },
          // { age: '3학년', enAge: 'thirdGrade' },
          // { age: '4학년', enAge: 'fourthGrade' },
          // { age: '5학년', enAge: 'fifthGrade' },
          // { age: '6학년', enAge: 'sixthGrade' },
          { age: '1학년', enAge: 'grade1' },
          { age: '2학년', enAge: 'grade2' },
          { age: '3학년', enAge: 'grade3' },
          { age: '4학년', enAge: 'grade4' },
          { age: '5학년', enAge: 'grade5' },
          { age: '6학년', enAge: 'grade6' },
        ],
      },
      {
        type: '중학교',
        enType: 'TYPE_MIDDLE',
        ageList: [
          // { age: '1학년', enAge: 'firstGrade' },
          // { age: '2학년', enAge: 'secondGrade' },
          // { age: '3학년', enAge: 'thirdGrade' },
          { age: '1학년', enAge: 'grade1' },
          { age: '2학년', enAge: 'grade2' },
          { age: '3학년', enAge: 'grade3' },
        ],
      },
      {
        type: '고등학교',
        enType: 'TYPE_HIGH',
        ageList: [
          // { age: '1학년', enAge: 'firstGrade' },
          // { age: '2학년', enAge: 'secondGrade' },
          // { age: '3학년', enAge: 'thirdGrade' },
          { age: '1학년', enAge: 'grade1' },
          { age: '2학년', enAge: 'grade2' },
          { age: '3학년', enAge: 'grade3' },
        ],
      },
    ],
  },
  {
    type: '자가운전자',
    enType: 'TYPE_SELF_DRIVER',
    category: [
      {
        type: '자가운전자',
        enType: 'TYPE_SELF_DRIVER',
        ageList: [{ age: '자가운전자', enAge: 'selfDriver' }],
      },
    ],
  },
  {
    type: '노인',
    enType: 'TYPE_ELDERLY',
    category: [
      {
        type: '노인',
        enType: 'TYPE_ELDERLY',
        ageList: [{ age: '노인', enAge: 'elderly' }],
      },
    ],
  },
];

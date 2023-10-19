import { Box,Button,Container,FormControl,FormHelperText,InputLabel,MenuItem,Paper,Select,SelectChangeEvent,styled,TableBody,TableCell,TableContainer,TableRow,TextField,Typography } from '@mui/material';
import { StebHeader } from '../StebHeader';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { courseClassTrafficInfo } from '@common/recoil';
import { useSnackbar } from '@hooks/useSnackbar';
import { locationList } from '@layouts/MeEdit/MeEdit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import { ko } from 'date-fns/locale';
import { enrollProvincial } from '@common/api/provincialEnroll';
import { ProvincialEnrollSaveRequestDto } from '@common/api/Api';
import { Spinner } from '@components/ui';
import { EduTargetMainType } from '@common/api/learningMaterial';
import { addMonths } from 'date-fns';

// 도민과정 교육신청 steb2

interface detailCounts {
  [prop: string]: { [prop: string]: number };
}

export function Steb2() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const setTrafficInfo = useSetRecoilState(courseClassTrafficInfo);
  const [loading, setLoading] = useState(false);
  const [detailCounts, setDetailCounts] = useState<detailCounts>({ HIGH_SCHOOL: { grade1: 0, grade2: 0, grade3: 0 }});

  const { register, setValue, watch, } = useForm<ProvincialEnrollSaveRequestDto>({
    defaultValues: {
      expectedToStartDtime: dateFormat(new Date(), 'yyyy-mm-dd'),
      expectedToEndTime: dateFormat(new Date(), 'yyyy-mm-dd'),
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!watch().region) {
      snackbar({ variant: 'error', message: '지역을 선택해주세요.' });
      return;
    }
    if (!watch().organization) {
      snackbar({ variant: 'error', message: '소속을 입력해주세요.' });
      return;
    }
    if (!watch().expectedToStartDtime) {
      snackbar({ variant: 'error', message: '교육 시작일을 선택해주세요.' });
      return;
    }
    if (!watch().expectedToEndTime) {
      snackbar({ variant: 'error', message: '교육 종료일을 선택해주세요.' });
      return;
    }
    if (!watch().eduTargetSub) {
      snackbar({ variant: 'error', message: '교육 대상자를 선택해주세요.' });
      return;
    }
    try {
      const obj = watch();
      Object.assign(obj, detailCounts[watch().eduTargetSub]);
      setLoading(true);
      await enrollProvincial(obj);
      setTrafficInfo({ ...watch(), peopleCounts: { ...detailCounts } });
      router.push('steb3');
    } catch (e) {
      snackbar({ variant: 'error', message: e.data.message });
      setLoading(false);
    }
  };

  //  TODO: 세부타입 선택시 해당 세부타입에 맞는 과정 request
  const onChangeDetailEduTarget = async(e:SelectChangeEvent<unknown>) => {
    console.log(e.target.value) 
  }

  useEffect(() => {
    setValue('eduTargetMain', router.query.eduTargetMain as EduTargetMainType);
    // eslint-disable-next-line
  }, []);

  return (
    <Steb2Wrap>
      <StebHeader value={2} />
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
            {...register('region', { required: true })}
            label="지역"
          >
            {locationList.map(item => (
              <MenuItem key={item.en} value={item.en}>
                {item.ko}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField label="소속(학교, 기관, 단체)" {...register('organization')} />
          <FormHelperText sx={{ color: 'red' }}></FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <Typography>신청날짜</Typography>
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            showPopperArrow={false}
            minDate={new Date()}
            customInput={<TextField fullWidth />}
            selected={new Date(watch().expectedToStartDtime)}
            onChange={date =>
              setValue( 'expectedToStartDtime',
                date ? dateFormat(date, 'yyyy-mm-dd') : dateFormat(new Date(), 'yyyy-mm-dd')
              )
            }
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography>마감날짜</Typography>
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            showPopperArrow={false}
            minDate={new Date()}
            customInput={<TextField fullWidth />}
            selected={addMonths(new Date(watch().expectedToEndTime),1)}
            
            onChange={date =>
              setValue(
                'expectedToEndTime',
                date
                ? dateFormat(date, 'yyyy-mm-dd')
                : dateFormat(new Date(), 'yyyy-mm-dd')
              )
            }
          />
        </FormControl>
        <FormControl fullWidth>
          <Typography id="student">교육 대상자</Typography>
          <Select
            labelId="student"
            id="student"
            {...register('eduTargetMain')}
            value={router.query.eduTargetMain}
            disabled
            >
            {studentList.map((item) => (
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
            {...register('eduTargetSub')}
          >
            {studentList
              .filter(studentList => watch().eduTargetMain === studentList.enType)[0]
              ?.category.map(({ type, enType }) => (
                <MenuItem key={enType} value={enType}>
                  {type}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <TableBody sx={{ width: '80%' }}>
            {studentList
              .filter(item => watch().eduTargetMain === item.enType)[0]
              ?.category.filter(item => watch().eduTargetSub === item.enType)[0]
              ?.ageList.map(item => (
                <CustomInput
                  key={item.enAge}
                  ageInfo={item}
                  candidateDetailType={watch().eduTargetSub}
                  setDetailCounts={setDetailCounts}
                  detailCounts={detailCounts}
                />
              ))}
          </TableBody>
        </TableContainer>

        <FormControl fullWidth>
          <Typography id="lecture">과정 선택</Typography>
          <Select
            labelId="lecture"
            id="lecture"
            // TODO:// 실제 과정이 보여질 수 있게 수정 필요
            // {...register('lecture')}
          >
            {Array.from({length: 4}).map((_,index) => (
              <MenuItem key={index} value={index}>
                {index}번 올빼미 기상
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit" fullWidth disabled={loading}>
          {loading ? <Spinner fit={true} /> : '교육 신청하기'}
        </Button>
      </Container>
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Box)`
  .react-datepicker__month-container {
  }
`;

function CustomInput({ageInfo,setDetailCounts,detailCounts,candidateDetailType,}: {
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
          
          { age: '만3세', enAge: 'age3' },
          { age: '만4세', enAge: 'age4' },
          { age: '만5세', enAge: 'age5' },
        ],
      },
      {
        type: '초등학교',
        enType: 'TYPE_ELEMENTARY',
        ageList: [
          { age: '1학년', enAge: 'grade1' },
          { age: '2학년', enAge: 'grade2' },
          { age: '3학년', enAge: 'grade3' },
          { age: '4학년', enAge: 'grade4' },
          { age: '5학년', enAge: 'grade5' },
          { age: '6학년', enAge: 'grade6' },
        ],
      },
    ],
  },
  {
    type: '청소년',
    enType: 'TYPE_TEENAGER',
    category: [
      {
        type: '중학교',
        enType: 'TYPE_MIDDLE',
        ageList: [
          { age: '1학년', enAge: 'grade1' },
          { age: '2학년', enAge: 'grade2' },
          { age: '3학년', enAge: 'grade3' },
        ],
      },
      {
        type: '고등학교',
        enType: 'TYPE_HIGH',
        ageList: [
          { age: '1학년', enAge: 'grade1' },
          { age: '2학년', enAge: 'grade2' },
          { age: '3학년', enAge: 'grade3' },
        ],
      },
    ],
  },
  {
    type: '자가운전자',
    enType: 'TYPE_SELF_DRIVING',
    category: [
      {
        type: '자가운전자',
        enType: 'TYPE_SELF_DRIVER',
        ageList: [{ age: '자가운전자', enAge: 'selfDriver' }],
      },
    ],
  },
  {
    type: '어르신',
    enType: 'TYPE_ELDERLY',
    category: [
      {
        type: '어르신',
        enType: 'TYPE_ELDERLY',
        ageList: [{ age: '어르신', enAge: 'elderly' }],
      },
    ],
  },
];

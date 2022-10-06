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
import { UserCourseInfoDetailCourseInfoDto } from '@common/api/Api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { courseSubCategory } from '@layouts/Calendar/CalendarBody/CalendarBody';
import { ErrorMessage } from '@hookform/error-message';
import { Spinner } from '@components/ui';
import {
  businessSubType,
  businessSubTypeCategoryReg,
  businessSubTypeReg,
  locationList,
  residenceList,
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

export function CourseInformation({
  courseInfo,
  onHandleSubmit,
}: {
  courseInfo?: UserCourseInfoDetailCourseInfoDto;
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
  const { courseUserSeq } = router.query;
  // const [businessSubTypeState, setBusinessSubTypeState] = useState<string>(); // 업종구분
  // const [carRegistrationRegionState, setCarRegistrationRegionState] = useState<string>(); // 차량등록지
  // const [residenceState, setResidenceState] = useState<string>(); // 거주지

  const [disabledCarNumber, setDisabledCarNumber] = useState(false); // 차량번호 비활성화
  const [disabledBusinessName, setDisabledBusinessName] = useState(false); // 회사명 비활성화

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch, // useState를 사용하면 같은 동작을 두번. watch를 사용하자.
    setValue,
    // } = useForm<UserCourseInfoDetailCourseInfoDto>({ defaultValues });
  } = useForm<FormType>({ defaultValues });
  // } = useForm<UserCourseInfoDetailCourseInfoDto>();

  // useForm 안에있는 businessSubType는 useState로 변경된 값과는 전혀 별개의 값.
  // setValue.
  // console.log('courseInfo?.businessType : ', courseInfo?.businessType);
  // 차량번호 disabled 처리해주는 boolean

  // 업종구분 -
  // const handleBusinessSubType = async (e: any) => {
  //   setBusinessSubTypeState(e.target.value);
  //   setValue('businessSubType', e.target.value);
  // };
  // console.log('업종구분 businessSubType : ', businessSubType);

  // 차량등록지
  const handleCarRegistrationRegion = async (e: any) => {
    // setCarRegistrationRegionState(e.target.value);
    setValue('carRegistrationRegion', e.target.value);
  };

  // 거주지
  const handleResidence = async (e: any) => {
    // setResidenceState(e.target.value);
    setValue('residence', e.target.value);
  };

  // 차량번호 1
  const handleFirstStr = async (e: any) => {
    setValue('firstStr', e.target.value);
  };

  // 차량번호 2
  const handleSecondStr = async (e: any) => {
    setValue('secondStr', e.target.value);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // 업종구분
  const handleBusinessSubType = (e: SelectChangeEvent<unknown>) => {
    const {
      target: { value },
    } = e;

    if (businessSubType.BUS === value) {
      // 버스
      if (courseInfo.businessName === '개인택시') {
        setValue('businessName', '');
      } else {
        setValue('businessName', courseInfo.businessName);
      }
      setValue('firstStr', '');
      setValue('firstNum', '');
      setValue('secondStr', '');
      setValue('secondNum', '');
      setValue('businessSubType', value);
      setDisabledBusinessName(false);
      setDisabledCarNumber(true);
    }

    if (businessSubType.CHARTER_BUS === value) {
      // 전세버스
      if (courseInfo.businessName === '개인택시') {
        setValue('businessName', '');
      } else {
        setValue('businessName', courseInfo.businessName);
      }
      setValue('businessSubType', value);
      setDisabledBusinessName(false);
      setDisabledCarNumber(false);
    }

    if (businessSubType.SPECIAL_PASSENGER === value) {
      // 특수여객
      if (courseInfo.businessName === '개인택시') {
        setValue('businessName', '');
      } else {
        setValue('businessName', courseInfo.businessName);
      }
      setValue('firstStr', '');
      setValue('firstNum', '');
      setValue('secondStr', '');
      setValue('secondNum', '');
      setValue('businessSubType', value);
      setDisabledBusinessName(false);
      setDisabledCarNumber(true);
    }

    if (businessSubType.CORPORATE_TAXI === value) {
      // 법인택시
      if (courseInfo.businessName === '개인택시') {
        setValue('businessName', '');
      } else {
        setValue('businessName', courseInfo.businessName);
      }
      setValue('firstStr', '');
      setValue('firstNum', '');
      setValue('secondStr', '');
      setValue('secondNum', '');
      setValue('businessSubType', value);
      setDisabledBusinessName(false);
      setDisabledCarNumber(true);
    }

    if (businessSubType.PRIVATE_TAXI === value) {
      // 개인택시
      setValue('businessName', '개인택시');
      setValue('businessSubType', value);
      setDisabledBusinessName(true);
      setDisabledCarNumber(false);
    }

    if (businessSubType.GENERAL_CARGO === value) {
      // 일반화물
      if (
        courseInfo.businessName === '용달화물' ||
        courseInfo.businessName === '개별화물'
      ) {
        setValue('businessName', '');
      } else {
        setValue('businessName', courseInfo.businessName);
      }
      setValue('businessSubType', value);
      setDisabledBusinessName(false);
      setDisabledCarNumber(false);
    }

    if (businessSubType.CONSIGNMENT === value) {
      // 용달화물
      setValue('businessName', '용달화물');
      setValue('businessSubType', value);
      setDisabledBusinessName(true);
      setDisabledCarNumber(false);
    }

    if (businessSubType.INDIVIDUAL_CARGO === value) {
      // 개별화물
      setValue('businessName', '개별화물');
      setValue('businessSubType', value);
      setDisabledBusinessName(true);
      setDisabledCarNumber(false);
    }
  };

  // Select 박스 초깃값 설정.
  useEffect(() => {
    // 처음엔 undefined
    if (courseInfo) {
      // setBusinessSubTypeState(courseInfo?.businessSubType); // 업종구분
      // setCarRegistrationRegionState(courseInfo?.carRegistrationRegion); // 차량등록지
      // setResidenceState(courseInfo?.residence); // 거주지
      setValue('businessSubType', courseInfo.businessSubType);
      setValue('carRegistrationRegion', courseInfo.carRegistrationRegion);
      setValue('residence', courseInfo.residence);
      reset({ ...courseInfo }); // ...? 초기화시켜주는데 안에있는 인자로 초기화? reset() -> 값이 X

      if (courseInfo.carNumber) {
        setValue('firstStr', courseInfo.carNumber.slice(0, 2));
        setValue('firstNum', courseInfo.carNumber.slice(2, 4));
        setValue('secondStr', courseInfo.carNumber.slice(4, 5));
        setValue('secondNum', courseInfo.carNumber.slice(5));
      }

      if (
        // businessName이었음.
        courseInfo.businessSubType === businessSubType.BUS ||
        courseInfo.businessSubType === businessSubType.SPECIAL_PASSENGER ||
        courseInfo.businessSubType === businessSubType.CORPORATE_TAXI
      ) {
        setValue('firstStr', '');
        setValue('firstNum', '');
        setValue('secondStr', '');
        setValue('secondNum', '');
        setValue('businessName', courseInfo.businessName);
        setDisabledBusinessName(false);
        setDisabledCarNumber(true);
      }

      if (courseInfo.businessSubType === businessSubType.PRIVATE_TAXI) {
        setValue('businessName', '개인택시');
        setDisabledBusinessName(true);
        setDisabledCarNumber(false);
      }

      if (courseInfo.businessSubType === businessSubType.CONSIGNMENT) {
        // 용달화물
        setValue('businessName', '용달화물');
        setDisabledBusinessName(true);
        setDisabledCarNumber(false);
      }

      if (courseInfo.businessSubType === businessSubType.INDIVIDUAL_CARGO) {
        // 개별화물
        setValue('businessName', '개별화물');
        setDisabledBusinessName(true);
        setDisabledCarNumber(false);
      }
    }
  }, [courseInfo]);

  // []에 courseInfo를 넣는거는 이 값을 바라보면서 undefined에서 바뀌었을때 여길 봐달라

  // 차량번호 설정.
  useEffect(() => {
    const { firstStr, firstNum, secondStr, secondNum } = watch(); // 차량번호
    const carNumber = firstStr + firstNum + secondStr + secondNum;
    setValue('carNumber', carNumber);
    // console.log('차량번호 carNumber : ', carNumber);
    // console.log('차량번호 watch().carNumber : ', watch().carNumber);
  }, [watch().firstNum, watch().firstStr, watch().secondNum, watch().secondStr]);

  // 차량번호 disabled
  // useEffect(() => {
  //   if (
  //     courseInfo?.businessSubType === 'BUS' ||
  //     courseInfo?.businessSubType === 'SPECIAL_PASSENGER' ||
  //     courseInfo?.businessSubType === 'CORPORATE_TAXI'
  //   ) {
  //     setDisabledCarNumber(true);
  //   }
  // }, [courseInfo]);

  const onSubmit: SubmitHandler<FormType> = async (
    courseLearningInfoInput: CourseLearningInfoInput
  ) => {
    if (!carNumberRegex.test(watch().carNumber) && !disabledCarNumber) {
      // 정규표현식 적용
      return snackbar({ variant: 'error', message: '차량번호를 정확히 기입해주십시오.' });
    }
    if (watch().carNumber.length < 9) {
      setValue('carNumber', ''); // 차후 null처리 요망
    }

    // console.log('courseLearningInfoInput : ', courseLearningInfoInput);
    // console.log('watch().carNumber : ', watch().carNumber);

    onHandleSubmit({
      courseLearningInfoInput: {
        ...courseLearningInfoInput,
        carNumber: watch().carNumber,
      },
      courseUserSeq: Number(courseUserSeq),
      setLoading,
    });
    // console.log('courseLearningInfoInput : ', courseLearningInfoInput);
  };

  console.log('watch : ', watch());

  //
  //////////////////////////////////////////////////////////////////////////////////////////

  return (
    <CourseInfomationBox component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* <CourseInfomationBox component="form" onSubmit={onSubmit}> useForm을 사용하지 않을때.*/}
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        수강정보
      </TableHeadFull>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell align="center">과정명</TableLeftCell>
          <TableRightCell>{courseInfo?.courseName}</TableRightCell>
          <TableLeftCell align="center">년도 / 차수</TableLeftCell>
          <TableRightCell>{courseInfo?.yearAndStep}</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">회원명</TableLeftCell>
          <TableRightCell>{courseInfo?.name}</TableRightCell>
          <TableLeftCell align="center">회원아이디</TableLeftCell>
          <TableRightCell>
            {courseInfo?.username ? courseInfo?.username : '-'}
          </TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">학습기간</TableLeftCell>
          <TableRightCell>{courseInfo?.studyDate}</TableRightCell>
          <TableLeftCell align="center">등록일</TableLeftCell>
          <TableRightCell>{courseInfo?.regDate}</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">상태</TableLeftCell>
          <TableRightCell>{courseInfo?.classLearningStatus}</TableRightCell>
          <TableLeftCell align="center">수료여부</TableLeftCell>
          <TableRightCell>
            {courseInfo?.completeYn === 'Y' ? '수료' : '미수료'}
          </TableRightCell>
        </TableRow>
      </TableBody>

      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%', mt: '10px' }}>
        업체정보
      </TableHeadFull>

      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell align="center">업종구분</TableLeftCell>
          <TableRightCell>
            <FormControl fullWidth>
              <Select
                labelId="businessSubType"
                id="businessSubType"
                placeholder="업종 유형선택"
                // value={businessSubTypeState || ''}
                value={watch().businessSubType || ''}
                onChange={handleBusinessSubType}
              >
                {businessSubTypeCategoryReg
                  .filter(item => item.category === courseInfo?.businessType)
                  .map(item => (
                    <MenuItem key={item.enType} value={item.enType}>
                      {item.type}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </TableRightCell>

          <TableLeftCell align="center">회사명</TableLeftCell>
          <TableRightCell>
            <FormControl fullWidth>
              <TextField
                {...register('businessName', { required: '회사명을 입력해주세요.' })}
                value={watch().businessName || ''}
                label="회사명"
                variant="outlined"
                disabled={disabledBusinessName}
              />
              <ErrorMessage
                errors={errors}
                name="businessName"
                as={<FormHelperText error />}
              />
            </FormControl>
          </TableRightCell>
        </TableRow>
        {/* ============================================================================================= */}
        <TableRow>
          <TableLeftCell align="center">차량번호</TableLeftCell>
          <TableRightCell>
            <Box display="flex" width="100%" gap={1}>
              {/* 차량번호 첫번째 */}
              <FormControl fullWidth>
                <Select
                  labelId="firstStr"
                  id="firstStr"
                  placeholder="지역명"
                  value={watch().firstStr || ''}
                  onChange={handleFirstStr}
                  disabled={disabledCarNumber}
                >
                  {localList.map(item => (
                    <MenuItem key={item.title} value={item.title}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* 차량번호 두번째 */}
              <TextField
                // {...register('firstNum', { required: '앞 두자리 번호를 입력해주세요.' })}
                {...register('firstNum')}
                onChange={e => {
                  if (e.target.value.length > 2) return;
                  setValue('firstNum', e.target.value.replace(/[^0-9]/g, ''));
                }}
                value={watch().firstNum || ''}
                label="차종번호 2자리"
                variant="outlined"
                fullWidth
                disabled={disabledCarNumber}
              />
              {/* 차량번호 세번째 */}
              <FormControl fullWidth>
                <Select
                  labelId="secondStr"
                  id="secondStr"
                  placeholder="용도기호 한글자"
                  value={watch().secondStr || ''}
                  onChange={handleSecondStr}
                  disabled={disabledCarNumber}
                >
                  {oneWordList.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* 차량번호 네번째 */}
              <TextField
                // {...register('secondNum', { required: '뒤 네자리 번호를 입력해주세요.' })}
                {...register('secondNum')}
                onChange={e => {
                  if (e.target.value.length > 4) return;
                  setValue('secondNum', e.target.value.replace(/[^0-9]/g, ''));
                }}
                value={watch().secondNum || ''}
                label="차량번호 4자리"
                variant="outlined"
                fullWidth
                disabled={disabledCarNumber}
              />
            </Box>
          </TableRightCell>

          <TableLeftCell align="center">차량등록지</TableLeftCell>

          <TableRightCell>
            <FormControl fullWidth>
              <Select
                labelId="carRegistrationRegion"
                id="carRegistrationRegion"
                placeholder="차량등록지 선택"
                // value={carRegistrationRegionState || ''}
                value={watch().carRegistrationRegion || ''}
                onChange={handleCarRegistrationRegion}
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
      </TableBody>

      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%', mt: '3px' }}>
        교육신청자 정보
      </TableHeadFull>

      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell align="center">거주지</TableLeftCell>
          <TableRightCell>
            <FormControl fullWidth>
              <Select
                labelId="residence"
                id="residence"
                placeholder="거주지 선택"
                // value={residenceState || ''}
                value={watch().residence || ''}
                onChange={handleResidence}
              >
                {residenceList.map(item => (
                  <MenuItem key={item.en} value={item.en}>
                    {item.ko}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TableRightCell>

          <TableLeftCell align="center">휴대전화</TableLeftCell>
          <TableRightCell>
            <FormControl fullWidth sx={{ height: '100%' }}>
              <TextField
                {...register('phone', {
                  // pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                  required: '핸드폰번호 입력해주세요.',
                })}
                onChange={e => {
                  if (e.target.value.length > 11) return;
                  setValue('phone', e.target.value.replace(/[^0-9]/g, ''));
                  // setValue('phone', e.target.value.replace(/^\d{3}-\d{3,4}-\d{4}$/, ''));
                }}
                label="핸드폰번호"
                variant="outlined"
                // type="number"
                value={watch().phone || ''}
              />
              <ErrorMessage errors={errors} name="phone" as={<FormHelperText error />} />
            </FormControl>
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

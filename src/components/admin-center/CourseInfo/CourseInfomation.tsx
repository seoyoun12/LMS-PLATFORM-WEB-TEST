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
  businessSubTypeCategoryReg,
  businessSubTypeReg,
  locationList,
  residenceList,
} from 'src/staticDataDescElements/staticType';

interface FormType extends UserCourseInfoDetailCourseInfoDto {
  firstStr: string;
  firstNum: string;
  secondStr: string;
  secondNum: string;
}

const localList = [
  { title: '충남', type: 'NAM' },
  { title: '세종', type: 'SEJONG' },
];
const oneWordList = ['아', '바', '사', '자', '배'];

const defaultValues = {
  firstStr: '',
  firstNum: '',
  secondStr: '',
  secondNum: '',
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
  const [businessSubType, setBusinessSubType] = useState<string>(); // 업종구분
  const [carRegistrationRegion, setCarRegistrationRegion] = useState<string>(); // 차량등록지
  const [residence, setResidence] = useState<string>(); // 거주지

  const [disabledCarNumber, setDisabledCarNumber] = useState(false);

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

  // 업종구분
  const handleBusinessSubType = async (e: any) => {
    setBusinessSubType(e.target.value);
    setValue('businessSubType', e.target.value);
  };
  // console.log('업종구분 businessSubType : ', businessSubType);

  // 차량등록지
  const handleCarRegistrationRegion = async (e: any) => {
    setCarRegistrationRegion(e.target.value);
    setValue('carRegistrationRegion', e.target.value);
  };

  // 거주지
  const handleResidence = async (e: any) => {
    setResidence(e.target.value);
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
  // const onChangeBusinessSubType = (e: SelectChangeEvent<unknown>) => {
  //   const {
  //     target: { value },
  //   } = e;

  //   // 회사명 활성화 + 차량번호 비활성화
  //   if (
  //     courseSubCategoryType.CHARTER_BUS === value ||
  //     courseSubCategoryType.SPECIAL_PASSENGER === value ||
  //     courseSubCategoryType.CORPORATE_TAXI === value
  //   ) {
  //     setDisabledCompany(false);
  //   }

  //   if (businessSubTypeReg.type === value) {
  //     setValue('businessName', '');
  //     setValue('businessSubType', value as courseSubCategoryType);
  //     setDisabledCompany(false);
  //     return setHideCarNumber(false);
  //   }

  //   if (businessSubTypeReg.SPECIAL_PASSENGER === value) {
  //     setValue('businessName', '');
  //     setValue('businessSubType', value as courseSubCategoryType);
  //     setDisabledCompany(false);
  //     return setHideCarNumber(true);
  //   }

  //   if (businessSubTypeReg.PRIVATE_TAXI === value) {
  //     setValue(
  //       'businessName',
  //       userBusinessTypeTwo.filter(item => item.enType === value)[0].type
  //     );
  //     setValue('businessSubType', value as courseSubCategoryType);
  //     setDisabledCompany(true);
  //     return setHideCarNumber(false);
  //   }

  //   //차량번호 비활성화
  //   if (
  //     businessSubTypeReg.BUS === value ||
  //     businessSubTypeReg.CHARTER_BUS === value ||
  //     businessSubTypeReg.CORPORATE_TAXI === value
  //   ) {
  //     setValue('carNumber', null);
  //     setValue('businessName', '');
  //     setValue('businessSubType', value as courseSubCategoryType);
  //     setDisabledCompany(false);
  //     return setHideCarNumber(true);
  //   }

  //   //회사명 고정
  //   if (
  //     courseSubCategoryType.PRIVATE_TAXI === value ||
  //     courseSubCategoryType.CONSIGNMENT === value ||
  //     courseSubCategoryType.INDIVIDUAL_CARGO === value
  //   ) {
  //     setDisabledCompany(true);
  //     setValue(
  //       'businessName',
  //       userBusinessTypeTwo.filter(item => item.enType === value)[0].type
  //     );
  //     if (courseSubCategoryType.PRIVATE_TAXI === value) setDisabledCompany(false); //개인택시 보이게
  //     return setValue('businessSubType', value);
  //   }
  //   setDisabledCompany(false);
  //   setHideCarNumber(false);
  //   setValue('businessName', '');
  //   setValue('businessSubType', value as courseSubCategoryType);
  // };
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  // Select 박스 초깃값 설정.
  useEffect(() => {
    // 처음엔 undefined
    if (courseInfo) {
      setBusinessSubType(courseInfo?.businessSubType); // 업종구분
      setCarRegistrationRegion(courseInfo?.carRegistrationRegion); // 차량등록지
      setResidence(courseInfo?.residence); // 거주지
      reset({ ...courseInfo }); // ...? 초기화시켜주는데 안에있는 인자로 초기화? reset() -> 값이 X
      if (courseInfo.carNumber) {
        setValue('firstStr', courseInfo.carNumber.slice(0, 2));
        setValue('firstNum', courseInfo.carNumber.slice(2, 4));
        setValue('secondStr', courseInfo.carNumber.slice(4, 5));
        setValue('secondNum', courseInfo.carNumber.slice(5));
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
  useEffect(() => {
    if (
      courseInfo?.businessSubType === 'BUS' ||
      courseInfo?.businessSubType === 'SPECIAL_PASSENGER' ||
      courseInfo?.businessSubType === 'CORPORATE_TAXI'
    ) {
      setDisabledCarNumber(true);
    }
  }, [businessSubType]);

  const onSubmit: SubmitHandler<FormType> = async (
    courseLearningInfoInput: CourseLearningInfoInput
  ) => {
    onHandleSubmit({
      courseLearningInfoInput: courseLearningInfoInput,
      courseUserSeq: Number(courseUserSeq),
      setLoading,
    });
    // console.log('courseLearningInfoInput : ', courseLearningInfoInput);
  };

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
          <TableLeftCell>과정명</TableLeftCell>
          <TableRightCell>{courseInfo?.courseName}</TableRightCell>
          <TableLeftCell>년도 / 차수</TableLeftCell>
          <TableRightCell>{courseInfo?.yearAndStep}</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell>회원명</TableLeftCell>
          <TableRightCell>{courseInfo?.name}</TableRightCell>
          <TableLeftCell>회원아이디</TableLeftCell>
          <TableRightCell>
            {courseInfo?.username ? courseInfo?.username : '-'}
          </TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell>학습기간</TableLeftCell>
          <TableRightCell>{courseInfo?.studyDate}</TableRightCell>
          <TableLeftCell>등록일</TableLeftCell>
          <TableRightCell>{courseInfo?.regDate}</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell>상태</TableLeftCell>
          <TableRightCell>{courseInfo?.classLearningStatus}</TableRightCell>
          <TableLeftCell>수료여부</TableLeftCell>
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
                value={businessSubType || ''}
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
                label="회사명"
                variant="outlined"
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
                  value={watch().firstStr}
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
                value={watch().firstNum}
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
                  value={watch().secondStr}
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
                value={watch().secondNum}
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
                value={carRegistrationRegion || ''}
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
                value={residence || ''}
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
                {...register('phone', { required: '핸드폰번호 입력해주세요.' })}
                label="핸드폰번호"
                variant="outlined"
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

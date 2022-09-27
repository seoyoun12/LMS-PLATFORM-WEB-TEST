import { CourseLearningInfoInput, detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
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
import { userBusinessTypeTwo } from '@layouts/MeEdit/TransWorker/TransWorker';
import {
  courseSubCategoryType,
  UserTransSaveInputDataType,
} from '@common/api/courseClass';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { courseSubCategory } from '@layouts/Calendar/CalendarBody/CalendarBody';
import { copyFileSync } from 'fs';
import { ErrorMessage } from '@hookform/error-message';
import { Spinner } from '@components/ui';
import { locationList, residenceList } from '@layouts/MeEdit/MeEdit';
import { CarNumberBox } from '@components/ui/Step';

// interface Props {
//   courseInfo: UserCourseInfoDetailCourseInfoDto;
//   onHandleSubmit: {
//     courseLearningInfoInput: CourseLearningInfoInput;
//   };
// }
const defaultValues = {
  // contentType: ContentType.CONTENT_MP4,
  // businessSubType: courseSubCategory.filter(filter => filter.type === businessSubType),
};

// export function CourseInformation({ courseInfo, onHandleSubmit }: Props) {
export function CourseInformation({
  courseInfo,
  onHandleSubmit,
}: {
  courseInfo?: UserCourseInfoDetailCourseInfoDto;
  onHandleSubmit: ({
    courseLearningInfoInput,
    courseUserSeq,
    setLoading,
  }: // businessSubType,
  // carRegistrationRegion,
  // residence,
  {
    courseLearningInfoInput: CourseLearningInfoInput;
    courseUserSeq: number;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    // businessSubType: string;
    // carRegistrationRegion: string;
    // residence: string;
  }) => void;
}) {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query;
  const [businessSubType, setBusinessSubType] = useState<string>(); // 업종구분
  const [carRegistrationRegion, setCarRegistrationRegion] = useState<string>(); // 차량등록지
  const [residence, setResidence] = useState<string>(); // 거주지
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch, // useState를 사용하면 같은 동작을 두번.
    setValue,
    resetField,
    // } = useForm<UserCourseInfoDetailCourseInfoDto>({ defaultValues });
  } = useForm<UserCourseInfoDetailCourseInfoDto>();
  // useForm 안에있는 businessSubType는 useState로 변경된 값과는 전혀 별개의 값.
  // setValue.

  // 업종구분
  const handleBusinessSubType = async (e: any) => {
    setBusinessSubType(e.target.value);
    setValue('businessSubType', e.target.value);
    // console.log('업종구분 : ', setBusinessSubType(e.target.value));
    // console.log('업종구분 value : ', e.target.value);
    // console.log('businessSubType : ', businessSubType);
  };
  // console.log('업종구분 businessSubType : ', businessSubType);

  // 차량등록지
  const handleCarRegistrationRegion = async (e: any) => {
    setCarRegistrationRegion(e.target.value);
    setValue('carRegistrationRegion', e.target.value);
    // console.log('차량등록지 : ', setCarRegistrationRegion(e.target.value));
    // console.log('차량등록지 value : ', e.target.value);
    // console.log('carRegistrationRegion : ', carRegistrationRegion);
  };
  // console.log('차량등록지 carRegistrationRegion : ', carRegistrationRegion);

  // 거주지
  // const handleResidence = (e: any) => {
  const handleResidence = async (e: any) => {
    setResidence(e.target.value);
    setValue('residence', e.target.value);
    // console.log('거주지 : ', setResidence(e.target.value));
    // console.log('거주지 value : ', e.target.value);
    // console.log('residence : ', residence);
  };
  // console.log('거주지 residence : ', residence);

  // Select 박스 초깃값 설정.
  useEffect(() => {
    // 처음엔 undefined
    if (courseInfo?.businessSubType) {
      setBusinessSubType(courseInfo?.businessSubType); // 업종구분
      // setBusinessName(courseInfo?.businessName); // 회사명
      setCarRegistrationRegion(courseInfo?.carRegistrationRegion); // 차량등록지
      setResidence(courseInfo?.residence); // 거주지
      reset({ ...courseInfo }); // ...? 초기화시켜주는데 안에있는 인자로 초기화? reset() -> 값이 X
    }
  }, [courseInfo?.businessSubType]);
  // []에 courseInfo를 넣는거는 이 값을 바라보면서 undefined에서 바뀌었을때 여길 봐달라

  const onSubmit: SubmitHandler<CourseLearningInfoInput> = async (
    courseLearningInfoInput: CourseLearningInfoInput
  ) => {
    console.log('2. courseLearningInfoInput : ', courseLearningInfoInput);

    onHandleSubmit({
      courseLearningInfoInput: courseLearningInfoInput,
      courseUserSeq: Number(courseUserSeq),
      setLoading,
      // businessSubType,
      // carRegistrationRegion,
      // residence,
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
                // onChange={e => {
                //   setBusinessSubType(
                //     courseSubCategory.filter(item => item.type === e.target.value)[0].type
                //   );
                // }}
                // onChange={e => {
                //   handleBusinessSubType(
                //     courseSubCategory.filter(
                //       filter => filter.type === courseInfo?.businessSubType
                //     )
                //   );
                // }}
                // value={courseSubCategory.filter(
                //   filter => filter.type === courseInfo?.businessSubType
                // )}
                // {...register('businessSubType')}
              >
                {courseSubCategory
                  // .filter(filter => filter.type === courseInfo?.businessSubType)
                  .map(item => (
                    // <MenuItem key={item.type} value={item.type} sx={{ fontSize: '14px' }}>
                    <MenuItem key={item.type} value={item.type}>
                      {item.ko}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* {courseInfo?.businessSubType} */}
          </TableRightCell>

          <TableLeftCell align="center">회사명</TableLeftCell>
          {/* <TableRightCell>{courseInfo?.businessName}</TableRightCell> */}
          <TableRightCell>
            {/* <FormControl className={textField}> */}
            <FormControl fullWidth>
              <TextField
                {...register('businessName', { required: '회사명을 입력해주세요.' })}
                size="small"
                label="회사명"
                variant="outlined"
                // onChange={handleBusinessName}
              />
              <ErrorMessage
                errors={errors}
                name="businessName"
                as={<FormHelperText error />}
              />
            </FormControl>
          </TableRightCell>
        </TableRow>

        <TableRow>
          <TableLeftCell align="center">차량번호</TableLeftCell>
          {/* <TableRightCell>{courseInfo?.carNumber}</TableRightCell> */}
          <TableRightCell>
            <FormControl fullWidth sx={{ height: '100%' }}>
              {/* <TextField
                {...register('carNumber', { required: '차량번호를 입력해주세요.' })}
                size="small"
                label="차량번호"
                variant="outlined"
                // value={courseInfo?.carNumber}
              />
              <ErrorMessage
                errors={errors}
                name="carNumber"
                as={<FormHelperText error />}
              /> */}
              {/* <CarNumberBox parantSetValue={setValue} /> */}
            </FormControl>
          </TableRightCell>

          <TableLeftCell align="center">차량등록지</TableLeftCell>
          {/* <TableRightCell>{courseInfo?.carRegistrationRegion}</TableRightCell> */}

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

          {/* <TableRightCell>{courseInfo?.residence}</TableRightCell> */}
          <TableLeftCell align="center">휴대전화</TableLeftCell>
          <TableRightCell>
            <FormControl fullWidth sx={{ height: '100%' }}>
              <TextField
                {...register('phone', { required: '핸드폰번호 입력해주세요.' })}
                size="small"
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
  &:first-child {
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

const textField = css`
  margin-bottom: 20px;
`;

const ButtonBox = styled(Box)`
  margin: 10px 0 10px 0;
  text-align: center;
`;

const SubmitBtn = styled(Button)`
  width: 8%;
`;

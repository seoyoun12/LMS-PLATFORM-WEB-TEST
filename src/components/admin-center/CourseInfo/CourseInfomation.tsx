import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Tab,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { courseSubCategory } from '@layouts/Calendar/CalendarBody/CalendarBody';
import { copyFileSync } from 'fs';

interface Props {
  courseInfo: UserCourseInfoDetailCourseInfoDto;
}
const defaultValues = {
  // contentType: ContentType.CONTENT_MP4,
  // businessSubType: courseSubCategory.filter(filter => filter.type === businessSubType),
};

export function CourseInformation({ courseInfo }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
    resetField,
  } = useForm<UserCourseInfoDetailCourseInfoDto>({ defaultValues });

  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query;

  const [businessSubType, setBusinessSubType] = useState<string>();

  const handleBusinessSubType = (e: any) => {
    setBusinessSubType(e.target.value);
  };
  // Select 박스 초깃값 설정.
  useEffect(() => {
    // 처음엔 undefined
    if (courseInfo?.businessSubType) {
      setBusinessSubType(courseInfo?.businessSubType);
    }
  }, [courseInfo?.businessSubType]); // []에 courseInfo를 넣는거는 이 값을 바라보면서 undefined에서 바뀌었을때 여길 봐달라

  return (
    <CourseInfomationBox>
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
                // value={courseSubCategory.filter(
                //   filter => filter.type === courseInfo?.businessSubType
                // )}
                // {...register('businessSubType')}
              >
                {courseSubCategory
                  // .filter(filter => filter.type === courseInfo?.businessSubType)
                  .map(item => (
                    <MenuItem key={item.type} value={item.type} sx={{ fontSize: '14px' }}>
                      {item.ko}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* {courseInfo?.businessSubType} */}
          </TableRightCell>
          <TableLeftCell align="center">회사명</TableLeftCell>
          <TableRightCell>{courseInfo?.businessName}</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">차량번호</TableLeftCell>
          <TableRightCell>{courseInfo?.carNumber}</TableRightCell>
          <TableLeftCell align="center">차량등록지</TableLeftCell>
          <TableRightCell>{courseInfo?.carRegistrationRegion}</TableRightCell>
        </TableRow>
      </TableBody>

      <TableHeadFull
        colSpan={4}
        sx={{ display: 'table', width: '100%', marginTop: '10px' }}
      >
        교육신청자 정보
      </TableHeadFull>

      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableLeftCell align="center">거주지</TableLeftCell>
          <TableRightCell>{courseInfo?.residence}</TableRightCell>
          <TableLeftCell align="center">휴대전화</TableLeftCell>
          <TableRightCell>{courseInfo?.phone}</TableRightCell>
        </TableRow>
      </TableBody>
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

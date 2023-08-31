import { TableBody,TableHead,Typography,Button,Box,Backdrop } from '@mui/material';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import { CompleteType,StatusType } from '@common/api/adm/learningInfo';
import { CourseType } from '@common/api/adm/courseClass';
import { NotFound } from '@components/ui/NotFound';
import { convertBirth } from '@utils/convertBirth';
import { useForm } from 'react-hook-form';
import { useCourseInfoTraffic } from '@common/api/adm/courseInfoTraffic';
import { CourseTrafficTargetType,locationList,TargetSubTypeReg } from 'src/staticDataDescElements/staticType';
import { getExcelCourseTrafficLearning } from '@common/api/adm/excel';
import { useSnackbar } from '@hooks/useSnackbar';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: '이름', align: 'center', width: '6%' },
  { name: '아이디', align: 'center', width: '6%' },
  { name: '생년월일', align: 'center', width: '8%' },
  // { name: '휴대폰번호', align: 'center', width: '8%' },
  { name: '교육대상자', align: 'center', width: '10%' },
  { name: '교육대상자세부', align: 'center', width: '13%' },
  { name: '지역', align: 'center', width: '6%' },
  { name: '소속', align: 'center', width: '14%' },
  { name: '교육시작희망일자', align: 'center', width: '13%' },
  { name: '만료기한', align: 'center', width: '6%' },
  { name: '상태', align: 'center', width: '5%' },
];

interface FormType {
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

const defaultValues: FormType = {
  page: 0,
  notFound: false,
  courseType: CourseType.TYPE_TRANS_WORKER,
  nameOrUsername: '',
  completeType: null,
  statusType: null,
  courseSeq: null,
  courseClassSeq: null,
  businessName: '',
  businessType: null,
  carRegitRegion: null,
  carNumber: null,
  studyStartDate: '',
  studyEndDate: '',
  phone: null,
  identityNumber: null,
};

export default function CourseInfoTrafficManagement() {
  
  
  const [submitValue, setSubmitValue] = useState<FormType>(defaultValues);
  const { watch } = useForm<FormType>({defaultValues});
  const [page, setPage] = useState<number>(0);
  const { data, error, mutate } = useCourseInfoTraffic(10, page);
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();
  const onClickExcelDownload = async () => {
    setLoading(true);
    try {
      const data = await getExcelCourseTrafficLearning(watch());
      const blob = new Blob([data.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      setLoading(false);
      return saveAs(blob, format(new Date(), 'yyyy-MM-dd') + ' 학습현황.xlsx');
      
    } catch (e) {
      snackbar({ variant: 'error', message: '다운로드 실패' });
      setLoading(false);
    }
  };

  // Pagination
  const onChangePage = (page: number) => {
    setSubmitValue((prev) => {
      return { ...prev, page };
    });
    setPage(page);
  };


  // 수정페이지로
  const onClickmodifyCourseInfo = async (seq: number) => {
    window.open(
      `/admin-center/course-info-traffic/modify/${seq}`,
      // '',
      '_blank'
    );
  };


  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  
  return (
    <Box>
      <CourseInfoTypography variant='h5'>
        전체 수강생 학습현황(도민)
      </CourseInfoTypography>

      <Box display='flex' mb={2}>
        <Button
          variant='contained'
          color='success'
          sx={{ marginLeft: 'auto' }}
          
          onClick={onClickExcelDownload}
        >
          {loading ? (
            <Spinner fit={true} />
          ) : (
            <>
              <FileCopyIcon sx={{ marginRight: '4px' }} />
              회원목록 엑셀다운로드
            </>
          )}
        </Button>
      </Box>

      <Backdrop open={loading}>
        <Box
          display='flex'
          flexDirection='column'
          sx={{ background: 'white', borderRadius: '4px', padding: '12px' }}
        >
          <Spinner fit={true} />
          <Box color='rgb(194,51,51)' fontWeight='bold'>
            다운로드가 오래걸릴수 있습니다 페이지를 이탈하지 마세요.
          </Box>
        </Box>
      </Backdrop>
      {watch().notFound ? (
        <NotFound content='학습현황이 존재하지 않습니다!' />
      ) : (
        <Table
          pagination={true}
          totalNum={data?.totalElements}
          page={data?.number}
          onChangePage={onChangePage}
          size='small'
          sx={{ tableLayout: 'fixed' }}
        >
          <TableHead>
            <TableRow>
              {headRows.map(
                ({
                  name,
                  width,
                }: {
                  name: string;
                  align: string;
                  width: string;
                }) => (
                  <CourseInfoTitleTableCell
                    key={name}
                    align='center'
                    width={width}
                  >
                    {name}
                  </CourseInfoTitleTableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.content.map((user) => (
              <TableRow
                sx={{ cursor: 'pointer' }}
                key={user.seq}
                hover
                onClick={() => onClickmodifyCourseInfo(user.seq)}
              >
                <CourseInfoTableCell align='center'>
                  {user.seq}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {user.userInfo.name}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <NameBox title={user.userInfo.name}>
                    {user.userInfo.username}
                  </NameBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <SubjectBox>{convertBirth(user.userInfo.birth)}</SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <SubjectBox>
                    {
                      CourseTrafficTargetType.filter(
                        (f) => f.type === user.eduTargetMain
                      )[0].ko
                    }
                  </SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <SubjectBox>
                    {
                      TargetSubTypeReg.filter(
                        (f) => f.type === user.eduTargetSub
                      )[0].ko
                    }
                  </SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <SubjectBox>
                    {locationList.filter((f) => f.en === user.region)[0].ko}
                  </SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {user.organization}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {user.expectedToStartDtime}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {user.expiredDtime}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {user.status === 1 ? '정상' : '비활성'}
                </CourseInfoTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

const CourseInfoTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 학습현황 제목. ellipsis 적용.
const SubjectBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 학습현황 테이블의 title부분
const CourseInfoTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 학습현황 테이블의 본문
const CourseInfoTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;
  padding: 4px 4px;
  height: 10px;

  &:first-of-type {
    background: #f5f5f5;
  }
`;

// 회원 이름. ellipsis 적용.
const NameBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

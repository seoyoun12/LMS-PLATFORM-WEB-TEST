import {
  learningMaterialList,
  learningMaterialRemove,
} from '@common/api/learningMaterial';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Spinner, Table } from '@components/ui';
import dateFormat from 'dateformat';
import styled from '@emotion/styled';
import { ProductStatus } from '@common/api/course';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  // { name: 'No1', align: 'center', width: '2.5%' }, // seq
  { name: 'No', align: 'center', width: '5%' }, // seq
  { name: '학습자료유형', align: 'center', width: '12.5%' }, // materialType
  { name: '학습자료상세유형', align: 'center', width: '8.5%' }, // materialSubType
  { name: '제목', align: 'center', width: '32%' }, // title
  { name: '작성일', align: 'center', width: '10%' }, // createdDtime
  { name: '수정일', align: 'center', width: '10%' }, // modifiedDtime
  // { name: '파일', align: 'center', width: '10%' }, // modifiedDtime
  { name: '상태', align: 'center', width: '5%' }, // status
];

const typeTabsConfig = [
  { name: '전체', value: '' },
  { name: '연령별 교수학습 지도안', value: 'TYPE_BY_AGE' },
  { name: '교육자료', value: 'TYPE_EDUCATIONAL' },
  { name: '교육영상', value: 'TYPE_VIDEO' },
  { name: '타기관자료모음', value: 'TYPE_OTHER_ORGAN' },
];

const subTypeTabsConfig = [
  { name: '어린이', value: 'TYPE_CHILDREN' },
  { name: '청소년', value: 'TYPE_TEENAGER' },
  { name: '어르신', value: 'TYPE_ELDERLY' },
  { name: '자가운전자', value: 'TYPE_SELF_DRIVING' },
];

export function LearningMaterialManagement() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [page, setPage] = useState(0);
  const [seq, setSeq] = useState<number | null>(null);
  const [typeValue, setTypeValue] = useState('');
  const [subTypeValue, setSubTypeValue] = useState('');
  const [subType, setSubType] = useState<boolean>(true);

  const { data, error, mutate } = learningMaterialList({
    materialType: typeValue,
    materialSubType: subTypeValue,
    page,
  });

  // 수정
  const onClickModifyLM = async (seq: number) => {
    setSubType(false);
    router.push(`/admin-center/learning-material/modify/${seq}`);
    await mutate();
  };

  // // 삭제
  // const onClickRemoveLM = async (seq: number) => {
  //   try {
  //     const dialogConfirmed = await dialog({
  //       title: '학습자료 삭제하기',
  //       description: '정말로 삭제하시겠습니까?',
  //       confirmText: '삭제하기',
  //       cancelText: '취소',
  //     });
  //     if (dialogConfirmed) {
  //       await learningMaterialRemove(seq);
  //       snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
  //       await mutate();
  //     }
  //   } catch (e: any) {
  //     snackbar({ variant: 'error', message: e.data.message });
  //   }
  // };

  // console.log('학습자료 데이터 : ', data);
  // console.log('학습자료 데이터2 : ', data.content[0].s3Files);
  // const filedata = data.content[0].s3Files
  const fileData = data?.content.map(f => f.s3Files[0]?.name);
  // console.log('파일 데이터 : ', fileData);

  // Pagination
  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router.query]);

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page,
      },
    });
  };

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <Box>
      <Typography fontSize={30} fontWeight="bold">
        학습자료 구분
      </Typography>
      <RadioGroup row sx={{ mb: 6 }}>
        {typeTabsConfig.map(({ name, value }: { name: string; value: string }) => (
          <FormControlLabel
            key={name}
            label={name}
            value={value}
            control={<Radio checked={typeValue == value} />}
            onClick={() => setTypeValue(value)}
          />
        ))}
      </RadioGroup>

      <LearningMaterialTypography variant="h5">학습자료 목록</LearningMaterialTypography>

      <Table
        pagination={true}
        totalNum={data?.totalElements}
        page={data?.number}
        onChangePage={onChangePage}
        size="small"
        sx={{ tableLayout: 'fixed' }}
      >
        <TableHead>
          <TableRow>
            {headRows.map(
              ({
                name,
                align,
                width,
              }: {
                name: string;
                align: string;
                width: string;
              }) => (
                <LearningMaterialTitleTableCell key={name} align="center" width={width}>
                  {name}
                </LearningMaterialTitleTableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.content.map(lm => (
            <TableRow
              sx={{ cursor: 'pointer' }}
              key={lm.seq}
              hover
              onClick={() => onClickModifyLM(lm.seq)}
            >
              <LearningMaterialTableCell align="center">
                {lm.seq}
              </LearningMaterialTableCell>
              <LearningMaterialTableCell align="center">
                {typeTabsConfig.filter(item => item.value === lm.materialType)[0]?.name}
                {/* {lm.materialType} */}
              </LearningMaterialTableCell>
              <LearningMaterialTableCell align="center">
                {
                  subTypeTabsConfig.filter(item => item.value === lm.materialSubType)[0]
                    ?.name
                }
              </LearningMaterialTableCell>
              <LearningMaterialTableCell align="center">
                <SubjectBox>{lm.title}</SubjectBox>
              </LearningMaterialTableCell>
              <LearningMaterialTableCell align="center">
                {dateFormat(lm.createdDtime, 'isoDate')}
              </LearningMaterialTableCell>
              <LearningMaterialTableCell align="center">
                {dateFormat(lm.modifiedDtime, 'isoDate')}
              </LearningMaterialTableCell>
              {/* <TableCell align="center">{lm.origin}</TableCell> */}
              {/* <TableCell align="center">
                {lm.s3Files[0] ? lm.s3Files[0].name : '파일없음'}
              </TableCell> */}
              <LearningMaterialTableCell style={{ width: 10 }} align="right">
                <Chip
                  variant="outlined"
                  size="small"
                  label={lm.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={lm.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </LearningMaterialTableCell>
              {/* <TableCell align="center">
                <Button
                  variant="text"
                  color="warning"
                  // color="neutral"
                  size="small"
                  onClick={() => onClickModifyLM(lm.seq)}
                >
                  수정
                </Button>
              </TableCell> */}
              {/* <TableCell align="center">
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  onClick={() => onClickRemoveLM(lm.seq)}
                >
                  삭제
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

// const SubjectTypography = styled(Typography)`
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;
//   width: 150px;
// `;

// const ContentTypography = styled(Typography)`
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;
//   width: 255px;
// `;

// 학습자료 목록 글자
const LearningMaterialTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 학습자료 제목. ellipsis 적용.
const SubjectBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 학습자료 목록 테이블의 Title부분
const LearningMaterialTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 학습자료 목록 테이블의 본문
const LearningMaterialTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    background: #f5f5f5;
  }
`;

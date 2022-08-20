import {
  learningMaterialList,
  learningMaterialRemove,
} from '@common/api/learningMaterial';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
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

const headRows = [
  { name: '글번호' },
  { name: '제목' },
  { name: '본문' },
  { name: '타입' },
  { name: '서브타입' },
  { name: '생성날짜' },
  { name: '수정날짜' },
  { name: 'Url' },
  { name: '첨부파일' },
  { name: '상태' },
  { name: '수정' },
  // { name: '삭제' },
];

const typeTabsConfig = [
  { name: '전체', value: '' },
  { name: '연령별 교수학습 지도안', value: 'TYPE_BY_AGE' },
  { name: '교육자료', value: 'TYPE_EDUCATIONAL' },
  { name: '교육영상', value: 'TYPE_VIDEO ' },
  { name: '타기관자료모음', value: 'TYPE_OTHER_ORGAN ' },
];

const subTypeTabsConfig = [
  { name: '어린이', value: 'TYPE_CHILDREN' },
  { name: '청소년', value: 'TYPE_TEENAGER' },
  { name: '어르신', value: 'TYPE_ELDERLY ' },
  { name: '자가운전자', value: 'TYPE_SELF_DRIVING ' },
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
    <div>
      <RadioGroup row>
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

      <Typography variant="h5">학습자료 목록</Typography>

      <Table
        pagination={true}
        totalNum={data?.totalElements}
        page={data?.number}
        onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name }: { name: string }) => (
              <TableCell key={name} align="center">
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.content.map(lm => (
            <TableRow key={lm.seq} hover>
              <TableCell align="center">{lm.seq}</TableCell>
              <TableCell align="center">
                <SubjectTypography>{lm.title}</SubjectTypography>
              </TableCell>
              <TableCell align="center">
                <ContentTypography>{lm.content}</ContentTypography>
              </TableCell>
              <TableCell align="center">{lm.materialType}</TableCell>
              <TableCell align="center">{lm.materialSubType}</TableCell>
              <TableCell align="center">
                {dateFormat(lm.createdDtime, 'isoDate')}
              </TableCell>
              <TableCell align="center">
                {dateFormat(lm.modifiedDtime, 'isoDate')}
              </TableCell>
              <TableCell align="center">{lm.origin}</TableCell>
              <TableCell align="center">
                {lm.s3Files[0] ? lm.s3Files[0].name : '파일없음'}
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
                <Chip
                  variant="outlined"
                  size="small"
                  label={lm.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={lm.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="text"
                  color="warning"
                  // color="neutral"
                  size="small"
                  onClick={() => onClickModifyLM(lm.seq)}
                >
                  수정
                </Button>
              </TableCell>
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
    </div>
  );
}

const SubjectTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 150px;
`;

const ContentTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 255px;
`;

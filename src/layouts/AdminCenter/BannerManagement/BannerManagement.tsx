import { removeBannerAdm, useBannerListAdm } from '@common/api/banner';
import { ProductStatus } from '@common/api/course';
import { Spinner, Table } from '@components/ui';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  Chip,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dateFormat from 'dateformat';
import Link from 'next/link';
import { useRouter } from 'next/router';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: '제목', align: 'center', width: '32%' },
  { name: '게시기간 시작일', align: 'center', width: '12%' },
  { name: '게시기간 종료일', align: 'center', width: '12%' },
  { name: '배너 생성일', align: 'center', width: '8.5%' },
  { name: '사용여부', align: 'center', width: '8.5%' },
];

export function BannerManagement() {
  const dialog = useDialog();
  const snackbar = useSnackbar();
  const router = useRouter();
  const { data, error, mutate } = useBannerListAdm();

  console.log('Banner Data : ', data);

  // 수정
  const onClickmodifyBanner = async (seq: number) => {
    router.push(`/admin-center/banner/modify/${seq}`);
    mutate();
  };

  // 삭제
  // const onRemoveBanner = async (bannerSeq: number) => {
  //   try {
  //     const dialogConfirmed = await dialog({
  //       title: '콘텐츠 삭제하기',
  //       description: '정말로 삭제하시겠습니까?',
  //       confirmText: '삭제하기',
  //       cancelText: '취소',
  //     });
  //     if (dialogConfirmed) {
  //       await removeBannerAdm(bannerSeq);
  //       snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
  //       mutate();
  //     }
  //   } catch (e: any) {
  //     snackbar({ variant: 'error', message: e.data.message });
  //   }
  // };

  if (!data) return <Spinner />;
  return (
    <Box>
      <BannerTypography variant="h5">배너 목록</BannerTypography>

      <Table>
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
                <BannerTitleTableCell key={name} align="center" width={width}>
                  {name}
                </BannerTitleTableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(item => (
            <TableRow
              sx={{ cursor: 'pointer' }}
              key={item.seq}
              hover
              onClick={() => onClickmodifyBanner(item.seq)}
            >
              <BannerTableCell align="center">{item.seq}</BannerTableCell>
              <BannerTableCell align="center">
                <SubjectBox>{item.title}</SubjectBox>
              </BannerTableCell>
              {/* <TableCell>{item.toUrl}</TableCell> */}
              <BannerTableCell align="center">
                {dateFormat(item.startDate, 'yyyy-mm-dd')}
              </BannerTableCell>
              <BannerTableCell align="center">
                {dateFormat(item.endDate, 'yyyy-mm-dd')}
              </BannerTableCell>
              {/* <TableCell align='center' >{item.s3Files[0]?.name || 'No File'}</TableCell> */}
              <BannerTableCell align="center">
                {dateFormat(item.createdDtime, 'yyyy-mm-dd')}
              </BannerTableCell>
              <BannerTableCell align="center">
                <Chip
                  variant="outlined"
                  size="small"
                  label={item.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={item.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </BannerTableCell>
              {/* <TableCell style={{ width: 120 }} align="right">
                <Link href={`/admin-center/banner/modify/${item.seq}`}>
                  <Button variant="text" color="neutral" size="small">
                    상세
                  </Button>
                </Link>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() => onRemoveBanner(item.seq)}
                  size="small"
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

// 배너 목록 글자
const BannerTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 배너 제목. ellipsis 적용.
const SubjectBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 배너 목록 테이블의 Title부분
const BannerTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 배너 목록 테이블의 본문
const BannerTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    background: #f5f5f5;
  }
`;

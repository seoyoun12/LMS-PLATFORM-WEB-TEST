import { removeBannerAdm, useBannerListAdm } from '@common/api/banner';
import { ProductStatus } from '@common/api/course';
import { Spinner, Table } from '@components/ui';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Button, Chip, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import dateFormat from 'dateformat';
import Link from 'next/link';

const headRows: { name: string; align: 'inherit' | 'left' | 'center' | 'right' | 'justify' }[] = [
  { name: 'seq', align: 'left' },
  { name: '제목', align: 'left' },
  { name: '이동URL', align: 'left' },
  { name: '사용여부', align: 'left' },
  { name: '게시기간 시작일', align: 'left' },
  { name: '게시기간 종료일', align: 'left' },
  { name: '파일이름', align: 'left' },
  { name: '배너 생성일', align: 'left' },
];

export function BannerManagement() {
  const dialog = useDialog();
  const snackbar = useSnackbar();
  const { data, error, mutate } = useBannerListAdm();

  const onRemoveBanner = async (bannerSeq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await removeBannerAdm(bannerSeq);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  if (!data) return <Spinner />;
  return (
    <BannnerManagementContainer>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700,
        }}
      >
        배너 목록
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align }) => (
              <TableCell key={name} align={align}>
                {name}
              </TableCell>
            ))}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow>
              <TableCell>{item.seq}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.toUrl}</TableCell>
              <TableCell>
                <Chip
                  variant="outlined"
                  size="small"
                  label={item.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={item.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </TableCell>
              <TableCell>{dateFormat(item.startDate,'yyyy-mm-dd')}</TableCell>
              <TableCell>{dateFormat(item.endDate,'yyyy-mm-dd')}</TableCell>
              <TableCell>{item.s3Files[0]?.name || 'No File'}</TableCell>
              <TableCell>{dateFormat(item.createdDtime, 'yyyy-mm-dd')}</TableCell>
              <TableCell style={{ width: 120 }} align="right">
                <Link href={`/admin-center/banner/modify/${item.seq}`}>
                  <Button variant="text" color="neutral" size="small">
                    상세
                  </Button>
                </Link>
                <Button variant="text" color="warning" onClick={() => onRemoveBanner(item.seq)} size="small">
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BannnerManagementContainer>
  );
}

const BannnerManagementContainer = styled(Box)`
  tr {
    white-space: nowrap;
  }
`;

import { useBannerListAdm } from '@common/api/banner';
import { Table } from '@components/ui';
import styled from '@emotion/styled';
import { Box, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const headRows: { name: string; align: 'inherit' | 'left' | 'center' | 'right' | 'justify' }[] = [
  { name: 'seq', align: 'left' },
  { name: '제목', align: 'left' },
  { name: '이동URL', align: 'left' },
  { name: '사용여부', align: 'left' },
  { name: '게시기간 시작일', align: 'left' },
  { name: '게시기간 종료일', align: 'left' },
  { name: '파일이름', align: 'left' },
  { name: '파일경로', align: 'left' },
  { name: '배너 생성일', align: 'left' },
];

export function BannerManagement() {
  const { data, error } = useBannerListAdm();

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
        <TableBody></TableBody>
      </Table>
    </BannnerManagementContainer>
  );
}

const BannnerManagementContainer = styled(Box)`
  tr {
    white-space: nowrap;
  }
`;

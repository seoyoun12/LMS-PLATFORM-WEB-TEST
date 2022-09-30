import {
  mainDisplayModify,
  mainDisplayModifyDto,
  MainDisplayType,
} from '@common/api/adm/mainDisplay';
import { ProductStatus } from '@common/api/course';
import { useMainDisplay } from '@common/api/mainDisplay';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  Chip,
  Container,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';

const mainDisplayList = [
  { title: '운수종사자', type: MainDisplayType.EDUCATION_TRANSPORT_WORKER },
  { title: '저상버스', type: MainDisplayType.EDUCATION_GROUND_BUS_DRIVER },
  {
    title: '도민교통안전교육',
    type: MainDisplayType.EDUCATION_PROVINCIAL_TRAFFIC_SAFETY,
  },
];

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: 'display타입', align: 'center', width: '15%' },
  { name: '변경', align: 'center', width: '75%' },
  { name: '상태', align: 'center', width: '5%' },
];

export function MainDisplayManagement() {
  const snackbar = useSnackbar();
  const { data, error, mutate } = useMainDisplay();
  const [openMainModifyModal, setopenMainModifyModal] = useState(false);
  const [displaySeq, setDisplaySeq] = useState<number>();

  const handleModalClose = async () => {
    if (openMainModifyModal) {
      setopenMainModifyModal(false);
      await mutate();
    }
  };

  const handleStatusChange = async (checked: boolean, dto: mainDisplayModifyDto) => {
    try {
      const data: mainDisplayModifyDto = {
        mainDisplayType: dto.mainDisplayType,
        seq: dto.seq,
        status: checked ? ProductStatus.APPROVE : ProductStatus.REJECT,
      };
      await mainDisplayModify(data);
      snackbar({
        variant: 'success',
        message: `${dto.seq}번 변경완료 (${
          ProductStatus.APPROVE === dto.status ? '비활성화' : '활성화'
        })`,
      });
      mutate();
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  if (error) return <Box>Error..</Box>;

  return (
    <Container>
      <MainDisplayTypography variant="h5">메인화면 목록</MainDisplayTypography>

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
                <MainDisplayTitleTableCell key={name} align="center" width={width}>
                  {name}
                </MainDisplayTitleTableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(item => (
            <TableRow>
              <MainDisplayTableCell align="center">{item.seq}</MainDisplayTableCell>
              <MainDisplayTableCell align="center">
                {
                  mainDisplayList.filter(
                    filter => filter.type === item.mainDisplayType
                  )[0].title
                }
              </MainDisplayTableCell>

              <MainDisplayTableCell style={{ width: 120 }} align="center">
                <Switch
                  checked={item.status === ProductStatus.APPROVE ? true : false}
                  onChange={(e, checked) => handleStatusChange(checked, item)}
                />
              </MainDisplayTableCell>

              <MainDisplayTableCell align="center">
                <Chip
                  variant="outlined"
                  size="small"
                  label={item.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={item.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </MainDisplayTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

// 메인화면 목록 글자
const MainDisplayTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 메인화면 제목. ellipsis 적용.
const SubjectBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 메인화면 목록 테이블의 Title부분
const MainDisplayTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 메인화면 목록 테이블의 본문
const MainDisplayTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    background: #f5f5f5;
  }
`;

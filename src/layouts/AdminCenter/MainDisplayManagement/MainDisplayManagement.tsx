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
}[] = [
  { name: '번호', align: 'left' },
  { name: 'display타입', align: 'left' },
  { name: '상태', align: 'left' },
  { name: '변경', align: 'center' },
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
    <MainDisplayManagementWrap>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700,
        }}
      >
        메인화면 목록
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align }) => (
              <TableCell key={name} align={align}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(item => (
            <TableRow>
              <TableCell>{item.seq}</TableCell>
              <TableCell>
                {
                  mainDisplayList.filter(
                    filter => filter.type === item.mainDisplayType
                  )[0].title
                }
              </TableCell>
              <TableCell>
                <Chip
                  variant="outlined"
                  size="small"
                  label={item.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={item.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </TableCell>
              <TableCell style={{ width: 120 }} align="right">
                <Switch
                  checked={item.status === ProductStatus.APPROVE ? true : false}
                  onChange={(e, checked) => handleStatusChange(checked, item)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainDisplayManagementWrap>
  );
}

const MainDisplayManagementWrap = styled(Container)``;

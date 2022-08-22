import { Spinner, Table } from '@components/ui';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from 'react';
import { CourseModuleUploadModal } from '@components/admin-center';
import { useSnackbar } from '@hooks/useSnackbar';
import { useCourseModule } from '@common/api/adm/courseModule';
import { moduleTypeArr } from '@components/admin-center/CourseModule/CourseModuleUploadModal';
import { ProductStatus } from '@common/api/course';
import { css } from '@emotion/css';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: 'seq', align: 'left' },
  { name: '과정모듈명', align: 'left' },
  { name: '과정모듈 타입', align: 'left' },
  { name: '상태', align: 'left' },
];

export function CourseModule() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [courseModuleSeq, setCourseModuleSeq] = useState<number>(null);
  const { courseSeq } = router.query;
  const { data, error, mutate } = useCourseModule(Number(courseSeq));

  const handleClose = () => {
    setOpenModal(false);
    mutate();
  };
  if (error) return <div>error</div>;
  if (!data) return <Spinner />;
  return (
    <Container>
      <UploadBtn>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={() => {
            setCourseModuleSeq(null);
            setOpenModal(true);
          }}
        >
          모듈 등록
        </Button>
      </UploadBtn>
      <Typography variant="h5">과정 모듈 관리</Typography>
      <Table
        pagination={true}
        // totalNum={data.totalElements}
        // page={data.number}
        // onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align }) => (
              <TableCell className={spaceNoWrap} key={name} align={align}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <CustomTableRow
              key={item.courseSeq}
              hover
              onClick={() => {
                if (!item.courseModuleSeq) {
                  return snackbar({
                    variant: 'error',
                    message: `지정된 모듈의 시퀀스가 존재하지 않습니다!`,
                  });
                }
                setCourseModuleSeq(item.courseModuleSeq);
                setOpenModal(true);
              }}
            >
              <TableCell>{item.courseModuleSeq}</TableCell>
              <TableCell>{item.moduleName}</TableCell>
              <TableCell>
                {moduleTypeArr.filter(filt => filt.type === item.moduleType)[0].title}
              </TableCell>
              <TableCell>
                <Chip
                  variant="outlined"
                  size="small"
                  label={item.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={item.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </TableCell>
              {/* <TableCell>{item.seq}</TableCell>
          <TableCell>{item.seq}</TableCell> */}
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
      {openModal && (
        <CourseModuleUploadModal
          open={openModal}
          onClose={handleClose}
          courseModuleSeq={courseModuleSeq}
          courseSeq={Number(courseSeq)}
          isModify={courseModuleSeq ? true : false}
        />
      )}
    </Container>
  );
}

const UploadBtn = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;
  justify-content: flex-end;

  > button:last-of-type {
    margin-left: 12px;
  }
`;

const spaceNoWrap = css`
  white-space: nowrap;
`;
const CustomTableRow = styled(TableRow)`
  cursor: pointer;
`;

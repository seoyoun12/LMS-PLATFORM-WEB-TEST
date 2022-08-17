import { Modal, Spinner, Table } from '@components/ui';
import {
  Box,
  Button,
  Chip,
  InputBase,
  Radio,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSurveyAdm } from '@common/api/adm/survey';
import React, { useRef, useState } from 'react';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import styled from '@emotion/styled';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CourseModuleSaveReqDto } from '@common/api/adm/courseModule';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: 'Seq', align: 'left' },
  { name: '설문명', align: 'right' },
  { name: '연동', align: 'right' },
  //   { name: '연결된 과정명', align: 'right' },
];

interface Props {
  couserModuleSurveySeq: number;
  watch: UseFormWatch<CourseModuleSaveReqDto>;
  selectedSurveySeq: number;
  onChangeSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CourseModuleSurveyList({
  couserModuleSurveySeq,
  watch,
  selectedSurveySeq,
  onChangeSelect,
}: Props) {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { data, error, mutate } = useSurveyAdm({ page, title: keyword });

  const onChangePage = (page: number) => {
    setPage(page);
  };
  console.log(data, '네', watch());

  if (error) return <Box>Error..</Box>;
  if (!data) return <Spinner />;
  return (
    <Table
      pagination={true}
      totalNum={data.totalElements}
      page={data.number}
      onChangePage={onChangePage}
      size="small"
    >
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
        {data.content.map(content => (
          <TableRow key={content.seq} hover>
            <TableCell component="th" scope="row">
              {content.seq}
            </TableCell>
            <TableCell align="right">
              <Link href={`/content/${content.seq}`} underline="hover" color={grey[900]}>
                {content.title}
              </Link>
            </TableCell>
            <TableCell align="right">
              {/* <ConnectButton
                disabled={!!content.courseSeq}
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleConnect(content.seq)}
              >
                연결하기
              </ConnectButton>
              <Button
                disabled={!content.courseSeq}
                variant="outlined"
                color="neutral"
                size="small"
                onClick={() => handleDisconnect(content.courseSeq)}
              >
                해제하기
              </Button> */}
              {couserModuleSurveySeq === content.seq ? (
                <Chip
                  variant="outlined"
                  size="small"
                  label={'연동됨'}
                  color={'secondary'}
                />
              ) : (
                <Radio
                  onChange={onChangeSelect}
                  value={content.seq}
                  checked={selectedSurveySeq === content.seq}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
// const ContentBody = styled(Container)`
//   padding: 20px;
// `;

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 6px 0 6px;
  margin-bottom: 24px;
  border-radius: 4px;
  border: 1px solid ${grey[300]};
`;

const SearchInput = styled(InputBase)`
  width: 100%;
`;

const ConnectButton = styled(Button)`
  margin-right: 12px;
`;

const TableTitleSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
`;

const ReloadButton = styled(Button)`
  margin-left: auto;
`;

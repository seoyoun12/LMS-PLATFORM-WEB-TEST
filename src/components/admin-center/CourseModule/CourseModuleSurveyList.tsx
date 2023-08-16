import { Spinner, Table } from '@components/ui';
import {
  Box,
  Chip,
  Radio,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSurveyAdm } from '@common/api/adm/survey';
import React, { useState } from 'react';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';

import { UseFormWatch } from 'react-hook-form';
import { CourseModuleSaveReqDto } from '@common/api/adm/courseModule';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: '번호', align: 'left' },
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
  const { data, error, mutate } = useSurveyAdm({ page, title: keyword });

  const onChangePage = (page: number) => {
    setPage(page);
  };

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


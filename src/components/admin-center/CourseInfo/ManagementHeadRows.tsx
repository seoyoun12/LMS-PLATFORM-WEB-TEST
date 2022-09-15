import { CourseType } from '@common/api/adm/courseClass';
import styled from '@emotion/styled';
import { Box, Button, IconButton, InputBase, Radio } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import { CompleteType, StatusType } from '@common/api/adm/learningInfo';

interface Props {
  //   searchInputRef: React.MutableRefObject<HTMLInputElement>;
  courseType: CourseType;
  completeType: CompleteType | null;
  statusType: StatusType | null;
  onChangeType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.FormEvent, isReload?: boolean) => Promise<void>;
  onChangeCompleteType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStatusType: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ManagementHeadRows = React.forwardRef(function (
  {
    courseType,
    completeType,
    statusType,
    onChangeType,
    handleSearch,
    onChangeCompleteType,
    onChangeStatusType,
  }: Props,
  searchInputRef
) {
  return (
    <HeadRows>
      <Box>
        <Box>과정타입</Box>
        <Radio
          value={CourseType.TYPE_TRANS_WORKER}
          onChange={onChangeType}
          checked={courseType === CourseType.TYPE_TRANS_WORKER}
        />
        <span>운수종사자</span>
        <Radio
          value={CourseType.TYPE_LOW_FLOOR_BUS}
          onChange={onChangeType}
          checked={courseType === CourseType.TYPE_LOW_FLOOR_BUS}
        />
        <span>저상버스</span>
        <Radio
          value={CourseType.TYPE_PROVINCIAL}
          onChange={onChangeType}
          checked={courseType === CourseType.TYPE_PROVINCIAL}
        />
        <span>도민교통</span>
      </Box>
      <Box>
        <Box>수료여부</Box>
        <Radio
          value={null}
          onChange={onChangeCompleteType}
          checked={completeType === null}
        />
        <span>전체</span>
        <Radio
          value={CompleteType.TYPE_COMPLETE}
          onChange={onChangeCompleteType}
          checked={completeType === CompleteType.TYPE_COMPLETE}
        />
        <span>수료</span>
        <Radio
          value={CompleteType.TYPE_INCOMPLETE}
          onChange={onChangeCompleteType}
          checked={completeType === CompleteType.TYPE_INCOMPLETE}
        />
        <span>미수료</span>
      </Box>

      <Box>
        <Box>퇴교여부(상태)</Box>
        <Radio value={null} onChange={onChangeStatusType} checked={statusType === null} />
        <span>전체</span>
        <Radio
          value={StatusType.TYPE_NORMAL}
          onChange={onChangeStatusType}
          checked={statusType === StatusType.TYPE_NORMAL}
        />
        <span>정상</span>
        <Radio
          value={StatusType.TYPE_OUT}
          onChange={onChangeStatusType}
          checked={statusType === StatusType.TYPE_OUT}
        />
        <span>퇴교</span>
      </Box>

      <SearchContainer onSubmit={handleSearch}>
        <SearchInput
          inputRef={searchInputRef}
          placeholder="콘텐츠 검색"
          size="small"
          type="search"
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </SearchContainer>
      <ReloadButton
        size="small"
        color="neutral"
        variant="text"
        endIcon={<ReplayIcon htmlColor={grey[700]} />}
        onClick={e => handleSearch(e, true)}
      >
        전체 다시 불러오기
      </ReloadButton>
    </HeadRows>
  );
});
const HeadRows = styled(Box)``;
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

const ReloadButton = styled(Button)`
  margin-left: auto;
`;
import { CourseType } from '@common/api/adm/courseClass';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Radio,
  Select,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import { CompleteType, StatusType } from '@common/api/adm/learningInfo';
import {
  userBusinessTypeOne,
  userBusinessTypeTwo,
} from '@layouts/MeEdit/TransWorker/TransWorker';
import { locationList } from '@layouts/MeEdit/MeEdit';

interface Props {
  //   searchInputRef: React.MutableRefObject<HTMLInputElement>;
  search: string;
  completeType: CompleteType | null;
  statusType: StatusType | null;
  handleSearch: (e: React.FormEvent, isReload?: boolean) => Promise<void>;
  onChangeCompleteType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStatusType: (e: React.ChangeEvent<HTMLInputElement>) => void;

  businessType: string | null;
  onChangeBusinessType: (value: string) => void;
  carRegitRegion: string | null;
  onChangeCarRegitRegion: (value: string) => void;
}

export const ManagementHeadRows = React.forwardRef(function (
  {
    search,
    completeType,
    statusType,
    businessType,
    carRegitRegion,
    handleSearch,
    onChangeCompleteType,
    onChangeStatusType,
    onChangeBusinessType,
    onChangeCarRegitRegion,
  }: Props,
  searchInputRef
) {
  return (
    <HeadRows>
      <Box>
        <Box display="flex" gap={1} width="1000px">
          <Box width="50%">
            <Box>업종</Box>
            <Select
              onChange={e => onChangeBusinessType(e.target.value)}
              value={String(businessType)}
              fullWidth
            >
              <MenuItem value={null}>-없음-</MenuItem>
              {userBusinessTypeOne.map(item => (
                <MenuItem key={item.enType} value={item.enType}>
                  {item.type}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box width="50%">
            <Box>차량등록지</Box>
            <Select
              onChange={e => onChangeCarRegitRegion(e.target.value)}
              value={String(carRegitRegion)}
              fullWidth
            >
              <MenuItem value={null}>-없음-</MenuItem>
              {locationList.map(item => (
                <MenuItem key={item.en} value={item.en}>
                  {item.ko}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
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
          placeholder="이름 혹은 아이디 검색"
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

      <Box mt={2} mb={2} fontSize={18} fontWeight="bold">
        {search !== '' && `검색어 : ${search}`}
      </Box>
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

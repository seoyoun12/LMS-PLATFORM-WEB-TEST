import styled from '@emotion/styled';
import { Box, Button, IconButton, InputBase } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';

interface Props {
  //   searchInputRef: React.MutableRefObject<HTMLInputElement>;
  search: string;
  placeholder: string;
  handleSearch: (e: React.FormEvent, isReload?: boolean) => Promise<void>;
}

export const ManagementSearchHeadRow = React.forwardRef(function (
  { handleSearch, search, placeholder }: Props,
  searchInputRef: React.MutableRefObject<HTMLInputElement>
) {
  return (
    <HeadRows>
      <SearchContainer onSubmit={handleSearch}>
        <SearchInput
          inputRef={searchInputRef}
          placeholder={`${placeholder} 검색`}
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

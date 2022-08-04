import { useBannerListAdm } from '@common/api/banner';
import { Table } from '@components/ui';
import { FileUploader } from '@components/ui/FileUploader';
import styled from '@emotion/styled';
import { Box, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent } from 'react';

export function BannerUpload() {
  const { data, error } = useBannerListAdm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};

  const handleFileChange = (e: ChangeEvent) => {};
  return (
    <BannnerUploadContainer>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField />
        <TextField />
        <TextField />
      </Box>
    </BannnerUploadContainer>
  );
}

const BannnerUploadContainer = styled(Box)``;

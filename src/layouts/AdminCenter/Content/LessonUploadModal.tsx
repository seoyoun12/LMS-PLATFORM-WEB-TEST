import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Alert } from '@components/common';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, FormControl, FormHelperText, InputLabel, InputLabelProps, MenuItem, Select } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { ContentInput, ContentType } from '@common/api/content';
import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { PRODUCT_STATUS } from '@common/api/course';
import styled from '@emotion/styled';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { grey } from '@mui/material/colors';
import { LessonInput, uploadLessons } from '@common/api/lesson';
import { CustomInputLabel } from '@components/ui/InputLabel';
import { read, utils } from 'xlsx';

type LessonUploadModalProps = {
  open: boolean,
  handleClose: () => void;
} & DialogProps

interface XlsxData extends LessonInput {
  min: number;
  sec: number;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const contentTypeOptions = [
  { value: ContentType.CONTENT_HTML, name: '웹콘텐츠(HTML5)' },
  { value: ContentType.CONTENT_MP4, name: 'mp4' },
  { value: ContentType.CONTENT_EXTERNAL, name: '외부링크' }
];

const defaultValues = {};

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export function LessonUploadModal({ open, handleClose, ...dialogProps }: LessonUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<{ contentType: ContentType }>({ defaultValues });

  const onSubmit: SubmitHandler<{ contentType: ContentType }> = async ({ contentType }) => {
    const files = fileInputRef.current?.files;
    if (!files?.length) return null;

    /* file is an ArrayBuffer */
    const file = await files[0].arrayBuffer();
    const workbook = read(file);
    const xlsxData: XlsxData[] = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    const lessonInput = xlsxData
      .filter(data => !!data)
      .map(data => ({
        contentType,
        totalTime: (data.min * 60 + data.sec),
        ...data
      }));

    console.log('lessonInput', lessonInput);

    return uploadLessons({ contentId: 1, lessonInput });
  };

  const uploadFile = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={open}
      {...dialogProps}
    >
      <BootstrapDialogTitle id="modal-title" onClose={handleClose}>
        강의 등록
      </BootstrapDialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Alert variant="info">
            <Typography variant="body2" component="div">
              <Typography variant="body2">
                1. 샘플양식을 다운로드 받아 작성한 후 업로드 하셔야 합니다. <br />
              </Typography>
              <Typography variant="body2">
                2. 업로드파일은 .xls 파일만 가능합니다. 복수 시트는 지원하지 않습니다.<br />
              </Typography>
              <Typography variant="body2" color="primary">
                3. 일괄등록의 경우 이전 데이타는 모두 삭제되고 새로 등록됩니다.(주의요망) <br />
              </Typography>
              <Typography variant="body2">
                4. 엑셀의 첫번째, 두번째 행은 칼럼의 제목이며 실제 데이타는 3번째 행부터 등록됩니다.(예제확인)<br />
              </Typography>
            </Typography>
          </Alert>
          <FormContainer>
            <FormControl className="form-control">
              <CustomInputLabel size="small">콘텐츠 타입</CustomInputLabel>
              <Controller
                rules={{ required: '콘텐츠 유형을 선택해주세요.' }}
                control={control}
                name="contentType"
                render={({ field }) => (
                  <Select
                    {...field}
                    size="small"
                    label="콘텐츠 타입"
                  >
                    {contentTypeOptions.map(({ value, name }) =>
                      <MenuItem value={value} key={value}>{name}</MenuItem>
                    )}
                  </Select>
                )}
              />
              <ErrorMessage errors={errors} name="contentType" as={<FormHelperText error />} />
            </FormControl>

            <FormControl className="form-control">
              <Typography variant="body2" className="typo">
                엑셀 파일 업로드
              </Typography>
              <label htmlFor="input-file">
                <input
                  style={{ display: 'none' }}
                  id="input-file"
                  type="file"
                  multiple={true}
                  ref={fileInputRef}
                />
              </label>
              <Button
                color="neutral"
                variant="outlined"
                startIcon={<UploadOutlinedIcon htmlColor={grey[700]} />}
                onClick={() => fileInputRef.current!.click()}
              >
                파일 선택
              </Button>
            </FormControl>
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button type="submit" autoFocus>
            업로드
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .form-control {
    width: 100%;

    .typo {
      margin-bottom: 8px;
    }

    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
`;



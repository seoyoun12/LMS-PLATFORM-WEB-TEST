import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Alert } from '@components/common';
import Button from '@mui/material/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { ContentType } from '@common/api/content';
import { ChangeEvent, useRef } from 'react';
import styled from '@emotion/styled';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { grey } from '@mui/material/colors';
import { LessonInput, uploadLessons } from '@common/api/lesson';
import { CustomInputLabel } from '@components/ui/InputLabel';
import { read, utils } from 'xlsx';
import { Modal } from '@components/ui';
import { useSnackbar } from '@hooks/useSnackbar';

interface XlsxData extends LessonInput {
  min: number;
  sec: number;
}

const contentTypeOptions = [
  { value: ContentType.CONTENT_HTML, name: '웹콘텐츠(HTML5)' },
  { value: ContentType.CONTENT_MP4, name: 'mp4' },
  { value: ContentType.CONTENT_EXTERNAL, name: '외부링크' }
];

const defaultValues = {
  contentType: ContentType.CONTENT_MP4
};

export function LessonBulkUploadModal({ open, handleClose }: {
  open: boolean;
  handleClose: (isSubmit: boolean) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<{ contentType: ContentType }>({ defaultValues });
  const snackbar = useSnackbar();

  const onSubmit: SubmitHandler<{ contentType: ContentType }> = async ({ contentType }) => {
    const files = fileInputRef.current?.files;
    if (!files?.length) return null;

    /* file is an ArrayBuffer */
    const file = await files[0].arrayBuffer();
    const workbook = read(file);
    const xlsxData: XlsxData[] = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    const lessonInput = xlsxData
      .filter(data => !!data)
      .map(data => {
          const totalTime = (data.min * 60 + data.sec);
          const completeTime = Math.round(totalTime * 0.9);
          return {
            contentType,
            totalTime,
            completeTime,
            ...data
          };
        }
      );

    try {
      await uploadLessons({ contentId: 1, lessonInput });
      snackbar({ variant: 'success', message: '성공적으로 업로드 되었습니다.' });
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }

    handleClose(true);
  };

  const uploadFile = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
  };

  return (
    <Modal
      onClose={handleClose}
      open={open}
      title="강의 등록"
      action="업로드"
      handleClose={() => handleClose(false)}
      onSubmit={handleSubmit(onSubmit)}
      maxWidth="md"
    >
      <Box component="form">
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
      </Box>
    </Modal>
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

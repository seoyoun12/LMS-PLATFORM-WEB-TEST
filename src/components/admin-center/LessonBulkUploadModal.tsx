import Typography from '@mui/material/Typography';
import { Alert } from '@components/common';
import Button from '@mui/material/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { ContentType } from '@common/api/content';
import { ChangeEvent, useRef, useState } from 'react';
import styled from '@emotion/styled';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { grey } from '@mui/material/colors';
import { LessonInput } from '@common/api/lesson';
import { uploadLessons } from '@common/api/adm/lesson';
import { CustomInputLabel } from '@components/ui/InputLabel';
import { read, utils } from 'xlsx';
import { Modal, Spinner } from '@components/ui';
import { useSnackbar } from '@hooks/useSnackbar';
import { useRouter } from 'next/router';

interface XlsxData extends LessonInput {
  min: number;
  sec: number;
}

const contentTypeOptions = [{ value: ContentType.CONTENT_MP4, name: 'mp4' }];

const defaultValues = {
  contentType: ContentType.CONTENT_MP4,
};

export function LessonBulkUploadModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: (isSubmit: boolean) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<{ contentType: ContentType }>({ defaultValues });
  const snackbar = useSnackbar();
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);

  // excel sample file
  const onClickDownloadFile = async () => {
    const link = document.createElement('a');
    link.download = `Sample.xlsx`;
    // link.href = '../public/assets/files/Sample.xlsx';
    //추후 배포서버 cdn으로 수정 필요
    link.href = 'https://kr.object.ncloudstorage.com/mirim-lms-dev/SAMPLE.xlsx';
    // link.href =
    //   'C:Users//MirimDesktop//LSJ_code//MirimProject01//LMS-PLATFORM-WEB//public//assets//files//Sample.xlsx';
    link.click();
  };

  const onChangeFile = (e: ChangeEvent) => {
    // const files = (e.target as HTMLInputElement).files
    // console.log((e.target as HTMLInputElement).files);
    // fileInputRef.current = e.target as HTMLInputElement;
    setFileName((e.target as HTMLInputElement)?.files[0]?.name || '');
  };

  const onSubmit: SubmitHandler<{ contentType: ContentType }> = async ({
    contentType,
  }) => {
    const files = fileInputRef.current?.files;
    if (!files?.length) return null;

    setLoading(true);

    /* file is an ArrayBuffer */
    const file = await files[0].arrayBuffer();
    const workbook = read(file);
    const xlsxData: XlsxData[] = utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    );
    const lessonInput = xlsxData
      .filter(data => !!data)
      .map(data => {
        const totalTime = data.min * 60 + data.sec;
        // const completeTime = Math.round(totalTime * 0.9);
        const completeTime = Math.round(totalTime * 1);
        return {
          contentType,
          totalTime,
          completeTime,
          ...data,
        };
      });

    try {
      // 데이터 있는지
      console.log('lessonInput : ', lessonInput);

      const contentSeq = Number(query.contentSeq);

      console.log('contentSeq : ', contentSeq);

      // await uploadLessons({ contentSeq, lessonInput });
      snackbar({ variant: 'success', message: '성공적으로 업로드 되었습니다.' });
      // setLoading(false);
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
      // setLoading(false);
    }

    handleClose(true);
  };

  // 파일 업로드 관련 코드 작성 필요. modal쪽 전부 코드수정해야함.

  return (
    <Modal
      onClose={handleClose}
      open={open}
      title="강의 등록"
      action="업로드"
      onCloseModal={() => handleClose(false)}
      onSubmit={handleSubmit(onSubmit)}
      maxWidth="md"
      actionLoading={loading}
      actionDisabled={loading}
    >
      <Box component="form">
        <Alert variant="info">
          <Typography variant="body2" component="div">
            <Typography variant="body2">
              1. 샘플양식을 다운로드 받아 작성한 후 업로드 하셔야 합니다.
            </Typography>
            <Typography variant="body2">
              2. 업로드파일은 .xls 파일만 가능합니다. 복수 시트는 지원하지 않습니다.
              <br />
            </Typography>
            <Typography variant="body2" color="primary">
              3. 일괄등록의 경우 이전 데이타는 모두 삭제되고 새로 등록됩니다.(주의요망){' '}
              <br />
            </Typography>
            <Typography variant="body2">
              4. 엑셀의 첫번째, 두번째 행은 칼럼의 제목이며 실제 데이타는 3번째 행부터
              등록됩니다.(예제확인)
              <br />
            </Typography>
            <Button
              onClick={onClickDownloadFile}
              variant="contained"
              sx={{
                border: '1px solid skyblue',
                padding: '1px',
                float: 'right',
                width: '150px',
                marginTop: '15px',
              }}
            >
              샘플 엑셀 다운로드
            </Button>
          </Typography>
        </Alert>
        <FormContainer>
          <FormControl className="form-control" sx={{ display: 'none' }}>
            <CustomInputLabel size="small">콘텐츠 타입</CustomInputLabel>
            <Controller
              rules={{ required: '콘텐츠 유형을 선택해주세요.' }}
              control={control}
              name="contentType"
              render={({ field }) => (
                <Select {...field} size="small" label="콘텐츠 타입">
                  {contentTypeOptions.map(({ value, name }) => (
                    <MenuItem value={value} key={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="contentType"
              as={<FormHelperText error />}
            />
          </FormControl>

          <FormControl className="form-control">
            {/* <Typography variant="body2" className="typo">
              엑셀 파일 업로드
            </Typography> */}
            <label htmlFor="input-file">
              <input
                style={{ display: 'none' }}
                accept=".xlsx"
                id="input-file"
                type="file"
                multiple={true}
                onChange={onChangeFile}
                ref={fileInputRef}
              />
            </label>
            {fileName}
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

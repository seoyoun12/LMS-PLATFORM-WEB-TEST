import { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import styled from '@emotion/styled';
import { ProductStatus } from '@common/api/course';
import TextField from '@mui/material/TextField';
import styles from '@styles/common.module.scss';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Content, ContentInput, ContentType } from '@common/api/content';
import * as React from 'react';
import { CustomInputLabel } from '@components/ui/InputLabel';
import { Spinner } from '@components/ui';
import { useSnackbar } from '@hooks/useSnackbar';
import { useRouter } from 'next/router';
import { useDialog } from '@hooks/useDialog';
import { contentRemove } from '@common/api/adm/content';

// const contentTypeOptions = [
//   { value: ContentType.CONTENT_HTML, name: '웹콘텐츠(HTML5)' },
//   { value: ContentType.CONTENT_MP4, name: 'mp4' },
//   { value: ContentType.CONTENT_EXTERNAL, name: '외부링크' }
// ];

const defaultValues = {
  contentType: ContentType.CONTENT_MP4,
  status: ProductStatus.APPROVE,
  // contentType: ContentType.CONTENT_HTML,
  // contentName: ''
};

export function ContentUploadForm({
  mode = 'upload',
  content,
  onHandleSubmit,
}: {
  mode?: 'upload' | 'modify';
  content?: Content;
  onHandleSubmit: ({
    contentInput,
    contentSeq,
    setLoading,
  }: {
    contentInput: ContentInput;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    contentSeq?: number;
  }) => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ContentInput>({ defaultValues });

  useEffect(() => {
    if (mode === 'modify' && !!content) {
      reset({ ...content });
    }
  }, [mode, content, reset]);

  const onRemoveContent = async (seq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await contentRemove(content.seq);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        router.push(`/admin-center/content`);

        // await mutate([ `/content/adm`, { params: { page } } ]);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const onSubmit: SubmitHandler<ContentInput> = (contentInput: ContentInput) => {
    onHandleSubmit({ contentInput: contentInput, contentSeq: content?.seq, setLoading });
  };

  return (
    <Container className={styles.globalContainer}>
      <Box className="form" component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* <FormControl className="form-control" disabled> */}
        {/* <FormControl className="form-control">
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
        </FormControl> */}

        <FormControl className="form-control">
          <TextField
            {...register('contentName', { required: '콘텐츠명을 입력해주세요.' })}
            size="small"
            label="콘텐츠명"
            variant="outlined"
          />
          <ErrorMessage
            errors={errors}
            name="contentName"
            as={<FormHelperText error />}
          />
        </FormControl>

        <FormControl className="form-control">
          <FormLabel focused={false}>상태</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="status"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value={ProductStatus.APPROVE}
                  control={<Radio />}
                  label="정상"
                />
                <FormControlLabel
                  value={ProductStatus.REJECT}
                  control={<Radio />}
                  label="중지"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
        <ButtonBox>
          <SubmitBtn variant="contained" type="submit" disabled={loading}>
            {loading ? (
              <Spinner fit={true} />
            ) : mode === 'upload' ? (
              '업로드하기'
            ) : (
              '수정하기'
            )}
          </SubmitBtn>
          {mode === 'upload' ? (
            ''
          ) : (
            <DeleteBtn
              color="warning"
              variant="contained"
              onClick={() => onRemoveContent(content.seq)}
              disabled={loading}
            >
              {loading ? <Spinner fit={true} /> : '삭제'}
            </DeleteBtn>
          )}
        </ButtonBox>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 8px;

  .form {
    display: flex;
    flex-direction: column;
  }

  .form-control {
    margin-top: 30px;
  }
`;

const ButtonBox = styled(Box)`
  margin: 120px 0 20px 0;
`;

const SubmitBtn = styled(Button)`
  width: 15%;
  float: right;
  margin: 0 0 0 5px;
`;

const DeleteBtn = styled(Button)`
  width: 15%;
  float: right;
`;

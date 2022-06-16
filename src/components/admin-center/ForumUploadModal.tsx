import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Box, Chip,
  FormControl, FormControlLabel,
  FormHelperText, FormLabel,
  Radio, RadioGroup,
  TextareaAutosize
} from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Modal } from '@components/ui';
import TextField from '@mui/material/TextField';
import { useSnackbar } from '@hooks/useSnackbar';
import { ForumInput, modifyForum, uploadForum, useForum } from '@common/api/forum';
import { ProductStatus } from '@common/api/course';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { css } from '@emotion/css';
import { S3Files } from 'types/file';
import { FileUploader } from '@components/ui/FileUploader';

interface Props {
  open: boolean;
  onClose: (isMutate: boolean) => void;
  forumId?: number | null;
  courseId?: number;
  mode?: 'modify' | 'upload';
}

type FormType = {
  files: File[];
} & ForumInput

const defaultValues = {
  status: ProductStatus.APPROVE,
  files: [],
  s3Files: []
};

export function ForumUploadModal({ open, onClose, forumId, courseId, mode = 'upload' }: Props) {
  const snackbar = useSnackbar();
  const { forum, forumError, mutate } = useForum(Number(forumId));
  const [ submitLoading, setSubmitLoading ] = useState(false);
  const [ s3Files, setS3Files ] = useState<S3Files | null>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
    watch
  } = useForm<FormType>({ defaultValues });
  const watchFiles = watch('files');
  const loading = (open && mode === 'modify' && !forum);
  const fileName = (watchFiles?.length && watchFiles[0].name) || (s3Files?.length && s3Files[0].name);

  useEffect(() => {
    if (open) {
      if (mode === 'modify' && forum) {
        setS3Files(forum.s3Files);
        reset({ ...forum });
      } else {
        reset({ ...defaultValues });
        setS3Files([]);
      }
    }
  }, [ mode, forum, open ]);

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    // setFileName(files[0].name);
  };

  const onDeleteFile = () => {
    resetField('files');
    setS3Files([]);
  };

  const onSubmit: SubmitHandler<FormType> = async (forum) => {
    const inputParams = { ...forum, courseSeq: courseId, s3Files };
    setSubmitLoading(true);

    const files = forum.files;
    const file = !!files?.length ? files[0] : new Blob([]);
    const fileName = !!files?.length ? files[0].name : undefined;
    const formData = new FormData();
    formData.append('files', file, fileName);
    formData.append('data', new Blob([ JSON.stringify(inputParams) ], { type: 'application/json' }));

    try {
      if (mode === 'upload') {
        await uploadForum(formData);
      } else {
        if (forumId) {
          await modifyForum(forumId, formData);
        }
      }

      await mutate();
      setSubmitLoading(false);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
    } catch (e: any) {
      setSubmitLoading(false);
      snackbar(e.message || e.data?.message);
    }
    onClose(true);
  };

  if (open && forumError) return <div>error</div>;
  return (
    <Modal
      action="저장"
      title="토론 등록"
      maxWidth="sm"
      fullWidth
      loading={loading}
      open={open}
      actionLoading={submitLoading}
      onCloseModal={() => onClose(false)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box component="form">
        <FormContainer>
          <FormControl className="form-control">
            <TextField
              {...register('subject', { required: '토론명을 입력해주세요.' })}
              size="small"
              label="토론명"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="subject" as={<FormHelperText error />} />
          </FormControl>

          <FormControl className="form-control">
            <FileUploader
              register={register}
              regName="files"
              onFileChange={handleFileChange}
            >
              <FileUploader.Label>파일 업로드</FileUploader.Label>
            </FileUploader>
            {watchFiles?.length || s3Files?.length
              ? <Chip
                className={chipStyles}
                icon={<ImageOutlinedIcon />}
                label={fileName}
                onDelete={onDeleteFile}
              /> : null
            }
          </FormControl>

          <FormControl className="form-control">
            <TextareaAutosize
              {...register('content')}
              className="text-area"
              placeholder="토론 내용"
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
                  <FormControlLabel value={ProductStatus.APPROVE} control={<Radio />} label="정상" />
                  <FormControlLabel value={ProductStatus.REJECT} control={<Radio />} label="중지" /> </RadioGroup>
              )}
            />
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

    &:not(:last-child) {
      margin-bottom: 30px;
    }

    .text-area {
      width: 100%;
      min-height: 120px;
    }

    .obj-type {
      width: 100%;
      display: flex;
      flex-direction: row;

      .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        > :not(:last-child) {
          margin-bottom: 12px;
        }

        &.text-field {
          width: 100%;

          > * {
            height: 100%;
          }
        }
      }
    }
  }
`;

const chipStyles = css`
  margin-top: 8px;
`;

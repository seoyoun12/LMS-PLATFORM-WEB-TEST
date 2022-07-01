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
import { Forum, modifyForum, uploadForum, useForum } from '@common/api/forum';
import { ProductStatus } from '@common/api/course';
import { FileUploader } from '@components/ui/FileUploader';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';

interface Props {
  open: boolean;
  onClose: (isMutate: boolean) => void;
  forumId?: number | null;
  courseId?: number;
  mode?: 'modify' | 'upload';
}

interface FormType extends Forum {
  files: File[];
}

const defaultValues = {
  status: ProductStatus.APPROVE,
  files: [],
};

export function ForumUploadModal({ open, onClose, forumId, courseId, mode = 'upload' }: Props) {
  const snackbar = useSnackbar();
  const { forum, forumError, mutate } = useForum(Number(forumId));
  const [ submitLoading, setSubmitLoading ] = useState(false);
  const [ isFileDelete, setIsFileDelete ] = useState(false);
  const [ fileName, setFileName ] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
  } = useForm<FormType>({ defaultValues });
  const loading = (open && mode === 'modify' && !forum);

  useEffect(() => {
    if (open) {
      if (mode === 'modify' && forum) {
        reset({ ...forum });
        setFileName(forum.s3Files[0]?.name || null);
      } else {
        reset({ ...defaultValues });
      }
    }
  }, [ mode, forum, open, reset ]);

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
    setIsFileDelete(false);
  };

  const handleDeleteFile = () => {
    resetField('files');
    setFileName(null);
    setIsFileDelete(true);
  };

  const fileHandler = async (files: File[], forum: Forum) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: forum.seq,
        fileType: BbsType.TYPE_FORUM,
        files
      });
    } else {
      if (isFileDelete) {
        await deleteFile({
          fileTypeId: forum.seq,
          fileType: BbsType.TYPE_FORUM,
          fileSeqList: forum.s3Files.map(v => v.seq),
        });
      }
    }
  };

  const onSubmit: SubmitHandler<FormType> = async ({ files, ...forum }) => {
    const inputParams = { ...forum, courseSeq: courseId };
    setSubmitLoading(true);

    try {
      if (mode === 'upload') {
        const forum = await uploadForum(inputParams);
        await fileHandler(files, forum);
      } else {
        if (forumId) {
          await modifyForum(forumId, inputParams);
          await fileHandler(files, forum);
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
            {fileName
              ? <Chip
                sx={{ mt: '8px' }}
                icon={<OndemandVideoOutlinedIcon />}
                label={fileName}
                onDelete={handleDeleteFile} />
              : null
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

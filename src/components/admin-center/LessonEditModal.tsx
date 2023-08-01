import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Backdrop,Box,Button,Chip,FormControl,FormControlLabel,FormHelperText,FormLabel,InputAdornment,Radio,RadioGroup } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { ContentType } from '@common/api/content';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Modal, Spinner } from '@components/ui';
import { Lesson } from '@common/api/lesson';
import { modifyLesson, removeLesson, useLessonList } from '@common/api/adm/lesson';
import TextField from '@mui/material/TextField';
import { ProductStatus } from '@common/api/course';
import { useSnackbar } from '@hooks/useSnackbar';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { useFileUpload } from '@hooks/useChunkFileUpload';
import { FileType } from '@common/api/file';
import { FileUploader } from '@components/ui/FileUploader';
import { BbsType, deleteFile } from '@common/api/adm/file';
import { useDialog } from '@hooks/useDialog';
import router from 'next/router';
import useToggle from '@hooks/useToggle';


interface Props {
  open: boolean;
  handleClose: (isSubmit: boolean) => void;
  lesson?: Lesson;
  error?: any;
}

interface FormType extends Lesson {
  files: File[];
}

const contentTypeOptions = [
  // { value: ContentType.CONTENT_HTML, name: '웹콘텐츠(HTML5)' },
  { value: ContentType.CONTENT_MP4, name: 'mp4' },
  // { value: ContentType.CONTENT_EXTERNAL, name: '외부링크' },
];

const defaultValues = {
  contentType: ContentType.CONTENT_MP4,
  status: ProductStatus.APPROVE,
  files: [],
};

export function LessonEditModal({ open, handleClose, lesson, error }: Props) {
  const snackbar = useSnackbar();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isFileDelete, setIsFileDelete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { handleUpload, handleProgressStatus, uploadPercentage } = useFileUpload();
  const { contentSeq } = router.query;
  const { mutate } = useLessonList(Number(contentSeq));
  const dialog = useDialog();
  const {register, handleSubmit, formState: { errors }, control, reset,watch, resetField, setValue} = useForm<FormType>({ defaultValues });
  const {onToggle: onToggleAddQuizModal, toggle: isAddQuizModalOpen} = useToggle();

  const onInteractionRadioChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    setValue('interaction', value === 'on');
  },[setValue]);
  
  useEffect(() => {
    if (!!lesson && open) {
      reset({ ...lesson });
      setFileName(lesson?.s3Files[0]?.name || null);
    }
  }, [lesson, open, reset]);

  const fileHandler = async (files: File[], lesson: Lesson) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      const file = files[0];
      const fileName = files[0].name;
      await handleUpload({
        dataId: lesson.seq,
        file,
        fileName,
        fileUploadType: FileType.LESSON_FILE,
      });
    } else {
      if (isFileDelete) {
        await deleteFile({
          fileTypeId: lesson.seq,
          fileType: BbsType.TYPE_LESSON,
          fileSeqList: lesson.s3Files.map(v => v.seq),
        });
      }
    }
  };

  // 삭제
  const onRemoveLesson = async (lessonId: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '레슨 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await removeLesson(lessonId);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        handleClose(true);
        await mutate();
      }
    } catch (e) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };
  
  const onSubmit: SubmitHandler<FormType> = async ({ files, ...lessonWatch }) => {
    setSubmitLoading(true);
    const lesson = {
      ...lessonWatch,
      completeTime: Number(lessonWatch.min) * 60 + Number(lessonWatch.sec),
      totalTime: Number(lessonWatch.min) * 60 + Number(lessonWatch.sec),
    };

    try {
      if (fileName) {
        await modifyLesson({ lessonSeq: lesson.seq, lesson });
        await fileHandler(files, lesson);
        const isTrue = await handleProgressStatus();
        if (isTrue) return snackbar({ variant: 'error', message: '업로드실패' });
        setSubmitLoading(false);
        handleClose(true);
        snackbar({ variant: 'success', message: '업로드 완료되었습니다.' });
      } else {
        snackbar({ variant: 'error', message: '파일을 첨부하셔야합니다.' });
        setSubmitLoading(false);
      }
    } catch (e) {
      snackbar({ variant: 'error', message: e.message || e.data?.message });
      setSubmitLoading(false);
    }
  };

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

  if (error) return <div>error</div>;

  return (
    <>
      <Modal
      open={isAddQuizModalOpen}
      onCloseModal={onToggleAddQuizModal}
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
        borderRadius:'10px',
        margin: 'auto',
        background: 'rgba(0,0,0,0.2)',
        
      }}
      fullWidth
      title="퀴즈상태 변경"
      
      >
      <Box 
        sx={{
          width:'100%',
          minHeight:'590px',
          padding: '1rem',
          border: '1px solid red',
          marginTop:'1rem'
        }}
      >
        <Typography fontSize={40} fontWeight={900}>Hello world!!</Typography>
      </Box>
    </Modal>

    <Modal
      // action="저장"
      action={
        <>
          <DeleteBtn
            variant="contained"
            color="warning"
            onClick={() => onRemoveLesson(lesson.seq)}
            size="small"
          >
            삭제
          </DeleteBtn>
          <SubmitBtn
            variant="contained"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
            size="small"
          >
            저장
          </SubmitBtn>
        </>
        }
        title="강의 업로드"
        maxWidth="sm"
        fullWidth
        loading={!lesson}
        open={open}
        actionLoading={submitLoading}
        onCloseModal={() => handleClose(true)}
        onSubmit={handleSubmit(onSubmit)}
      >
      <Box component="form">
        <FormContainer>
          {/* FormControl은 인풋당 하나씩 박는게 아닙니다... 제발요 */}
          <FormControl className="form-control">
            <TextField
              {...register('chapter', { required: '차시를 입력해주세요.' })}
              size="small"
              label="차시"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="chapter" as={<FormHelperText error />} />
            <TextField
              {...register('lessonNm', { required: '강의명을 입력해주세요.' })}
              size="small"
              label="강의명"
              variant="outlined"
            />
            <ErrorMessage
              errors={errors}
              name="contentName"
              as={<FormHelperText error />}
            />
          

          {/* 닌자코드  */}
          {/* <FormControl className="form-control" sx={{ display: 'none' }}>
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
          </FormControl> */}

          
            <FileUploader
              register={register}
              regName="files"
              accept="video/mp4,video/mkv, video/x-m4v,video/*"
              onFileChange={handleFileChange}
            >
              <FileUploader.Label>파일 업로드</FileUploader.Label>
            </FileUploader>
            {fileName ? (
              <Chip
                // sx={{ mt: '8px' }} // 파일 첨부시 여백 생기면서 늘어남. 주석처리. < 이런건 주석을 달지 말고 그냥 지웠으면 좋겠습니다.
                icon={<OndemandVideoOutlinedIcon />}
                label={fileName}
                onDelete={handleDeleteFile}
                sx={{ pl: '5px', ml: '5px', maxWidth: '700px' }}
              />
            ) : null}
          

          
            <CompleteTimeControl>
              <Label variant="body2">학습시간</Label>
              <InputContainer>
                <TextField
                  {...register('min', { required: '강의 명을 입력해주세요.' })}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">분</InputAdornment>,
                  }}
                />
                <TextField
                  {...register('sec', { required: '강의 명을 입력해주세요.' })}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">초</InputAdornment>,
                  }}
                />
              </InputContainer>
            </CompleteTimeControl>
          
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
            <FormLabel focused={false}>상호작용</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="interaction"
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  value={watch().interaction ? 'on' : 'off'}
                  onChange={onInteractionRadioChange}
                >
                  <FormControlLabel
                    value='on'
                    control={<Radio />}
                    label="켬"
                  />
                  <FormControlLabel
                    value='off'
                    control={<Radio />}
                    label="끔"
                  />
                </RadioGroup>
              )}
            />
            {watch().interaction
            ? <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 2,
                  backgroundColor: '#d7d7d7c7',
                  borderRadius: '4px',
                  padding: '1rem'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      boxShadow: '1px 1px 2px #222',
                    }}
                    onClick={onToggleAddQuizModal}
                  >
                    <Typography> + 추가 / 수정 하기 (총 0개)</Typography>
                  </Button>
                </Box>
            </Box>
            : <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
              backgroundColor: '#d7d7d7c7',
              borderRadius: '4px',
              padding: '1rem'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
                <Typography>
                  상호작용이 꺼져있으므로 퀴즈가 나타나지 않습니다.
                </Typography>
              </Box>
            </Box>
            }
          </FormControl>
        </FormContainer>
      </Box>
        
      <Backdrop
        open={submitLoading}
        sx={{ zIndex: 9999, display: 'flex', flexDirection: 'column' }}
      >
        <Spinner fit={true} />
        <Box
          sx={{
            position: 'relative',
            width: '400px',
            height: '25px',
            borderRadius: '8px',
            background: 'white',
          }}
          mt={5}
        >
          <Box
            sx={{
              width: `${uploadPercentage}%`,
              height: '25px',
              background: 'rgb(194,51,51)',
              borderRadius: '8px',
              transition: 'width 0.2s ease-in',
            }}
          />
          <Box
            color={uploadPercentage < 50 ? 'black' : 'white'}
            fontWeight="bold"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              transition: 'color 0.2s ease-in',
            }}
          >
            {uploadPercentage}%
          </Box>
        </Box>
      </Backdrop>
    </Modal>
    </>
  );
}

const FormContainer = styled.div`

  padding-top: 20px;

  .form-control {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
`;

const CompleteTimeControl = styled.div``;

const Label = styled(Typography)`
  padding-bottom: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    width: 40%;
    &:first-of-type {
      margin-right: 12px;
    }
  }
`;

const SubmitBtn = styled(Button)`
  /* margin: 30px 30px 30px 0; */
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DeleteBtn = styled(Button)``;

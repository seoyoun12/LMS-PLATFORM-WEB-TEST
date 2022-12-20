import { YN } from '@common/constant';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Editor as EditorType } from '@toast-ui/react-editor';
import styled from '@emotion/styled';
import '@toast-ui/editor/dist/toastui-editor.css';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { TuiEditor } from '@components/common/TuiEditor';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { css } from '@emotion/css';
import { ErrorMessage } from '@hookform/error-message';
import { FileUploader } from '@components/ui/FileUploader';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import {
  LearningMaterialInput,
  learningMaterialRemove,
  MaterialSubType,
  MaterialType,
} from '@common/api/learningMaterial';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import router from 'next/router';
import { ProductStatus } from '@common/api/course';
import { Spinner } from '@components/ui';

export interface FileArrayType {
  seq?:number; //서버용 seq , 로컬파일은 가지고있지 않기 때문에 ?:
  randomSeq: number; //삭제용 seq , 해당페이지에서 임시로 갖는 seq
  name:string //파일이름.
  file?:File //서버파일은 이미 서버에 있기때문에 가지고 있지않음.
  isServerFile: boolean //해당파일이 서버에서 가져온 파일인지 확인
  
}

interface Props {
  mode?: 'upload' | 'modify';
  learningMaterial?: LearningMaterialInput;
  onHandleSubmit: ({
    learningMaterialInput,
    files,
    serverFilesRemoved
  }: {
    learningMaterialInput: LearningMaterialInput;
    files?: File[];
    serverFilesRemoved?:FileArrayType[]
  }) => void;
  loading: boolean;
}

interface FormType extends LearningMaterialInput {
  files: File[];
}

const defaultValues = {
  materialType: MaterialType.TYPE_BY_AGE,
  materialSubType: MaterialSubType.TYPE_CHILDREN,
  status: ProductStatus.APPROVE,
  files: [],
};

export function LearningMaterialUploadForm({
  mode = 'upload',
  learningMaterial,
  onHandleSubmit,
  loading
}: Props) {
  const editorRef = useRef<EditorType>(null);
  const [fileArray , setFileArray] = useState<FileArrayType[]>()
  const [serverFilesRemoved , setServerFilesRemoved] = useState<FileArrayType[]>()
  const [subType, setSubType] = useState<boolean>(true);
  const [openOrigin, setOpenOrigin] = useState<boolean>(false);
  const [isEducationRoute , setIsEducationRoute] = useState<boolean>(false)
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [openTui, setOpenTui] = useState<boolean>(true);
  const [title , setTitle] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch
  } = useForm<FormType>({ defaultValues });

  useEffect(() => {
    console.log('음??????' , mode , learningMaterial)
    if (mode === 'modify' && !!learningMaterial) {
      reset({ ...learningMaterial });
      const getFiles = learningMaterial.s3Files.map(r=>({seq:r.seq , name:r.name}))
      const setLocalFiles = getFiles.map(r=>{
      const randomSeq = Math.round(Math.random() * 10000);
      return {...r , randomSeq ,isServerFile: true }
      })
      setFileArray(setLocalFiles)
      if (learningMaterial.materialSubType === null) {
        setSubType(false);
        // if (learningMaterial.materialType === 'TYPE_VIDEO') {
        //   setTitle('교육영상')
        //   setIsEducationRoute(true) //다중 파일 업로드 사용여부
        //   console.log('나 되는거 맞아?' )
        // }
      }
      if (learningMaterial.materialType === 'TYPE_VIDEO') {
        setOpenTui(false);
        setOpenOrigin(true);
        setTitle('교육영상')
        setIsEducationRoute(false) 
      }
      if (learningMaterial.materialType === 'TYPE_BY_AGE') {
        setOpenTui(true);
        setTitle('연령별 교수학습 지도안')
        setIsEducationRoute(false) 
      }
      if (learningMaterial.materialType === 'TYPE_EDUCATIONAL') {
        setOpenTui(false);
        setTitle('교육자료')
        setIsEducationRoute(true) 
      }
      if (learningMaterial.materialType === 'TYPE_OTHER_ORGAN') {
        setOpenTui(false);
        setTitle('타기관자료모음')
        setIsEducationRoute(false) 
      }
    }
  }, [mode, learningMaterial, reset]);

  //업로드 상태에서 학습자료 타입 변경시 가지고있던 files 초기화 교육영상쪽은 사라지지않는 버그가 있음.
  useEffect(()=>{
    // if(mode === 'modify'){
    //   const serverFiles = fileArray.filter(r=>r.isServerFile);
    //   setServerFilesRemoved(serverFiles);
    //   return;
    // }
    if(mode === 'upload') setFileArray([]);
  },[watch().materialSubType])

  const onClickOpenSubType = async (e?:React.MouseEvent<HTMLLabelElement>) => {
    setSubType(true); // 서브타입 오픈여부
    setOpenOrigin(false); // url 오픈여부
    setIsEducationRoute(false) //다중 파일 업로드 사용여부
    setValue('materialSubType', MaterialSubType.TYPE_CHILDREN);
  };

  const onClickCloseSubType = async (e?:React.MouseEvent<HTMLLabelElement>) => {
    setSubType(false);
    setOpenOrigin(false);
    setIsEducationRoute(true)
    setValue('materialSubType', null);
    setOpenTui(false);
  };

  const onClickCloseSubTypeAndOpenOrigin = async (e?:React.MouseEvent<HTMLLabelElement>) => {
    setSubType(false);
    setOpenOrigin(true);
    setIsEducationRoute(false) //다중 파일 업로드 사용여부
    setValue('materialSubType', null);
  };

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    if(!isEducationRoute){
      setFileArray([{seq:undefined , randomSeq:32 , name:files[0].name ,file:files[0] , isServerFile:false}]);
      return;
    }
    const processingFile = Array.from(files).map(file=>{
      const randomSeq = Math.round(Math.random() * 10000);
      return {randomSeq , seq:undefined , name: file.name , file:file , isServerFile:false}
    })
    const prevFileArray = fileArray || []
    setFileArray([...prevFileArray , ...processingFile])
  };

  const handleDeleteFile = async ({randomSeq, seq , isServerFile}:{randomSeq:number ,seq?: number , isServerFile: boolean}) => {
    if(isServerFile){
      //삭제하고자 하는 파일이 서버 파일인경우 (기존 s3에 저장된 파일)
      const fileFiltered = fileArray.filter(r=> r.randomSeq !== randomSeq); //삭제한 것 외의 파일
      const fileRemoved = fileArray.filter(r=>r.randomSeq === randomSeq); // 삭제된 하나의 파일
      setFileArray(fileFiltered) 

      const prevServerFilesRemoved = serverFilesRemoved || []
      setServerFilesRemoved([...prevServerFilesRemoved ,...fileRemoved]) //삭제된 서버파일
    }else{
      //삭제하고자 하는 파일이 로컬추가 파일인경우(새로운 파일)
      const fileFiltered = fileArray.filter(r=>r.randomSeq !== randomSeq)
      setFileArray(fileFiltered)

    }
  };

  // 삭제
  const onClickRemoveLM = async (seq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '학습자료 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await learningMaterialRemove(seq);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        router.push(`/admin-center/learning-material`);
        // await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const onSubmit: SubmitHandler<FormType> = async (
    {  ...learningMaterial },
    event
  ) => {
    event?.preventDefault();

    // 연령별 교수학습 지도안을 제외한 교육자료, 교육영상, 타기관자료모음에서는 tui 비활성화.
    // if (!editorRef.current) return;
    const markdownContent = editorRef.current?.getInstance().getMarkdown() || '';
    const learningMaterialInput = {
      ...learningMaterial,
      content: markdownContent,
    };
    //로컬에서 사용자가 추가한 파일 배열
    const localFileAdded = fileArray.filter(r=>!r.isServerFile)
    const fileArrayConvert = localFileAdded.map(r=>r.file)

    //파일 업로드 할 경우 백앤드에서 파일 크기가 크면 s3업로드가 오래 걸립니다. 그래서 업로드하고 바로 확인하면 파일리스트에 안뜰수 있습니다.
    onHandleSubmit({ learningMaterialInput, files: fileArrayConvert ,serverFilesRemoved });
  };

  return (
    <Container>
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={boxStyles}
      >
        {mode === 'upload' ? 
        <FormControl className={pt20}>
          <FormLabel focused={false}>학습자료 타입</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="materialType"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value={MaterialType.TYPE_BY_AGE}
                  control={<Radio />}
                  label="연령별 교수학습 지도안"
                  onClick={() => {
                    onClickOpenSubType();
                    setOpenTui(true);
                  }}
                />
                <FormControlLabel
                  value={MaterialType.TYPE_EDUCATIONAL}
                  control={<Radio />}
                  label="교육자료"
                  onClick={() => {
                    onClickCloseSubType();
                    setOpenTui(false);
                  }}
                />
                <FormControlLabel
                  value={MaterialType.TYPE_VIDEO}
                  control={<Radio />}
                  label="교육영상"
                  onClick={() => {
                    onClickCloseSubTypeAndOpenOrigin();
                    setOpenTui(false);
                  }}
                />
                <FormControlLabel
                  value={MaterialType.TYPE_OTHER_ORGAN}
                  control={<Radio />}
                  label="타기관자료모음"
                  onClick={() => {
                    onClickOpenSubType();
                    setOpenTui(false);
                  }}
                />
              </RadioGroup>
            )}
          />
        </FormControl> :
        <Box sx={{paddingBottom:'24px' , fontWeight:'bold' , fontSize:'18px'}}>{title} 수정</Box>
        }

        {/* {mode === 'upload' && subType ? ( */}
        {subType ? (
          <FormControl className={pt20}>
            <FormLabel focused={false}>수강생 타입</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="materialSubType"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={MaterialSubType.TYPE_CHILDREN}
                    control={<Radio />}
                    label="어린이"
                  />
                  <FormControlLabel
                    value={MaterialSubType.TYPE_TEENAGER}
                    control={<Radio />}
                    label="청소년"
                  />
                  <FormControlLabel
                    value={MaterialSubType.TYPE_ELDERLY}
                    control={<Radio />}
                    label="어르신"
                  />
                  <FormControlLabel
                    value={MaterialSubType.TYPE_SELF_DRIVING}
                    control={<Radio />}
                    label="자가운전자"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        ) : null}

        <InputContainer>
          <FormControl className={textField}>
            <TextField
              {...register('title', { required: '학습자료 제목을 입력해주세요.' })}
              size="small"
              label="학습자료 제목"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="subject" as={<FormHelperText error />} />
          </FormControl>
        </InputContainer>

        {openOrigin ? (
          <FormControl className={textField}>
            <TextField
              {...register('origin', { required: 'URL을 입력해주세요.' })}
              size="small"
              label="URL"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="subject" as={<FormHelperText error />} />
          </FormControl>
        ) : null}

        {openTui ? (
          <TuiEditor
            initialValue={(learningMaterial && learningMaterial.content) || ' '}
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
            autofocus={false}
          />
        ) : null}

        <FormLabel sx={{ mt: 2, mb: 1 }}>첨부파일업로드</FormLabel>
        <div className="board-uploader">
          <FileUploader
            register={register}
            regName="files"
            onFileChange={handleFileChange}
          >
            {}
          </FileUploader>
          {fileArray ? 
          // (
          //   <Chip
          //     sx={{ mt: '8px' }}
          //     icon={<OndemandVideoOutlinedIcon />}
          //     label={fileName}
          //     onDelete={handleDeleteFile}
          //   />
          // ) 
          fileArray.map(r=>
            <Chip
            sx={{ mt: '8px' }}
            icon={<OndemandVideoOutlinedIcon />}
            label={r.name}
            onDelete={()=>handleDeleteFile({ randomSeq:r.randomSeq , seq:r.seq , isServerFile:r.isServerFile})}
            />
            )
          : null}
        </div>

        <FormControl className={pt20}>
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
                />{' '}
              </RadioGroup>
            )}
          />
        </FormControl>

        {/* <FormControl className={pt20}>
          <FormLabel focused={false}>공개여부</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="status"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value={YN.YES} control={<Radio />} label="공개Y" />
                <FormControlLabel value={YN.NO} control={<Radio />} label="공개N" />
              </RadioGroup>
            )}
          />
        </FormControl> */}
        <Box color='#2cb8e2'>교육 자료 외 게시판은 단일파일 업로드하셔야 합니다. 여러파일 업로드시 처음 파일만 인식합니다.</Box>
        {mode === 'modify' && 
        <Box color='#f87272' >서버에서 파일 업로드중이여서 올린 파일이 안보일 수 있습니다. 조금만 기다리시고 새로고침 해주세요.</Box>}
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
              onClick={() => onClickRemoveLM(learningMaterial.seq)}
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

  .form-control {
    margin: 12px auto 12px 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  .thumbnail-uploader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 36px;

    .subtitle {
      margin-bottom: 8px;
    }
  }
`;

const ButtonBox = styled(Box)`
  margin: 20px 0 20px 0;
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

const textField = css`
  margin-bottom: 20px;
`;

const boxStyles = css`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const pt20 = css`
  margin-bottom: 20px;
  /* padding-top: 20px; */
`;

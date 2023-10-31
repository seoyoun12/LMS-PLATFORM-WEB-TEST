import { BbsType, uploadFile } from '@common/api/adm/file';
import { BannerRes,bannerTypeEnums,BannerTypeEnums,createBannerAdm } from '@common/api/banner';
import { ProductStatus } from '@common/api/course';
import { FileUploader } from '@components/ui/FileUploader';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box,Button,Chip,FormControl,FormControlLabel,FormLabel,MenuItem,Radio,RadioGroup,Select,TextareaAutosize,TextField,Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import { ko } from 'date-fns/locale';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { useRouter } from 'next/router';
import { Spinner } from '@components/ui';

interface FormType {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  status: ProductStatus;
  toUrl: string;
  files: File[];
  bannerTypeEnums: BannerTypeEnums;
}

const defaultValues = {
  status: ProductStatus.APPROVE,
  files: [],
  startDate: dateFormat(new Date(), 'yyyy-mm-dd'),
  endDate: dateFormat(new Date(), 'yyyy-mm-dd'),
  bannerTypeEnums: BannerTypeEnums.BANNER_TYPE_TRANSPORT_WORKER,
};

const colors = [

]

export function BannerUpload() {
  const snackbar = useSnackbar();
  const router = useRouter();
  // const editorRef = useRef<EditorType>(null);
  const [isFileDelete, setIsFileDelete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    resetField,
    setValue,
    watch,
  } = useForm<FormType>({ defaultValues });

  const handleBannerTypeEnums = async (e) => {
    setValue('bannerTypeEnums', e.target.value);
  };

  const fileHandler = async (files: File[], bannerSeq: number) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: bannerSeq,
        fileType: BbsType.TYPE_BANNER,
        files,
      });
    }
  };

  const onSubmit: SubmitHandler<FormType> = async ({ files, ...rest }, e) => {
    if (rest.content.includes('script') || rest.title.includes('script'))
      return snackbar({
        variant: 'error',
        message:
          '"script"단어가 포함되어있어 수정이 불가능합니다. 해당 단어를 제거해주세요',
      });
    try {
      setLoading(true);
      const { data }: { data: BannerRes } = await createBannerAdm(rest);
      await fileHandler(files, data.seq);
      // console.log('submit data : ', data);
      snackbar({ variant: 'success', message: '성공적으로 완료되었습니다.' });
      router.push(`/admin-center/banner`);
    } catch (e) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
    setIsFileDelete(false);
  };

  const handleDeleteFile = async () => {
    if (watch().files.length < 0 || !fileName) return;
    resetField('files');
    setFileName(null);
    setIsFileDelete(true);
    snackbar({ variant: 'success', message: 'img delete successful' });
  };

  return (
    <BannnerUploadContainer>
      <Box className="form-box" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" fontWeight="bold">
          배너 등록
        </Typography>
        <FormControl>
          <Select
            sx={{ width: '37.5%;' }}
            size="small"
            labelId="bannerTypeEnums"
            id="bannerTypeEnums"
            placeholder="교육타입 선택"
            value={watch().bannerTypeEnums || ''}
            onChange={handleBannerTypeEnums}
          >
            {bannerTypeEnums.map(item => (
              <MenuItem key={item.type} value={item.type}>
                {item.ko}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{width:'100%',display:'flex',justifyContent:'space-between',gap: '12px'}}>
          <Box display="flex" flexDirection="column" gap="4px" sx={{flex:1}}>
            
            <textarea
              placeholder="배너제목"
              style={{ width:'100%', minHeight: '70px', fontSize: '24px' }}
              {...register('title', { required: '콘텐츠를 입력해주세요.' })}
              spellCheck={false}
            />

            <textarea
              placeholder="콘텐츠 내용"
              style={{ width:'100%', minHeight: '260px' }}
              {...register('content', { required: '콘텐츠를 입력해주세요.' })}
              spellCheck={false}
            />

          </Box>

          <SlideInfo>
            <Box
              fontSize="24px"
              fontWeight="bold"
              sx={{flex:1}}
              >
              {watch()
                .title?.split('\n')
                .map((item, idx) => {
                  if (idx > 1) return;
                  return <div key={idx} dangerouslySetInnerHTML={{ __html: item }} />;
                })}
            </Box>

            <Box
              sx={{flex:1}}
              >
              {watch()
                .content?.split('\n')
                .map((item, idx) => {
                  if (idx > 8) return;
                  return <div key={idx} dangerouslySetInnerHTML={{ __html: item }} />;
                })}
            </Box>
            
          </SlideInfo>
        </Box>
        <Typography fontWeight="bold" color="red" fontSize="14px">
          콘텐츠 내용은 해당 출력박스의 일정크기를 넘어가면 맨 아래내용은 잘립니다.
        </Typography>
        <Typography fontWeight="bold" fontSize="14px">
          {`<span style='color:색상' >텍스트</span>`}으로 색을 입힐수
          있습니다.(ex)color:red , color:blue , color:#c4c4c4 .... )
        </Typography>
        <Typography fontWeight="bold" fontSize="14px">
          {`<a href="사이트 주소" style='color:색상' >링크을 넣을 텍스트</a>`}으로 링크를
          줄수 있습니다.
        </Typography>
        <Typography fontWeight="bold">게시 시작날짜</Typography>
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          showPopperArrow={false}
          minDate={new Date()}
          customInput={<TextField InputProps={{ endAdornment: <CalendarMonthIcon /> }} />}
          selected={new Date(watch().startDate)}
          onChange={date =>
            setValue(
              'startDate',
              date ? dateFormat(date, 'yyyy-mm-dd') : dateFormat(new Date(), 'yyyy-mm-dd')
            )
          }
        />
        <Typography fontWeight="bold">게시 종료날짜</Typography>
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          showPopperArrow={false}
          minDate={new Date()}
          customInput={<TextField InputProps={{ endAdornment: <CalendarMonthIcon /> }} />}
          selected={new Date(watch().endDate)}
          // popperPlacement="right"
          onChange={date =>
            setValue(
              'endDate',
              date ? dateFormat(date, 'yyyy-mm-dd') : dateFormat(new Date(), 'yyyy-mm-dd')
            )
          }
        />
        {/* <TextField
          placeholder="페이지 이동 url"
          {...register('toUrl', { required: '입력해주세요.' })}
        /> */}
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
        <FileUploader register={register} regName="files" onFileChange={handleFileChange}>
          <FileUploader.Label>배너 이미지 업로드</FileUploader.Label>
        </FileUploader>
        {fileName ? (
          <Chip
            // sx={{ mt: '8px' }} // 파일 첨부시 여백 생기면서 늘어남. 주석처리.
            icon={<OndemandVideoOutlinedIcon />}
            label={fileName}
            onDelete={handleDeleteFile}
            sx={{ pl: '5px', ml: '5px', maxWidth: '700px' }}
          />
        ) : null}
        <ButtonBox>
          <SubmitBtn variant="contained" type="submit" disabled={loading}>
            {loading ? <Spinner fit={true} /> : '등록'}
          </SubmitBtn>
        </ButtonBox>
      </Box>
    </BannnerUploadContainer>
  );
}

const BannnerUploadContainer = styled(Box)`
  .form-box {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  textarea {
    resize: none;
  }
`;
const SubmitBtn = styled(Button)`
  width: 15%;
  float: right;
  margin: 0 0 0 5px;
`;
const ButtonBox = styled(Box)`
  margin: 120px 0 20px 0;
`;

const SlideInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  background: #9b9b9b;
  width:50%;
  
  h1 {
    font-size: 34px;
    font-weight: 900;
    word-break: keep-all;
    padding: 16px 0 8px 0;
  }
  p {
    font-size: 16px;
    padding: 8px 0;
  }
`;
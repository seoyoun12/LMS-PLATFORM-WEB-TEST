import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
import {
  BannerRes,
  getSingleBannerAdm,
  modifyBannerAdm,
  removeBannerAdm,
  useSingleBannerAdm,
} from '@common/api/banner';
import { ProductStatus } from '@common/api/course';
import { FileUploader } from '@components/ui/FileUploader';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import { ko } from 'date-fns/locale';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useRouter } from 'next/router';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { useDialog } from '@hooks/useDialog';
import { Spinner } from '@components/ui';

interface FormType {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  status: ProductStatus;
  toUrl: string;
  files: File[];
}

const defaultValues = {
  status: ProductStatus.APPROVE,
  files: [],
  startDate: dateFormat(new Date(), 'yyyy-mm-dd'),
  endDate: dateFormat(new Date(), 'yyyy-mm-dd'),
};

export function BannerModify() {
  const snackbar = useSnackbar();
  const router = useRouter();
  const { bannerId } = router.query;
  const [isFileDelete, setIsFileDelete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSeq, setFileSeq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const dialog = useDialog();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
    setValue,
    watch,
  } = useForm<FormType>({ defaultValues });
  // const { data, error, mutate } = useSingleBannerAdm(Number(bannerId));

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

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getSingleBannerAdm(Number(bannerId));
        setValue('title', data.title);
        setValue('content', data.content);
        setValue('startDate', dateFormat(data.startDate, 'yyyy-mm-dd'));
        setValue('endDate', dateFormat(data.endDate, 'yyyy-mm-dd'));
        setValue('toUrl', data.toUrl);
        setValue('status', data.status);

        setFileName(data.s3Files[0]?.name || null);
        setFileSeq(data.s3Files[0].seq);
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<FormType> = async ({ files, ...rest }, e) => {
    try {
      const { data }: { data: BannerRes } = await modifyBannerAdm(Number(bannerId), rest);
      if (watch().files.length !== 0) {
        if (fileSeq)
          await deleteFile({
            fileType: BbsType.TYPE_BANNER,
            fileTypeId: Number(bannerId),
            fileSeqList: [fileSeq],
          });
        await fileHandler(files, data.seq);
      }
      snackbar({ variant: 'success', message: '성공적으로 완료되었습니다.' });
      router.push(`/admin-center/banner`);
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const handleFileChange = async (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
    setIsFileDelete(false);
  };

  const handleDeleteFile = async () => {
    resetField('files');
    setFileName(null);
    setIsFileDelete(true);
  };

  // 삭제
  const onRemoveBanner = async (bannerSeq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await removeBannerAdm(bannerSeq);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        router.push(`/admin-center/banner`);
        // mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  return (
    <BannnerUploadContainer>
      <Box className="form-box" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" fontWeight="bold">
          배너 변경
        </Typography>
        <TextField
          placeholder="배너 제목"
          {...register('title', { required: '배너이름을 입력해주세요.' })}
        />
        <TextField
          placeholder="콘텐츠 내용"
          {...register('content', { required: '콘텐츠를 입력해주세요.' })}
        />{' '}
        <Typography fontWeight="bold">게시 시작날짜</Typography>
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          showPopperArrow={false}
          minDate={new Date()}
          customInput={<TextField InputProps={{ endAdornment: <CalendarMonthIcon /> }} />}
          selected={new Date(watch().startDate)}
          onSelect={() => {}}
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
          onSelect={() => {}}
          // popperPlacement="right"
          onChange={date =>
            setValue(
              'endDate',
              date ? dateFormat(date, 'yyyy-mm-dd') : dateFormat(new Date(), 'yyyy-mm-dd')
            )
          }
        />
        {/* <TextField placeholder="페이지 이동 url" {...register('toUrl', { required: '입력해주세요.' })} /> */}
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
          <FileUploader.Label>파일업로드</FileUploader.Label>
        </FileUploader>
        {fileName ? (
          <Chip
            sx={{ mt: '8px' }}
            icon={<OndemandVideoOutlinedIcon />}
            label={fileName}
            onDelete={handleDeleteFile}
          />
        ) : null}
        <SubmitBtn variant="contained" type="submit">
          업로드
        </SubmitBtn>
        <DeleteBtn
          color="warning"
          variant="contained"
          onClick={() => onRemoveBanner(Number(bannerId))}
          disabled={loading}
        >
          {loading ? <Spinner fit={true} /> : '삭제'}
        </DeleteBtn>
        <Typography fontWeight="bold" sx={{ color: 'red' }}>
          배너 수정시 상태 , 게시종료일자를 모두 업데이트 해야합니다!
        </Typography>
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
`;
const SubmitBtn = styled(Button)`
  /* margin: 30px 30px 30px 0; */
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DeleteBtn = styled(Button)`
  /* background-color: #dd0000; */
`;

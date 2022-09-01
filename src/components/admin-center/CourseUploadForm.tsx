import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as EditorType } from '@toast-ui/react-editor';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { ProductStatus, CourseRes, CourseInput } from '@common/api/course';
import { YN } from '@common/constant';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ContentType } from '@common/api/content';
import { css, cx } from '@emotion/css';
import { ErrorMessage } from '@hookform/error-message';
import { FileUploader } from '@components/ui/FileUploader';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import {
  courseReg,
  courseCategory,
  courseSubCategory,
} from '@layouts/Calendar/CalendarBody/CalendarBody';
import {
  courseCategoryType,
  courseType,
  courseSubCategoryType,
} from '@common/api/courseClass';
import Image from 'next/image';
import { Spinner } from '@components/ui';

interface Props {
  mode?: 'upload' | 'modify';
  course?: CourseInput;
  // onHandleSubmit: ({ courseInput, files, courseSeq }: {
  onHandleSubmit: ({
    courseInput,
    files,
    isFileDelete,
    setLoading,
  }: {
    courseInput: CourseInput;
    files: File[];
    isFileDelete: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    // courseSeq?: number
  }) => void;
}

interface FormType extends CourseInput {
  files: File[];
}

const defaultValues = {
  // contentType: ContentType.CONTENT_MP4,
  status: ProductStatus.APPROVE,
  displayYn: YN.YES,
  files: [],
};

export function CourseUploadForm({ mode = 'upload', course, onHandleSubmit }: Props) {
  // const editorRef = useRef<EditorType>(null);
  const [isFileDelete, setIsFileDelete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);

  const [courseCategoryType, setCourseCategoryType] = useState<courseCategoryType | null>(
    null
  ); //교육과정
  const [courseSubCategoryType, setCourseSubCategoryType] =
    useState<courseSubCategoryType | null>(null); //교육과정
  const [courseType, setCourseType] = useState<courseType | null>(null); //교육과정\
  const [fileImage, setFileImage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    resetField,
  } = useForm<FormType>({ defaultValues });

  // Select 박스 초깃값 설정.
  useEffect(() => {
    if (course?.courseType) setCourseType(course.courseType);
  }, []);

  useEffect(() => {
    if (mode === 'modify' && !!course) {
      reset({ ...course });
      setFileName(course.s3Files[0]?.name || null);
    }
  }, [mode, course, reset]);

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
    setThumbnail(URL.createObjectURL(files[0]));
    setIsFileDelete(false);
  };

  const handleDeleteFile = () => {
    resetField('files');
    setFileName(null);
    setIsFileDelete(true);
  };

  const onSubmit: SubmitHandler<FormType> = async ({ files, ...course }, event) => {
    event?.preventDefault();
    // if (!editorRef.current) return;

    // const markdownContent = editorRef.current.getInstance().getMarkdown();
    const courseInput = {
      ...course,
      courseCategoryType: courseCategory[0].type, //보수일반
      courseSubCategoryType: courseSubCategory[0].type, //버스(백에서 자동으로 여객으로 인식)
      courseType,
      // content1: markdownContent,
    };
    setLoading(true);
    onHandleSubmit({ courseInput, files, isFileDelete, setLoading });
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
        <InputContainer>
          <FormControl fullWidth className="courseUploadInputBox">
            <InputLabel>과정분류</InputLabel>
            <Select
              labelId="courseType"
              id="courseType"
              // value={courseType}
              onChange={e => {
                setCourseType(
                  courseReg.filter(cate => cate.type === e.target.value)[0].type
                );
              }}
              value={courseType || ''}
              label="과정분류"
            >
              {courseReg.map(item => (
                <MenuItem key={item.type} value={item.type}>
                  {item.ko}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className="courseUploadInputBox">
            {/* <FormControlLabel></FormControlLabel> */}
            <InputLabel>교육분류</InputLabel>
            <Select
              labelId="courseCategory"
              id="courseCategory"
              // value={courseCategoryType || ''}
              onChange={e => {
                setCourseCategoryType(
                  courseCategory.filter(cate => cate.type === e.target.value)[0].type
                );
              }}
              value={courseCategory[0].type}
              disabled
              label="교육분류"
            >
              <MenuItem value={courseCategory[0].type}>{courseCategory[0].ko}</MenuItem>
              {courseCategory.map(item => (
                <MenuItem key={item.type} value={item.type}>
                  {item.ko}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth className="courseUploadInputBox">
            <InputLabel>업종</InputLabel>
            <Select
              labelId="courseSubCategoryType"
              id="courseSubCategoryType"
              // value={courseSubCategoryType}
              onChange={e => {
                setCourseSubCategoryType(
                  courseSubCategory.filter(cate => cate.type === e.target.value)[0].type
                );
              }}
              disabled
              value={courseSubCategory[0].type}
              label="업종"
            >
              <MenuItem value={courseSubCategory[0].type}>
                {courseSubCategory[0].ko}
              </MenuItem>
              {/* {courseSubCategory.map(item => (
                <MenuItem key={item.type} value={item.type}>
                  {item.ko}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>

          <FormControl className={textField}>
            <TextField
              {...register('courseName', { required: '과정 명을 입력해주세요.' })}
              size="small"
              label="과정명"
              variant="outlined"
            />
            <ErrorMessage
              errors={errors}
              name="courseName"
              as={<FormHelperText error />}
            />
          </FormControl>

          <div className="thumbnail-uploader">
            <FormLabel sx={{ mt: 1, mb: 1 }}>썸네일 이미지</FormLabel>
            <FileUploader
              register={register}
              regName="files"
              onFileChange={handleFileChange}
              // onFileChange={saveFileImage}
            >
              {/* <ThumbnailImg>
                {course.s3Files ? (
                  <Image
                    className="thumbnailImg"
                    src={course.s3Files[0].path} // course.courseFile
                    layout="responsive"
                    width="100%"
                    height="56.25"
                  />
                ) : null}
              </ThumbnailImg> */}
            </FileUploader>

            {fileName ? (
              <Chip
                sx={{ mt: '8px' }}
                icon={<OndemandVideoOutlinedIcon />}
                label={fileName}
                onDelete={handleDeleteFile}
              />
            ) : null}
          </div>
          <Box>
            이미지파일 확장자는
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              {' '}
              jpg, jpeg, png, gif, bmp
            </span>
            만 사용가능합니다. 이미지 사이즈는
            <span style={{ color: 'red', fontWeight: 'bold' }}>16:9</span>
            비율로 올려주셔야 합니다.
          </Box>

          <FormLabel sx={{ mt: 1, mb: 1 }}>미리보기</FormLabel>
          <ThumbnailImg>
            {course?.s3Files ? (
              <Image
                className="thumbnailImg"
                src={course.s3Files[0]?.path || ''} // course.courseFile
                layout="fill"
              />
            ) : (
              <Image src={thumbnail} layout="fill" />
            )}
          </ThumbnailImg>
        </InputContainer>

        <FormControl className={cx(textField, lessonTime)}>
          <TextField
            {...register('lessonTime', { required: '교육 시간을 입력해주세요.' })}
            size="small"
            label="교육 시간"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">시간</InputAdornment>,
            }}
          />
          <ErrorMessage errors={errors} name="lessonTime" as={<FormHelperText error />} />
        </FormControl>

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

        <FormControl className={pt20}>
          <FormLabel focused={false}>과정 보이기</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="displayYn"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value={YN.YES} control={<Radio />} label="보이기" />
                <FormControlLabel value={YN.NO} control={<Radio />} label="숨김" />
              </RadioGroup>
            )}
          />
        </FormControl>

        <SubmitBtn variant="contained" type="submit" disabled={loading}>
          {loading ? (
            <Spinner fit={true} />
          ) : mode === 'upload' ? (
            '업로드하기'
          ) : (
            '수정하기'
          )}
        </SubmitBtn>
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

  .courseUploadInputBox {
    margin-bottom: 20px;
  }

  .thumbnail-uploader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 16px;

    .subtitle {
      margin-bottom: 8px;
    }
  }
`;

const SubmitBtn = styled(Button)`
  margin: 30px 30px 30px 0;
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
  padding-top: 20px;
`;

const lessonTime = css`
  width: 30%;
  margin-top: 20px;
`;
const ThumbnailImg = styled.div`
  padding-bottom: 30px;
  position: relative;
  width: 500px;
  height: calc((500px / 16) * 9);
  margin: auto;
`;

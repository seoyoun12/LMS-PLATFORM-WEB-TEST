import { courseTrafficRemove } from "@common/api/adm/course-traffic";
import {
  ProvincialBoardResponseDto,
  ProvincialBoardSaveRequestDto,
} from "@common/api/Api";
import { useDialog } from "@hooks/useDialog";
import { useSnackbar } from "@hooks/useSnackbar";
import router from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { css } from "@emotion/css";
import { Spinner } from "@components/ui";
import { ErrorMessage } from "@hookform/error-message";
import { FileUploader } from "@components/ui/FileUploader";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import { ProductStatus } from "@common/api/course";

interface Props {
  mode?: "upload" | "modify";
  courseTraffic?: ProvincialBoardResponseDto;
  onHandleSubmit: ({
    courseTrafficInput,
    files,
    isFileDelete,
    setLoading,
  }: {
    courseTrafficInput: ProvincialBoardSaveRequestDto;
    files: File[];
    isFileDelete: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void;
}

interface FormType extends ProvincialBoardSaveRequestDto {
  files: File[];
}

const defaultValues = {
  status: ProductStatus.APPROVE,

  files: [],
};

export function CourseTrafficUploadForm({
  mode = "upload",
  courseTraffic,
  onHandleSubmit,
}: Props) {
  const [isFileDelete, setIsFileDelete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const dialog = useDialog();
  const snackbar = useSnackbar();
  const [fileImage, setFileImage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
    resetField,
  } = useForm<FormType>({ defaultValues });

  ////

  useEffect(() => {
    if (mode === "modify" && !!courseTraffic) {
      reset({ ...courseTraffic });
      setFileName(courseTraffic.s3Files[0]?.name || null);
    }
  }, [mode, courseTraffic, reset]);

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
    setThumbnail(URL.createObjectURL(files[0]));
    setIsFileDelete(false);
  };

  const handleDeleteFile = () => {
    resetField("files");
    setFileName(null);
    setIsFileDelete(true);
  };

  // 삭제
  const onClickRemoveCourseTraffic = async (seq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: "과정 삭제하기",
        description: "정말로 삭제하시겠습니까?",
        confirmText: "삭제",
        cancelText: "취소",
      });
      if (dialogConfirmed) {
        await courseTrafficRemove(seq);
        snackbar({ variant: "success", message: "성공적으로 삭제되었습니다." });
        router.push(`/admin-center/course`);
      }
    } catch (e: any) {
      snackbar({ variant: "error", message: e.data.message });
    }
  };

  const onSubmit: SubmitHandler<FormType> = async (
    { files, ...courseTraffic },
    event
  ) => {
    event?.preventDefault();

    const courseTrafficInput = {
      ...courseTraffic,
    };
    setLoading(true);
    onHandleSubmit({ courseTrafficInput, files, isFileDelete, setLoading });
  };

  ////
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
            <InputLabel>타입1</InputLabel>
            <Select value={""} label="과정분류"></Select>
          </FormControl>
          <FormControl fullWidth className="courseUploadInputBox">
            <InputLabel>타입1</InputLabel>
            <Select value={""} label="과정분류"></Select>
          </FormControl>

          <FormControl fullWidth className="courseUploadInputBox">
            <InputLabel>타입3</InputLabel>
            <Select
              labelId="courseTrafficType"
              id="courseTrafficType"
              value={""}
              label=""
            >
              <MenuItem>1</MenuItem>
              <MenuItem>2</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={textField}>
            <TextField
              {...register("title", {
                required: "과정 명을 입력해주세요.",
              })}
              size="small"
              label="과정명"
              variant="outlined"
            />
            <ErrorMessage
              errors={errors}
              name="courseTrafficTitle"
              as={<FormHelperText error />}
            />
          </FormControl>

          <div className="thumbnail-uploader">
            <FormLabel sx={{ mt: 1, mb: 1 }}>썸네일 이미지</FormLabel>
            <FileUploader
              register={register}
              regName="files"
              onFileChange={handleFileChange}
              accept=".jpg, .jpeg, .png"
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
                sx={{ mt: "8px" }}
                icon={<OndemandVideoOutlinedIcon />}
                label={fileName}
                onDelete={handleDeleteFile}
              />
            ) : null}
          </div>
          <Box>
            이미지파일 확장자는
            <span style={{ color: "red", fontWeight: "bold" }}>
              {" "}
              jpg, jpeg, png, gif, bmp
            </span>
            만 사용가능합니다. 이미지 사이즈는
            <span style={{ color: "red", fontWeight: "bold" }}>16:9</span>
            비율로 올려주셔야 합니다.
          </Box>

          <FormLabel sx={{ mt: 1, mb: 1 }}>미리보기</FormLabel>
          <ThumbnailImg>
            {/* {courseTraffic?.s3Files ? (
              <Image
                className="thumbnailImg"
                src={courseTraffic.s3Files[0]?.path || ""}
                layout="fill"
              />
            ) : (
              <Image src={thumbnail} layout="fill" />
            )} */}
          </ThumbnailImg>
        </InputContainer>

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
                />{" "}
              </RadioGroup>
            )}
          />
        </FormControl>

        <ButtonBox>
          <SubmitBtn variant="contained" type="submit" disabled={loading}>
            {loading ? (
              <Spinner fit={true} />
            ) : mode === "upload" ? (
              "업로드하기"
            ) : (
              "수정하기"
            )}
          </SubmitBtn>
          {mode === "upload" ? (
            ""
          ) : (
            <DeleteBtn
              color="warning"
              variant="contained"
              onClick={() => onClickRemoveCourseTraffic(courseTraffic.seq)}
              disabled={loading}
            >
              {loading ? <Spinner fit={true} /> : "삭제"}
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

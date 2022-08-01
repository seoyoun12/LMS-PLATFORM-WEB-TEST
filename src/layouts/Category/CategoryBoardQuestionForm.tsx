import { ContentType } from "@common/api/content";
import { QnaInput, QnaType } from "@common/api/qna";
import { MemberType } from "@common/api/user";
import { YN } from "@common/constant";
import { FileUploader } from "@components/ui/FileUploader";
import { useDialog } from "@hooks/useDialog";
import { useInput } from "@hooks/useInput";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextareaAutosize,
  TextField,
  Checkbox,
  Typography,
  Button,
  Chip,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';


const questionTypeList = [
  { type: "회원가입/로그인", enType: "TYPE_SIGNUP_OR_SIGNIN" },
  { type: "교육/수료", enType: "TYPE_EDU_OR_COMPLETE" },
  { type: "홈페이지/앱", enType: "TYPE_WEB_OR_APP" },
  { type: "기타", enType: "TYPE_ETC" },
];

const emailList = [
  { email: "직접입력", isHandmade: true },
  { email: "naver.com", isHandmade: false },
  { email: "gamil.com", isHandmade: false },
  { email: "daum.net", isHandmade: false },
];

const phoneList = ["010", "032", "02", "031"];

interface Props {
  memberType: MemberType | undefined;
  mode? : 'upload';
  qna? : QnaInput;
  onHandleSubmit: ({ qnaInput, files, qnaSeq, isFileDelete } :{
    qnaInput: QnaInput;
    files: File[];
    isFileDelete: boolean;
    qnaSeq?: number;
  }) => void
}

interface FormType extends QnaInput {
  files: File[];
}

const defaultValues = {
  files: [],
};


export function CategoryBoardQuestionForm({ memberType, mode = "upload", qna, onHandleSubmit }: Props) {
  const [ isFileDelete, setIsFileDelete ] = useState(false);
  const [ fileName, setFileName ] = useState<string | null>(null);

  const [ phone01, setPhone01 ] = useState("010");
  const [ phone02, setPhone02 ] = useState("");
  const [ phone03, setPhone03 ] = useState("");

  
  // input 숫자

  // const { phoneNum, setPhoneNum } = useState();

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target
  //   // if (value.length === 4) {
  //     const onlyNumber = value.replace(/[^0-9]/g, '')
  //     setPhoneNum(onlyNumber)
  //   // }
  //   console.log("setPhoneNum : ", setPhoneNum);
  // }

  const onChangePhoneNum01 = (e: any) => {
    setPhone01(e.target.value)
  }
  console.log("폰앞자리 : ", phone01);
  
  const onChangePhoneNum02 = (e: any) => {
    setPhone02(e.target.value)
  }
  const onChangePhoneNum03 = (e: any) => {
    setPhone03(e.target.value)
  }

  // select
  const [ questionType, setQuestionType ] = useState<QnaType>(QnaType.TYPE_SIGNUP_OR_SIGNIN);

  const handleSelectChange = (e: any) => {
    setQuestionType(e.target.value);
  }
  // console.log("타입 : ", questionType);

  const [smsChecked, setSmsChecked] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField
  } = useForm<FormType>({ defaultValues });

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

  const onSubmit: SubmitHandler<FormType> = async ({files, ...qna }, event) => {
    event?.preventDefault();
    const qnaInput = {
      ...qna, phone : phone01 + phone02 + phone03, type : questionType
    };
    console.log("서브밋 안의 questionType : ", questionType)
    console.log("파일 : ", files);
    onHandleSubmit({ qnaInput, files, isFileDelete });
  };



  return (

    <Box
      component="form"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      // className={boxStyles}
    >

      <TableContainer sx={{ width: "100%" }}>
        <TableBody sx={{ display: "table", width: "100%" }}>
          <TableRow>
            <TableCellLeft align="center">전화번호</TableCellLeft>

            <TableCellRight>
            <FormControl sx={{ minWidth: "130px" , width: "60%"}}>
              <Box display={"flex"} alignItems="center" gap="1rem">
                <Select labelId="phone-type-label" id="phone-type" defaultValue={"010"} onChange={onChangePhoneNum01}>
                  {phoneList.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
                -
                <TextField
                  onChange={(e) => {
                    if (e.target.value.length > 4) return;
                    onChangePhoneNum02(e);
                  }}
                />
                <TextField
                  onChange={(e) => {
                    if (e.target.value.length > 4) return;
                    onChangePhoneNum03(e);
                  }}
                />
              </Box>

              <Box display={"flex"} alignItems="center">
                <Checkbox
                  checked={smsChecked}
                  onChange={(e, checked) => {
                    setSmsChecked(checked);
                  }}
                />{" "}
                <Typography>알림신청</Typography>
              </Box>
            </FormControl>

            </TableCellRight>
          </TableRow>


          <TableRow>
            <TableCellLeft align="center">문의유형</TableCellLeft>

            <TableCellRight>
              <FormControl sx={{ minWidth: "130px" }}>
                
                <InputLabel>문의유형</InputLabel>
                <Select
                  value={questionType}
                  label="type"
                  onChange={handleSelectChange}
                >
                  <MenuItem value={QnaType.TYPE_SIGNUP_OR_SIGNIN}>회원가입/로그인</MenuItem>
                  <MenuItem value={QnaType.TYPE_EDU_OR_COMPLETE}>교육/수료</MenuItem>
                  <MenuItem value={QnaType.TYPE_WEB_OR_APP}>홈페이지/앱</MenuItem>
                  <MenuItem value={QnaType.TYPE_ETC}>기타</MenuItem>

                </Select>
              </FormControl>
            </TableCellRight>

          </TableRow>


          <TableRow>
            <TableCellLeft align="center">문의제목</TableCellLeft>
            <TableCellRight>
              <FormControl className="form-control" fullWidth>
                <TextField
                  {...register('title')}
                  fullWidth
                  type="text"
                  size="small"
                  variant="outlined"
                  label="문의제목"
                />
              </FormControl>
            </TableCellRight>
          </TableRow>


          <TableRow>
            <TableCellLeft align="center">문의내용</TableCellLeft>
            <TableCellRight>
              <FormControl className="form-control" fullWidth>
                <TextareaAutosize
                  {...register('content')}
                  style={{ width: "100%" }}
                  minRows={10}
                  placeholder="문의 내용을 입력해주세요(5000자).&#13;&#10;욕설, 비속어, 비방성 등 부적절한 단어가 포함되어있는 경우, 답변 진행이 어려울 수 있습니다. 문의가 집중되거나 주말의 경우 답변이 지연될 수 있습니다. 최대한 빠르게 답변드리도록 하겠습니다."
                />
              </FormControl>
            </TableCellRight>
          </TableRow>


          <TableRow>
            <TableCellLeft align="center">파일첨부</TableCellLeft>
            <TableCellRight>
              <FileUploader
                register={register}
                regName="files"
                onFileChange={handleFileChange}
              >
              </FileUploader>
              {fileName
                ? <Chip
                  sx={{ mt: '8px' }}
                  icon={<OndemandVideoOutlinedIcon />}
                  label={fileName}
                  onDelete={handleDeleteFile} />
                : null
              }
            </TableCellRight>
          </TableRow>


        </TableBody>
        
      </TableContainer>
      <Typography sx={{ padding: "1rem", color: grey[500] }}>
        수집하는 개인 정보[(필수) 문의내용, (선택) 첨부 파일]는 문의 내용 처리 및 고객 불만을 해결하기 위해 사용되며,
        관련 법령에 따라 3년간 보관 후 삭제됩니다. 동의를 거부하실 수 있으며, 동의 거부 시 서비스 이용이 제한 될 수
        있습니다.
      </Typography>
      <Box display={"flex"} alignItems="center">
        <Checkbox
          required
          checked={smsChecked}
          onChange={(e, checked) => {
            setSmsChecked(checked);
          }}
        />{" "}
        <Box display={"flex"}>
          <Typography>개인정보 수집 및 활용에 동의합니다.</Typography>
          <Typography color={"#2ecc71"}>(필수)</Typography>
        </Box>
      </Box>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        등록하기
      </Button>
    </Box>
  );
}

const TableCellLeft = styled(TableCell)`
  background: #e0e0e0;
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
  width: 20%;
`;
const TableCellRight = styled(TableCell)`
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
  width: 80%;
`;

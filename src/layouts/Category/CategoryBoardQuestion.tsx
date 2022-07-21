import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { useIsLoginStatus } from "@hooks/useIsLoginStatus";
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextareaAutosize,
  TextField,
  Checkbox,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { MemberType } from '@common/api/user';
import { useDialog } from '@hooks/useDialog';
import { useRouter } from 'next/router';
import { useInput } from '@hooks/useInput';
import { YN } from '@common/constant';
import { categoryQnaList } from '@common/api/categoryQna';
import { grey } from "@mui/material/colors";


export function CategoryBoardQuestion() {
  const isLoginStatus = useIsLoginStatus();
  const [isNonMenberQuestion, setIsNonMenberQuestion] = useState(false);
  const [isOpenQues, setIsOpneQues] = useState(false);
  const [memberType, setMemberType] = useState<undefined | MemberType>();

  useEffect(() => {
    if (isLoginStatus) {
      setIsOpneQues(true);
      setMemberType(MemberType.YES_MEMBER);
    }
  }, []);



  const [phone1, setPhone1, onChangePhone1] = useInput();
  const [phone2, setPhone2, onChangePhone2] = useInput();
  const [phone3, setPhone3, onChangePhone3] = useInput();
  const [questionType, setQuestionType, onChangeQuestionType] = useInput();
  const [questionName, setQuestionName, onChangeQuestionName] = useInput();
  const [questionText, setQuestionText, onChangeQuestionText] = useInput();
  const [smsChecked, setSmsChecked] = useState(true);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [isFileDelete, setIsFileDelete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const dialog = useDialog();
  const router = useRouter();


  const handleSubmitQues = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dialogConfirmed = await dialog({
      title: "회원 정보 수정",
      description: "회원 정보를 수정하시겠습니까?",
      confirmText: "수정하기",
      cancelText: "취소하기",
    });
    await handleOnCloseConfirm(dialogConfirmed);
  };

  const handleOnCloseConfirm = async (isConfirm: boolean) => {
    if (isConfirm) {
      const smsYn = smsChecked ? YN.YES : YN.NO;
      // await categoryBoardQuestion({
      // await categoryQnaList({
      //   title: questionName,
      //   content: questionText,
      //   // phone: phone1 + phone2 + phone3,
      //   // smsYn,
      //   type: questionType,
      // });
      return router.push("/");
    }
  };




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












  return (
    <NtContainer>
      <Box component={"form"} onSubmit={handleSubmitQues}>
        <TableContainer sx={{ width: "100%" }}>
          <TableBody sx={{ display: "table", width: "100%" }}>
            <TableRow>
              <TableCellLeft align="center">전화번호</TableCellLeft>
              <TableCellRight>
                <Box display={"flex"} alignItems="center" gap="1rem">
                  <FormControl sx={{ minWidth: "130px" }}>
                    <Select labelId="phone-type-label" id="phone-type" defaultValue={"010"} onChange={onChangePhone1}>
                      {phoneList.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  -
                  <TextField
                    onChange={(e) => {
                      if (e.target.value.length > 4) return;
                      onChangePhone2(e);
                    }}
                    value={phone2}
                  />
                  -
                  <TextField
                    onChange={(e) => {
                      if (e.target.value.length > 4) return;
                      onChangePhone3(e);
                    }}
                    value={phone3}
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
              </TableCellRight>
            </TableRow>
            <TableRow>
              <TableCellLeft align="center">문의유형</TableCellLeft>
              <TableCellRight>
                <FormControl sx={{ minWidth: "130px" }}>
                  <InputLabel id="question-type-label">문의유형</InputLabel>
                  <Select labelId="question-type-label" id="question-type" onChange={onChangeQuestionType}>
                    {questionTypeList.map((item) => (
                      <MenuItem value={item.enType}>{item.type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCellRight>
            </TableRow>
            <TableRow>
              <TableCellLeft align="center">문의제목</TableCellLeft>
              <TableCellRight>
                <TextField
                  onChange={onChangeQuestionName}
                  value={questionName}
                  placeholder="제목을 입력하세요(100자)"
                  fullWidth
                />
              </TableCellRight>
            </TableRow>
            <TableRow>
              <TableCellLeft align="center">문의내용</TableCellLeft>
              <TableCellRight>
                <TextareaAutosize
                  style={{ width: "100%" }}
                  minRows={10}
                  onChange={onChangeQuestionText}
                  value={questionText}
                  placeholder="문의 내용을 입력해주세요(5000자).&#13;&#10;욕설, 비속어, 비방성 등 부적절한 단어가 포함되어있는 경우, 답변 진행이 어려울 수 있습니다. 문의가 집중되거나 주말의 경우 답변이 지연될 수 있습니다. 최대한 빠르게 답변드리도록 하겠습니다."
                />
              </TableCellRight>
            </TableRow>
            <TableRow>
              <TableCellLeft align="center">파일첨부</TableCellLeft>
              <TableCellRight>
                {/* <FileUploader register={register} regName="files" onFileChange={handleFileChange}>
                  <FileUploader.Label>썸네일 이미지</FileUploader.Label>
                </FileUploader> */}
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
    </NtContainer>
  );
}

const NtContainer = styled(Container)`
  /* box-sizing: border-box;
  border: 1px solid black; */
  width: 100%;
  height: 100%;
`

const QuestionFormWrap = styled(Box)``;

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

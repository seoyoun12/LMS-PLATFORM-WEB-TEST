import styled from "@emotion/styled";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { PasswordChangeModal } from "../PasswordChangeModal/PasswordChangeModal";
import Paper from "@mui/material/Paper";
import { useMyUser } from "@common/api/user";

const emailList = ["naver.com", "gmail.com", "daum.net"];

const locationList = [
  "천안",
  "공주",
  "보령",
  "아산",
  "서산",
  "논산",
  "계룡",
  "당진",
  "금산",
  "부여",
  "서천",
  "청양",
  "홍성",
  "예산",
  "태안",
  "세종시",
];
const studentList = ["어린이", "청소년", "자가운전자", "어르신"];
const studentCategoryList = [
  { title: "유치원", ageList: ["만3세", "만4세", "만5세"] },
  {
    title: "초등학교",
    ageList: ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"],
  },
  { title: "중학교", ageList: ["1학년", "2학년", "3학년"] },
  { title: "고등학교", ageList: ["1학년", "2학년", "3학년"] },
  { title: "자가운전자", ageList: ["자가운전자"] },
  { title: "어르신", ageList: ["어르신"] },
];

export function Educator() {
  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const { user, error } = useMyUser();
  const [value, setValue] = useState<string | null>(emailList[0]);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [division, setDivision] = useState("");
  const [category, setCategory] = useState("");
  const [smsChecked, setSmsChecked] = useState(false);
  return (
    <EducatorContainer
      sx={{
        marginBottom: 8,
        padding: "72px 30px 48px",
        minWidth: "375px",
      }}
      maxWidth="sm"
    >
      <BoxForm component={"form"}>
        <Box sx={{ padding: "2rem 0", margin: "auto" }}>
          {" "}
          {/*어쨰서 이렇게 해야 되는것..? */}
          <UserProfile />
        </Box>
        <TextField
          required
          fullWidth
          id="name"
          label="이름"
          name="name"
          value={user?.name ? user?.name : "Error"}
          disabled
        />
        <TextField
          required
          fullWidth
          id="id"
          label="아이디"
          name="id"
          value={user?.username ? user?.username : "Error"}
          disabled
        />
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="neutral"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => setOpenPromptDialog(true)}
        >
          비밀번호 변경
        </Button>
        <EmailBox>
          <TextField label="Email" />
          <span>@</span>
          <TextField value={address} />
          <FormControl sx={{ width: "25%" }}>
            <InputLabel id="select">주소</InputLabel>
            <Select
              labelId="select"
              id="select"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="address"
            >
              {emailList.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </EmailBox>
        <LocationBox>
          <FormControl fullWidth>
            <InputLabel id="location">지역</InputLabel>
            <Select
              labelId="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label="location"
            >
              {locationList.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </LocationBox>
        <DivisionBox>
          <TextField
            label="소속(학교,기관,단체)"
            placeholder="예) oo유치원 / oo고등학교 / 대한노인회 공주지회"
            onChange={(e) => setDivision(e.target.value)}
            value={division}
            fullWidth
          />
        </DivisionBox>
        <StudentTypeBox>
          <FormControl fullWidth>
            <InputLabel id="student">교육 대상자</InputLabel>
            <Select
              labelId="student"
              id="student"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label="student"
            >
              {studentList.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </StudentTypeBox>
        <StudentCategory>
          <FormControl fullWidth>
            <InputLabel id="student-category">교육생 세부구분</InputLabel>
            <Select
              labelId="student-category"
              id="student-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="student-category"
            >
              {studentCategoryList.map((item) => (
                <MenuItem value={item.title}>{item.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </StudentCategory>
        <CustomInput
          studentCategoryList={studentCategoryList.filter(
            (item) => category === item.title
          )}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "8px",
          }}
        >
          <Typography variant="body2">SMS 수신 여부</Typography>
          <Switch
            name="smsYn"
            sx={{ ml: "auto" }}
            checked={smsChecked}
            onChange={(e, checked) => {
              setSmsChecked(checked);
            }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          수정하기
        </Button>

        <PasswordChangeModal
          open={openPromptDialog}
          onClose={() => setOpenPromptDialog(false)}
        />
      </BoxForm>
    </EducatorContainer>
  );
}

function CustomInput({
  studentCategoryList,
}: {
  studentCategoryList: { title: string; ageList: string[] }[];
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <TableBody sx={{ width: "80%" }}>
        {studentCategoryList[0]?.ageList.map((item) => {
          return (
            <TableRow key={item}>
              <TableCell sx={{ width: "50%" }}>{item}</TableCell>
              <TableCell>
                <TextField type={"number"} placeholder="0~000명" fullWidth />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </TableContainer>
  );
}

const EducatorContainer = styled(Container)``;
const BoxForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserProfile = styled(Avatar)`
  width: 100px;
  height: 100px;
`;

const EmailBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LocationBox = styled(Box)``;
const DivisionBox = styled(Box)``;
const StudentTypeBox = styled(Box)``;
const StudentCategory = styled(Box)``;

import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
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
import { modifyProvincialTrafficSafety, useMyUser, userRegistrationType } from "@common/api/user";
import { useDialog } from "@hooks/useDialog";
import { YN } from "@common/constant";
import { useRouter } from "next/router";
import { useInput } from "@hooks/useInput";

const studentList = [
  {
    type: "어린이",
    enType: "CHILDREN",
    category: [
      {
        type: "유치원",
        enType: "KINDER",
        ageList: [
          { age: "만3세", enAge: "fifthYearOldChild" },
          { age: "만4세", enAge: "fourthYearOldChild" },
          { age: "만5세", enAge: "thirdYearOldChild" },
        ],
      },
    ],
  },
  {
    type: "청소년",
    enType: "TEENAGER",
    category: [
      {
        type: "초등학교",
        enType: "ELEMENTARY_SCHOOL",
        ageList: [
          { age: "1학년", enAge: "firstGrade" },
          { age: "2학년", enAge: "secondGrade" },
          { age: "3학년", enAge: "thirdGrade" },
          { age: "4학년", enAge: "fourthGrade" },
          { age: "5학년", enAge: "fifthGrade" },
          { age: "6학년", enAge: "sixthGrade" },
        ],
      },
      {
        type: "중학교",
        enType: "MIDDLE_SCHOOL",
        ageList: [
          { age: "1학년", enAge: "firstGrade" },
          { age: "2학년", enAge: "secondGrade" },
          { age: "3학년", enAge: "thirdGrade" },
        ],
      },
      {
        type: "고등학교",
        enType: "HIGH_SCHOOL",
        ageList: [
          { age: "1학년", enAge: "firstGrade" },
          { age: "2학년", enAge: "secondGrade" },
          { age: "3학년", enAge: "thirdGrade" },
        ],
      },
    ],
  },
  {
    type: "자가운전자",
    enType: "SELF_DRIVER",
    category: [{ type: "자가운전자", enType: "SELF_DRIVER", ageList: [{ age: "자가운전자", enAge: "selfDriver" }] }],
  },
  {
    type: "어르신",
    enType: "OLD_MAN",
    category: [{ type: "어르신", enType: "OLD_MAN", ageList: [{ age: "어르신", enAge: "oldMan" }] }],
  },
];

interface Props {
  locationList: { ko: string; en: string }[];
}

interface detailCounts {
  [prop: string]: any;
}

export function Educator({ locationList }: Props) {
  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const { user, error } = useMyUser();
  const [name, setName] = useState(""); //닉네임
  const [username, setUsername] = useState(""); //아이디
  const [phone, setPhone, onChangePhone] = useInput(""); //후에 폼에 관련됀 상탯값들을 하나로 통합관리.
  const [location, setLocation] = useState("");
  const [division, setDivision] = useState("");
  const [period, setPeriod] = useState("");
  const [student, setStudent] = useState("");
  const [category, setCategory] = useState("");
  const [smsChecked, setSmsChecked] = useState(false);
  const [detailCounts, setDetailCounts] = useState<detailCounts>({
    firstGrade: 0,
    secondGrade: 0,
    thirdGrade: 0,
    fourthGrade: 0,
    fifthGrade: 0,
    sixthGrade: 0,
    fifthYearOldChild: 0, //만 5세
    fourthYearOldChild: 0, //만 4세
    thirdYearOldChild: 0, //만 3세
    oldMan: 0, //어르신
    selfDriver: 0, //자가운전자
  });

  const dialog = useDialog();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      if (!user) return window.alert("수정 실패하였습니다.");
      const data = {
        company: "PRINCESS",
        email: "PRINCESS@naver.com",
        ...detailCounts,
        name: name,
        phone: phone,
        smsYn: "N",
        userRegistrationType: location,
        userSeq: user.seq,
        userSubjectEducationDetailType: category,
        userSubjectEducationType: student,
        username: username,
      };

      await modifyProvincialTrafficSafety(data);
      return router.push("/me");
    }
  };

  console.log(studentList);
  // console.log(studentList.filter((item) => student === item.enType)[0]?.category.filter((item)=> category === item.enType)[0])
  return (
    <EducatorContainer
      sx={{
        marginBottom: 8,
        padding: "72px 30px 48px",
      }}
      maxWidth="sm"
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          mt: 1,
        }}
      >
        <Box sx={{ padding: "2rem 0", margin: "auto" }}>
          {/*어쨰서 이렇게 해야 되는것..? */}
          <UserProfile />
        </Box>
        <TextField required fullWidth id="name" label="이름" name="name" value={user?.name} disabled />
        <TextField required fullWidth id="id" label="아이디" name="id" value={user?.username} disabled />
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

        <PhoneBox>
          <TextField
            label="휴대전화"
            value={phone}
            onChange={onChangePhone}
            placeholder="'-'를 제외한 숫자만 입력해주세요."
            fullWidth
          />
        </PhoneBox>

        <LocationBox>
          <FormControl fullWidth>
            <InputLabel id="location">지역</InputLabel>
            <Select
              labelId="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value as userRegistrationType)}
              label="location"
            >
              {locationList.map((item) => (
                <MenuItem key={item.en} value={item.en}>
                  {item.ko}
                </MenuItem>
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
              value={student}
              onChange={(e) => {
                setStudent(e.target.value);
                setCategory("");
              }}
              label="student"
            >
              {studentList.map((item, index) => (
                <MenuItem key={item.enType} value={item.enType}>
                  {item.type}
                </MenuItem>
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
              onChange={(e) => {
                setCategory(e.target.value);
                setDetailCounts({
                  firstGrade: 0,
                  secondGrade: 0,
                  thirdGrade: 0,
                  fourthGrade: 0,
                  fifthGrade: 0,
                  sixthGrade: 0,
                  fifthYearOldChild: 0,
                  fourthYearOldChild: 0,
                  thirdYearOldChild: 0,
                  oldMan: 0,
                  selfDriver: 0,
                });
              }}
              label="student-category"
            >
              {studentList
                .filter((studentList) => student === studentList.enType)[0]
                ?.category.map(({ type, enType, ageList }) => (
                  <MenuItem key={enType} value={enType}>
                    {type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </StudentCategory>

        <TableContainer component={Paper} sx={{ display: "flex", justifyContent: "center" }}>
          <TableBody sx={{ width: "80%" }}>
            {studentList
              .filter((item) => student === item.enType)[0]
              ?.category.filter((item) => category === item.enType)[0] //뭐지??왜 옵셔널체이닝을 해야하지?
              ?.ageList.map((item) => (
                <CustomInput ageInfo={item} setDetailCounts={setDetailCounts} detailCounts={detailCounts} />
              ))}
          </TableBody>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "8px",
          }}
        >
        <Checkbox
          name="smsYn"
          checked={smsChecked}
          onChange={(e, checked) => {
            setSmsChecked(checked);
          }} />
          <Typography variant="body2">SMS 수신 여부</Typography>
        </Box>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          수정하기
        </Button>

        <PasswordChangeModal open={openPromptDialog} onClose={() => setOpenPromptDialog(false)} />
      </Box>
    </EducatorContainer>
  );
}

function CustomInput({
  //부모에서 map해서 사용하도록 리팩토링
  ageInfo,
  setDetailCounts,
  detailCounts,
}: {
  ageInfo: { age: string; enAge: string };
  detailCounts: detailCounts;
  setDetailCounts: React.Dispatch<React.SetStateAction<detailCounts>>;
}) {
  const keyName: string = ageInfo.enAge;
  console.log(detailCounts);

  return (
    <TableRow>
      <TableCell sx={{ width: "50%" }}>{ageInfo.age}</TableCell>
      <TableCell>
        <TextField
          name={ageInfo.enAge}
          type={"number"}
          placeholder="0~000명"
          value={detailCounts[keyName]}
          onChange={(e) => {
            // setValue(e.target.value);
            setDetailCounts({ ...detailCounts, [e.target.name]: Number(e.target.value) });
          }}
          fullWidth
        />
      </TableCell>
    </TableRow>
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

const PhoneBox = styled(Box)``;

const EmailBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LocationBox = styled(Box)``;
const DivisionBox = styled(Box)``;
const StudentTypeBox = styled(Box)``;
const StudentCategory = styled(Box)``;
import { modifTransWorker, useMyUser } from "@common/api/user";
import { YN } from "@common/constant";
import styled from "@emotion/styled";
import { useDialog } from "@hooks/useDialog";
import { useInput } from "@hooks/useInput";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {
  type: "transport" | "lowfloorbus" | "educator";
  locationList: { ko: string; en: string }[];
}
const phoneNumbers = ["010", "02", "032", "031"];

const occupationOptions1 = [
  { type: "여객", enType: "PASSENGER" },
  { type: "화물", enType: "FREIGHT" },
];
const occupationOptions2 = [
  { category: "PASSENGER", type: "버스", enType: "BUS", isMoreInfo: true },
  {
    category: "PASSENGER",
    type: "전세버스",
    enType: "CHARTER_BUS",
    isMoreInfo: true,
  },
  {
    category: "PASSENGER",
    type: "특수여객",
    enType: "SPECIAL_PASSENGER",
    isMoreInfo: true,
  },
  {
    category: "PASSENGER",
    type: "법인택시",
    enType: "CORPORATE_TAXI",
    isMoreInfo: true,
  },
  {
    category: "FREIGHT",
    type: "법인화물",
    enType: "GENERAL_CARGO",
    isMoreInfo: true,
  },
  {
    category: "PASSENGER",
    type: "개인택시",
    enType: "PRIVATE_TAXI",
    isMoreInfo: false,
  },
  {
    category: "FREIGHT",
    type: "용달화물",
    enType: "INDIVIDUAL_CARGO",
    isMoreInfo: false,
  },
  {
    category: "FREIGHT",
    type: "개별화물",
    enType: "CONSIGNMENT",
    isMoreInfo: false,
  },
];

export function TransWorker({ type, locationList }: Props) {
  const { user, error } = useMyUser();
  const [name, setName, onChangeName] = useInput();
  const [occupation1, setOccupation1, onChangeOcc1] = useInput();
  const [occupation2, setOccupation2, onChangeOcc2] = useInput();
  const [showCompany, setShowCompany] = useState(false);
  // const [companyOption, setCompanyOption, onCompanyOpt] = useInput(false);
  const [company, setCompany, onChangeComp] = useInput();
  const [vehicleNumber, setVehicleNumber, onChangeVehicleNum] = useInput();
  const [vehicleRegi, setVehicleRegi, onChangeVehicleRegi] = useInput();
  const [phone1, setPhone1, onChagePhone1] = useInput();
  const [phone2, setPhone2, onChagePhone2] = useInput();
  const [phone3, setPhone3, onChagePhone3] = useInput();
  const [smsChecked, setSmsChecked] = useState(false);
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
        carNumber: vehicleNumber, //차번호
        company: company, //회사
        name: user.name, //이름
        phone: phone1 + phone2 + phone3, //폰번
        smsYn: smsYn, // 동의여부
        userBusinessTypeOne: occupation1, //업종
        userBusinessTypeTwo: occupation2, // 구분
        userRegistrationType: vehicleRegi, //지역
        userSeq: user.seq,
      };

      await modifTransWorker(data);
      return router.push("/me");
    }
  };

  return (
    <TransAndLowFloorContainer
      sx={{
        marginBottom: 8,
        padding: "72px 30px 48px",
        minWidth: "375px",
      }}
      maxWidth="sm"
    >
      <Box display="flex" flexDirection={"column"} gap="1rem" component={"form"} onSubmit={handleSubmit}>
        <Box sx={{ margin: "auto" }}>
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
          value={user?.name ? user.name : "Error"}
          disabled
        />
        <FormControl fullWidth>
          <InputLabel id="occ1-select-label">업종</InputLabel>
          <Select
            labelId="occ1-select-label"
            id="occ1-select"
            onChange={(e) => {
              onChangeOcc1(e);
              setShowCompany(false);
            }}
            required
          >
            {occupationOptions1.map((occ) => (
              <MenuItem key={occ.enType} value={occ.enType}>
                {occ.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="occ2-select-label">업종구분</InputLabel>
          <Select labelId="occ2-select-label" id="occ2-select" onChange={(e) => onChangeOcc2(e)} required>
            {
              // occupation1 === "PASSENGER"
              // ?
              occupationOptions2
                .filter((item) => item.category === occupation1)
                .map((item) => (
                  <MenuItem
                    key={item.enType}
                    value={item.enType}
                    onClick={() => (item.isMoreInfo ? setShowCompany(true) : setShowCompany(false))}
                  >
                    {item.type}
                  </MenuItem>
                ))
              //     :
              // occupationOptions2.filter((item)=>item.category === occ1).map((item)=>
              // <MenuItem value={item.enType} onClick={()=>item.isMoreInfo ? setShowCompany(true) : setShowCompany(false)} >{item.type}</MenuItem>
              // )
            }
            {/* {occupationOptions2.map(
                        (occ)=> <MenuItem 
                                    value={occ.type} 
                                    onClick={()=>{
                                        occ ? setShowCompany(true) : setShowCompany(false)

                                    }} 
                                >
                                {occ.type}
                                </MenuItem> 
                        )
                    } */}
          </Select>
        </FormControl>

        {showCompany && (
          <TextField
            required
            fullWidth
            id="company"
            label="회사명"
            name="company"
            value={company}
            onChange={onChangeComp}
          />
        )}
        <TextField
          required
          fullWidth
          id="vehicle-number"
          label="차량번호"
          placeholder="예) 01가1234 또는 서울 01가1234"
          name="car-number"
          value={vehicleNumber}
          onChange={onChangeVehicleNum}
        />
        <FormControl fullWidth>
          <InputLabel id="regi-select-label">차량등록지</InputLabel>
          <Select labelId="regi-select-label" id="regi-select" onChange={(e) => onChangeVehicleRegi(e)} required>
            {locationList.map((locate) => (
              <MenuItem key={locate.en} value={locate.en}>
                {locate.ko}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display={"flex"} alignItems="center" gap="1rem">
          <FormControl fullWidth>
            <Select onChange={(e) => setPhone1(String(e.target.value))}>
              {phoneNumbers.map((phone) => (
                <MenuItem key={phone} value={phone}>
                  {phone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
          -
          <TextField required fullWidth id="name" name="name" value={phone2} onChange={onChagePhone2} /> -
          <TextField required fullWidth id="name" name="name" value={phone3} onChange={onChagePhone3} />
        </Box>
        <Box display={"flex"} alignItems="center">
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          수정하기
        </Button>
      </Box>
    </TransAndLowFloorContainer>
  );
}

const TransAndLowFloorContainer = styled(Container)`
  .front-box {
    background: #fff;
  }
`;
const CssTextField = styled(InputBase)({
  padding: "15.5px 14px",
});

const BoxForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserProfile = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-right: 36px;
`;

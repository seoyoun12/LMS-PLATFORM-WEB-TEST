import { useMyUser } from '@common/api/user';
import styled from '@emotion/styled';
import { useInput } from '@hooks/useInput';
import { Autocomplete, Avatar, Box, Button, Container, FormControl, InputBase, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import React , { useState } from 'react';

interface Props{
    type:"transport" | "lowfloorbus" | "educator"
}
const phoneNumbers = ["010","02" , "032" , "031"]

const occupationOptions1 = ["여객" , "화물"]
const occupationOprions2 = ["버스","전세버스","특수여객","법인택시","법인화물","개인택시", "용달화물","개별화물"];

export function TransAndLowFloor({type}:Props){
    const { user, error } = useMyUser();
    const [ name, setName , onChangeName ] = useInput();
    const [ occupation1, setOccupation1 , onChangeOcc1 ] = useInput();
    const [ occupation2, setOccupation2 , onChangeOcc2 ] = useInput();
    const [ company, setCompany , onChangeComp] = useInput();
    const [ vehicleNumber, setVehicleNumber , onChangeVehicleNum ] = useInput();
    const [ vehicleRegi, setVehicleRegi , onChangeVehicleRegi ] = useInput();
    const [phone1, setPhone1 , onChagePhone1 ] = useInput();
    const [phone2, setPhone2 , onChagePhone2 ] = useInput();
    const [phone3, setPhone3 , onChagePhone3 ] = useInput();
    const [occOption1 , setValue] = useState<string | null>(occupationOptions1[0])
    const [inputValue, setInputValue] = useState("")
    const [smsChecked, setSmsChecked] = useState(false);
    
    return(
    <TransAndLowFloorContainer 
    sx={{
      marginBottom: 8,
      padding: '72px 30px 48px',
      minWidth: '375px'
    }}
    maxWidth="sm" >
        <BoxForm component={"form"} >
            <Box sx={{margin:"auto"}} > {/*어쨰서 이렇게 해야 되는것..? */}
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
            <TextField 
                required
                fullWidth 
                id="occupation1"
                label="업종구분"
                name="occupation1"
                value={occupation1}
                onChange={onChangeOcc1}
            />
            <TextField 
                required
                fullWidth 
                id="occupation2"
                label="업종구분2"
                name="occupation2"
                value={occupation2}
                onChange={onChangeOcc2}
            />
            <TextField 
                required
                fullWidth 
                id="company"
                label="회사명"
                name="company"
                value={company}
                onChange={onChangeComp}
            />
            {(type === "transport") && <TextField 
                required
                fullWidth 
                id="vehicle-number"
                label="차량번호"
                name="car-number"
                value={vehicleNumber}
                onChange={onChangeVehicleNum}
            />}
            <TextField 
                required
                fullWidth 
                id="vehicle-registration"
                label="차량등록지"
                name="vehicle-registration"
                value={vehicleRegi}
                onChange={onChangeVehicleRegi}
            />
            <Box display={"flex"} alignItems="center" gap="1rem" >
            <FormControl fullWidth >
                <Select onChange={(e)=>setPhone1(String(e.target.value))} >
                    {phoneNumbers.map((phone)=> <MenuItem value={phone} >{phone}</MenuItem> )}
                </Select>
            </FormControl> - 
            <TextField 
                required
                fullWidth 
                id="name"
                name="name"
                value={phone2}
                onChange={onChagePhone2}
            /> - 
            <TextField 
                required
                fullWidth 
                id="name"
                name="name"
                value={phone3}
                onChange={onChagePhone3}
            /></Box>
            <Box display={"flex"} alignItems="center" >
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
            
            
        </BoxForm>
    </TransAndLowFloorContainer>
)}

const TransAndLowFloorContainer = styled(Container)`
    .front-box{
        background:#fff
    }
`
const CssTextField = styled(InputBase)({
    padding:"15.5px 14px",
      
  });

const BoxForm = styled(Box)`
    display:flex;
    flex-direction:column;
    gap:1rem;
    
`

const UserProfile = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-right: 36px;
`;
import { useMyUser } from '@common/api/user';
import styled from '@emotion/styled';
import { Autocomplete, Avatar, Box, Container, FormControl, MenuItem, Select, TextField } from '@mui/material';
import React , { useState } from 'react';

interface Props{
    type:"transport" | "lowfloorbus" | "educator"
}
const options = [{title:'Option 1',value:1}, {title:'Option 2',value:2}];
const occupationOptions1 = ["여객" , "화물"]
const occupationOprions2 = ["버스","전세버스","특수여객","법인택시","법인화물","개인택시", "용달화물","개별화물"];

export function TransAndLowFloor({type}:Props){
    const { user, error } = useMyUser();
    const [ nameInput, setNameInput ] = useState('이미림');
    const [occOption1 , setValue] = useState<string | null>(occupationOptions1[0])
    const [inputValue, setInputValue] = useState("")
    
//   const [values, setValues] = React.useState<string | null>(options[0]);
  const [values, setValues] = React.useState<number>(1);
  const [inputValues, setInputValues] = React.useState('');
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
                id="name"
                label="업종구분"
                name="name"
                value={nameInput}
                disabled
            />
            <TextField 
                required
                fullWidth 
                id="name"
                label="업종구분2"
                name="name"
                value={nameInput}
                disabled
            />
            <TextField 
                required
                fullWidth 
                id="name"
                label="회사명"
                name="name"
                value={nameInput}
                disabled
            />
            {(type === "transport") && <TextField 
                required
                fullWidth 
                id="name"
                label="차량번호"
                name="name"
                value={nameInput}
                disabled
            />}
            <TextField 
                required
                fullWidth 
                id="name"
                label="차량등록지"
                name="name"
                value={nameInput}
                disabled
            />
            <TextField 
                required
                fullWidth 
                id="name"
                label="휴대전화번호"
                name="name"
                value={nameInput}
                disabled
            />
            {/* <Autocomplete 
                value={values}
                onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                fullWidth
                renderInput={(params) => <Box className='뭐야' position="relative" ><TextField {...params} fullWidth /><Box position="absolute" top="0" width={"90%"} height={"56px"} >ddd</Box></Box>}  
            /> */}
            <FormControl sx={{position:"relative"}} fullWidth>
                <Select onChange={(e)=>{setValues(Number(e.target.value));console.log(values)}} >
                    {options.map((item)=><MenuItem value={item.value} >{item.title}</MenuItem>)}
                </Select>
                <Box className='front-box' position="absolute" top="0" width={"90%"}  display={"flex"} sx={{padding:"4px"}} >
                    <Box>{values}</Box>
                    <TextField sx={{}} fullWidth />
                </Box>
            </FormControl>
            
        </BoxForm>
    </TransAndLowFloorContainer>
)}

const TransAndLowFloorContainer = styled(Container)`
.front-box .MuiInputBase-input{
    padding: 12.5px 14px;
    border-color:white;
}
`
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
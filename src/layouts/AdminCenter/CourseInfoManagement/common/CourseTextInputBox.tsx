import { Box, TextField, Typography } from '@mui/material';
import React from 'react'
import { UseFormRegisterReturn, ValidationRule } from 'react-hook-form';

interface Props {
  title: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  placeholder2?: string;
  fullWidth?: boolean;
  register: (name: string, options?: Partial<{
    required: string | ValidationRule<boolean>;
    min: ValidationRule<string | number>;
    max: ValidationRule<string | number>;
    deps: string | string[];
    }>) => UseFormRegisterReturn;
  doubleInput?: boolean;
  registerName:string;
  registerName2?:string;
  type?:string
}

function CourseTextInputBox({register,type, placeholder2,doubleInput,registerName2, registerName, title, onChange, placeholder,fullWidth }: Props) {
  return (
    <Box display={doubleInput ? 'flex' : 'block'} gap={2} alignItems="center">
      <Typography sx={{width:'100%'}}>{title}</Typography>
      <TextField
        type={type ? type : 'text'}
        {...register(registerName)}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth={fullWidth}
      />
      {
        doubleInput && (
          <TextField
          type={type ? type : 'text'}
          {...register(registerName2)}
          onChange={onChange}
          placeholder={placeholder2}
          fullWidth={fullWidth}
        />)
      }
    </Box>
  )
}

export default CourseTextInputBox
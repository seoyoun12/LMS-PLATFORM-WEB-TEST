import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ConvertEnum } from '@utils/convertEnumToHangle';
import { CSSProperties } from 'react'

interface Props{
  id: string;
  label: string;
  options: any[];
  value: number | string;
  onChange: (e: SelectChangeEvent) => void;
  name?: string;
  sx?: CSSProperties;
  disabled?: boolean;
  size?: 'small' | 'normal';
}

export default function SelectBox({ id, label, name, options, value, sx, onChange,disabled,size}:Props) {
  return (
    <FormControl fullWidth>
    <InputLabel id={id} size={size}>{label}</InputLabel>
    <SelectContainer name={name} label={label} labelId={id} value={value} onChange={onChange} sx={{...sx}} disabled={disabled}  >
      {options?.map(option => <MenuItem key={option} value={option}>{ConvertEnum(option)}</MenuItem>) }
    </SelectContainer>
  </FormControl>
  )
}

const SelectContainer = styled(Select)<{sx:CSSProperties}>`
  width: ${({sx}) => sx.width || '100%'};
  margin-bottom: ${({sx}) => sx.marginBottom || '1rem'};
`;

// username 님 ㅎㅇㅎㅇ
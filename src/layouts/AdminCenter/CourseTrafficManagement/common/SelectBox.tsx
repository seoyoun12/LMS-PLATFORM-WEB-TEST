import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ConvertEnum } from '@utils/convertEnumToHangle';
import { CSSProperties } from 'react'

interface Props{
  id: string;
  label: string;
  options: any[]; // MUI의 컴포넌트가 제네릭을 받지 못하기 때문에 any으로 처리
  value: number | string;
  onChange: (e: SelectChangeEvent) => void;
  name?: string;
  sx?: CSSProperties;
  disabled?: boolean;
}

export default function SelectBox({ id, label, name, options, value, sx, onChange,disabled}:Props) {
  return (
    <FormControl fullWidth>
    <InputLabel id={id}>{label}</InputLabel>
    <SelectContainer name={name} label={label} labelId={id} value={value} onChange={onChange} sx={{...sx}} disabled={disabled}  >
      {options.map(option => <MenuItem key={option} value={option}>{ConvertEnum(option)}</MenuItem>) }
    </SelectContainer>
  </FormControl>
  )
}

const SelectContainer = styled(Select)<{sx:CSSProperties}>`
  width: ${({sx}) => sx.width || '100%'};
  margin-bottom: ${({sx}) => sx.marginBottom || '1rem'};
`;
import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { CSSProperties } from 'react'

interface Props{
  id: string;
  label: string;
  options: number[];
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
      {options.map((_, i) => <MenuItem key={i} value={i}>{i}</MenuItem>) }
    </SelectContainer>
  </FormControl>
  )
}

const SelectContainer = styled(Select)<{sx:CSSProperties}>`
  width: ${({sx}) => sx.width || '100%'};
  margin-bottom: ${({sx}) => sx.marginBottom || '1rem'};
`;
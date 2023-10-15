import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

interface Props{
  id: string;
  label: string;
  options: number[];
  value: number | string;
  onChange: (e: SelectChangeEvent) => void;
  name?: string;
}

export default function SelectBox({ id, label, name, options, value, onChange}:Props) {
  return (
    <FormControl fullWidth>
    <InputLabel id={id}>{label}</InputLabel>
    <SelectContainer name={name} label={label} labelId={id} value={value} onChange={onChange}>
      {options.map((_, i) => <MenuItem key={i} value={i}>{i}</MenuItem>) }
    </SelectContainer>
  </FormControl>
  )
}

const SelectContainer = styled(Select)`
  width: 100%;
  margin-bottom: 1rem;
`;
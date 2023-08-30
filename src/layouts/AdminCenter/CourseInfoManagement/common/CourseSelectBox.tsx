import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React from 'react'


interface Props<T> {
  label:string;
  onChange: (e:SelectChangeEvent) => void;
  value: string | number;
  menuItem: T[];
  itemKey: string;
  itemValue: string;
  itemName: string;
  firstOptionLabel: string | null;
}

function CourseSelectBox<T>({label, onChange, value, menuItem, firstOptionLabel,itemValue, itemKey, itemName}: Props<T>) {
  return (
    <Box sx={{display:'flex',flexDirection:'column',width:'100%'}}>
    <Typography>{label}</Typography>
        <Select
          onChange={onChange}
          value={value}
          fullWidth
          sx={{
            '& .MuiSelect-select': {
              //custom
              
            },

          }}
        >
          {firstOptionLabel && <MenuItem value={null}>{firstOptionLabel}</MenuItem>}
          {menuItem.map(item => (
            <MenuItem key={item[itemKey]} value={item[itemValue]}>
              {item[itemName]}
            </MenuItem>
          ))}
        </Select>
    </Box>
  )
}

export default CourseSelectBox
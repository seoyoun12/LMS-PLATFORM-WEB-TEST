import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react'

interface Props<T> {
  label:string;
  onChange: (e:SelectChangeEvent) => void;
  value: string | number;
  menuItem: T[];
  itemKey: string;
  itemValue: string;
  itemName: string;
  firstOptionLabel: string;
}

function CourseSelectBox<T>({label,firstOptionLabel, onChange, value, menuItem, itemValue, itemKey, itemName}: Props<T>) {
  const [currentValue, setCurrentValue] = useState<string | number>(firstOptionLabel);

  const onClickMenuItem = (itemName: string) => {
    setCurrentValue(() => itemName);
  }

  return (
    <Box sx={{display:'flex',flexDirection:'column',width:'100%'}}>
    <Typography>{label}</Typography>
      <Select      
        onChange={onChange}
        value={value}
        fullWidth
        displayEmpty={true}
        renderValue={() => currentValue}
      >
        <MenuItem onClick={() => onClickMenuItem(firstOptionLabel)} value={null}>{firstOptionLabel}</MenuItem>
        {menuItem.map(item => (
          <MenuItem onClick={() => onClickMenuItem(item[itemName])} key={item[itemKey]} value={item[itemValue]}>
            {item[itemName]}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default CourseSelectBox
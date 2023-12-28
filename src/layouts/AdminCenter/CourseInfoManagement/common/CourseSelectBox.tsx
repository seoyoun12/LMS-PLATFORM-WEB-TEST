import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { ConvertEnum } from '@utils/convertEnumToHangle';
import { Ref, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { UseFormRegisterReturn, ValidationRule } from 'react-hook-form';

interface Props<T> {
  label:string;
  onChange: (e:SelectChangeEvent) => void;
  value: string | number;
  menuItem: T[];
  itemKey: string;
  itemValue: string;
  itemName: string;
  
  register: (name: string, options?: Partial<{
    required: string | ValidationRule<boolean>;
    min: ValidationRule<string | number>;
    max: ValidationRule<string | number>;
    deps: string | string[];
    }>) => UseFormRegisterReturn;
  registerName: string;
}

const CourseSelectBox = forwardRef<unknown, Props<unknown>>(({label, onChange, value, menuItem, itemValue, itemKey, itemName, register, registerName},ref) => {
  const [currentValue, setCurrentValue] = useState<string | number>('');
  
  useImperativeHandle(ref, () => ({
    resetDisplay: () => {
      console.log('excuted')
      setCurrentValue('')
    }
    
  }))

  const onClickMenuItem = (itemName: string) => {
    setCurrentValue(() => itemName);
  }
  
  useEffect(() => {
    if(registerName === 'year') return setCurrentValue(value);
    if(registerName === 'courseSeq') return setCurrentValue(menuItem.find(item => item[itemKey] === value)?.['courseName'])
    if(registerName === 'courseClassSeq') return setCurrentValue(menuItem.find(item => item[itemKey] === value)?.['yearAndStep'])
    if(registerName === 'businessType') return setCurrentValue(ConvertEnum(value + ''));
    if(registerName === 'carRegitRegion') return setCurrentValue(ConvertEnum(value + ''));


    // if(registerName === 'courseClassSeq') return setCurrentValue
    setCurrentValue(value);
  },[itemKey, menuItem, registerName, value])

  return (
    <Box sx={{display:'flex',flexDirection:'column',width:'100%'}}>
    <Typography>{label}</Typography>
      <Select
        {...register(registerName)}
        onChange={onChange}
        value={value}
        fullWidth
        displayEmpty={true}
        renderValue={() => currentValue}
        
      >
        {menuItem.map(item => (
          <MenuItem onClick={() => onClickMenuItem(item[itemName])} key={item[itemKey]} value={item[itemValue]}>
            {item[itemName]}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
})
CourseSelectBox.displayName = 'CourseSelectBox'
export default CourseSelectBox
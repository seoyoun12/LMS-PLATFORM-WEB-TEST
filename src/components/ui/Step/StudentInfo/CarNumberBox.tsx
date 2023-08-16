import { UserTransSaveInputDataType } from '@common/api/courseClass';
import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { carNumberRegex } from '@utils/inputRegexes';
import { useEffect, useState } from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';

const regex2 = /^[0-9]{2}/g;
const regex4 = /^[0-9]{4}/g;

// const carNumberRegex = /(?=.*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2}[\d]{2}[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1}[\d]{4})/;

const localList = [
  { title: '충남', type: 'NAM' },
  { title: '세종', type: 'SEJONG' },
];
const oneWordList = ['아', '바', '사', '자', '배'];

interface Props {
  // parantSetValue: UseFormSetValue<UserTransSaveInputDataType>;
  parantSetValue: UseFormSetValue<any>;
}

interface FormType {
  localName: string;
  digit2: string;
  oneWord: string;
  digit4: string;
}

export function CarNumberBox({ parantSetValue }: Props) {
  const { watch, setValue, getValues, register } = useForm<FormType>();

  const [err, setErr] = useState(false);
  const regFunc = () => {
    const { localName, digit2, oneWord, digit4 } = watch();
    const carNumber = localName + digit2 + oneWord + digit4;
    if (!carNumberRegex.test(carNumber)) {
      parantSetValue('carNumber', carNumber);
      return setErr(true);
    }
    setErr(false);
    parantSetValue('carNumber', carNumber);
  };
  useEffect(() => {
    regFunc();
  }, [watch().localName, watch().digit2, watch().digit4, watch().oneWord]);

  const Placeholder = ({ children }) => {
    return <Box color='#bababa'>{children}</Box>;
  };

  return (
    <Box display='flex' width='100%' gap={1}>
      <FormControl fullWidth>
        <Select
          {...register('localName')}
          displayEmpty
          renderValue={ !watch().localName && (() => <Placeholder>지역명</Placeholder>) }
          placeholder='지역명'
          onChange={e =>  setValue('localName',e.target.value as string)}
        >
          {localList.map((item) => (
            <MenuItem key={item.type} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        {...register('digit2')}
        onChange={(e) => {
          // if (!regex4.test(e.target.value)) return;
          if (e.target.value.length > 2) return;
          setValue('digit2', e.target.value.replace(/[^0-9]/g, ''));
        }}
        value={watch().digit2}
        placeholder='차종 번호2자리'
        inputProps={{ inputMode: 'numeric' }}
        fullWidth
      />
      <FormControl fullWidth>
        <Select
          {...register('oneWord')}
          displayEmpty
          renderValue={ !watch().oneWord && (() => <Placeholder>지역명</Placeholder>) }
          placeholder='용도 기호 한글 한글자'
          value={watch().oneWord}
        >
          {oneWordList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        {...register('digit4')}
        onChange={(e) => {
          // if (!regex4.test(e.target.value)) return;
          if (e.target.value.length > 4) return;
          setValue('digit4', e.target.value.replace(/[^0-9]/g, ''));
        }}
        value={watch().digit4}
        placeholder='차량번호 4자리'
        inputProps={{ inputMode: 'numeric' }}
        fullWidth
      />
    </Box>
  );
}

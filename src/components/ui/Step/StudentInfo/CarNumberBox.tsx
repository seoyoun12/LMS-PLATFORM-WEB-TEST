import { UserTransSaveInputDataType } from '@common/api/courseClass';
import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, UseFormSetValue } from 'react-hook-form';

const regex2 = /^[0-9]{2}/g;
const regex4 = /^[0-9]{4}/g;

const lastRegex = /(?=.*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2}[\d]{2}[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1}[\d]{4})/;

const localList = [
  { title: '충남', type: 'NAM' },
  { title: '세종', type: 'SEJONG' },
];
const oneWordList = ['아', '바', '사', '자', '배'];

interface Props {
  parantSetValue: UseFormSetValue<UserTransSaveInputDataType>;
}

interface FormType {
  localName: string;
  digit2: string;
  oneWord: string;
  digit4: string;
}

export function CarNumberBox({ parantSetValue }: Props) {
  const { watch, setValue, register } = useForm<FormType>({ defaultValues: { localName: '', digit2: '', oneWord: '', digit4: '' } });
  const [err, setErr] = useState(false);

  useEffect(() => {
    const { localName, digit2, oneWord, digit4 } = watch();
    const carNumber = localName + digit2 + oneWord + digit4;
    if (!lastRegex.test(carNumber)) setErr(true);
    setErr(false);
    parantSetValue('carNumber', carNumber);
  }, [watch().localName, watch().digit2, watch().digit4, watch().oneWord]);

  return (
    <Box display="flex" width="100%">
      <FormControl fullWidth>
        <Select {...register('localName')}>
          {localList.map(item => (
            <MenuItem key={item.type} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        {...register('digit2')}
        onChange={e => {
          // if (!regex4.test(e.target.value)) return;
          if (e.target.value.length > 2) return;
          setValue('digit2', e.target.value.replace(/[^0-9]/g, ''));
        }}
        value={watch().digit2}
        fullWidth
      />
      <FormControl fullWidth>
        <Select {...register('oneWord')}>
          {oneWordList.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        {...register('digit4')}
        onChange={e => {
          // if (!regex4.test(e.target.value)) return;
          if (e.target.value.length > 4) return;
          setValue('digit4', e.target.value.replace(/[^0-9]/g, ''));
        }}
        value={watch().digit4}
        fullWidth
      />
    </Box>
  );
}

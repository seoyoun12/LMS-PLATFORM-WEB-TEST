
import { InputAdornment, OutlinedInput } from '@mui/material';
import { CourseAudientCount, InRowContent, InRowTitle, OutRow } from '../CourseInfomationTraffic';
import { ChangeEvent } from 'react';

interface Props {
  diabled: boolean;
  length: number;
  startCount: number | null;
  countSuffix: string;
  name: string;
  value: CourseAudientCount
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseAudientsCountInputGroup({value, onChange, name, countSuffix,startCount, diabled, length }:Props) {
  return  (
      <>
        {
          Array.from({length}, (_, i) => i).map((_, i) => (
            <OutRow key={i}>
              <InRowTitle>{startCount === 0 ? null : i + startCount}{countSuffix}</InRowTitle>
              <InRowContent>
                <OutlinedInput
                  name={startCount === 0 ? `${name}` : `${name}${i + startCount}`}
                  value={value[`${name}${i + startCount}`]}
                  onChange={onChange}
                  endAdornment={<InputAdornment position="end">명</InputAdornment>}
                  inputProps={{ style: { height: '8px' } }}
                  inputMode="numeric"
                  type="number"
                  disabled={diabled}
                />
              </InRowContent>
            </OutRow>
            ))
          }
        </>
  
  )
}

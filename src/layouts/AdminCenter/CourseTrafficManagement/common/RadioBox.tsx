import styled from '@emotion/styled';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent } from 'react';



interface Props {
  id: string;
  label: string;
  defaultValue: string;
  name: string;
  radios: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioBox({ id, label, defaultValue, name,radios,value,onChange }: Props) {
  return (
      <RadioWrapper>
        <FormLabel id={id}>{label}</FormLabel>
        <RadioContainer value={value} onChange={onChange} aria-labelledby={id} defaultValue={defaultValue} name={name}>
          {radios.map((radio, i) => 
          <FormControlLabel
            key={i}
            value={radio}
            control={<Radio value={radio} />}
            label={radio}
            defaultChecked={value === radio}
            />
          )}
        </RadioContainer>
      </RadioWrapper>
  )
}


const RadioWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

const RadioContainer = styled(RadioGroup)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

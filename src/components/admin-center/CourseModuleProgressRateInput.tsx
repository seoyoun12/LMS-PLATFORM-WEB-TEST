
import { InputAdornment, TextField } from '@mui/material'

interface Props {
  progressRate: number;
  onChangeProgressRate: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

export default function CourseModuleProgressRateInput({progressRate, onChangeProgressRate}: Props) {
  
  return (
      <TextField
        fullWidth
        variant="outlined"
        label="최소 진도율(%)"
        type="number" 
        value={progressRate}
        onChange={onChangeProgressRate}
        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment>}}
        />
  )
}

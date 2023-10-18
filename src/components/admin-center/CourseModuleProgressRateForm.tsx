
import { Box, InputAdornment, TextField } from '@mui/material'

interface Props {
  progressRate: number;
  onChangeProgressRate: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

export default function CourseModuleProgressRateForm({progressRate, onChangeProgressRate}: Props) {
  
  
  
  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        label="최소 진도율(%)"
        type="number" 
        value={progressRate}
        onChange={onChangeProgressRate}
        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment>}}
        />
    </Box>
  )
}

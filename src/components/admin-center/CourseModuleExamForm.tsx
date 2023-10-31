import { Box, InputAdornment, TextField } from '@mui/material'

interface Props {
  onChangeLimitScore: (e: React.ChangeEvent<HTMLInputElement>) => void;
  limitScore: number;
}

export default function CourseModuleExamForm({ onChangeLimitScore, limitScore }: Props) {
  
  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        label="최소 점수"
        type="number" 
        value={limitScore}
        onChange={onChangeLimitScore}
        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment>}}
        />
    </Box>
  )
}

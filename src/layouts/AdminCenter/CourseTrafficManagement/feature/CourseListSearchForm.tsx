import { useNewInput } from '@hooks/useNewInput'
import { Search } from '@mui/icons-material'
import { FormControl, InputAdornment, TextField } from '@mui/material'

export default function CourseListSearchForm() {
  const { value: searchValue, onChange: onChangeSearchValue} = useNewInput({initialValue:'',type:'string'})
  return (
    <FormControl fullWidth>
    <TextField
      variant="outlined"
      value={searchValue}
      onChange={onChangeSearchValue}
      placeholder="과정명 검색"
      InputProps={{
        endAdornment: <InputAdornment position="end"><Search /></InputAdornment>,
      }}
      />
    </FormControl>
  )
}

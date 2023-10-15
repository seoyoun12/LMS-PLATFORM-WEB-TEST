import { Box, Button } from '@mui/material'

interface Props {
  onClickUpload: () => void;
}

export default function UploadButton({ onClickUpload }: Props) {
  return (
    <Box sx={{width:'100%',margin:'1.25rem 0',position:'relative'}}>
      <Button onClick={onClickUpload} variant="contained" sx={{position:'absolute',top:0, right:0}}>업로드하기</Button>
    </Box>
  )
}

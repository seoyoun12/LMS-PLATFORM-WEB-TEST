import { Box, Button } from '@mui/material'

interface Props {
  onClick: () => void;
  onClickDelete?: () => void
}

export default function ButtonGroup({ onClick,onClickDelete }: Props) {
  return (
    <Box sx={{width:'100%',margin:'1.25rem 0',position:'relative',display:'flex',justifyContent:'center',gap:'4px'}}>
      {onClickDelete && <Button onClick={onClickDelete} variant="contained">삭제</Button>}
      <Button onClick={onClick} variant="contained">업로드</Button>
    </Box>
  )
}

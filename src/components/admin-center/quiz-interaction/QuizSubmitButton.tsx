import { Button } from '@mui/material'

interface Props {
  onClick: () => void;
  buttonType: "inherit" | "error" | "primary" | "secondary" | "info" | "success" | "warning";
  buttonText: string;
}


function QuizSubmitButton({onClick,buttonType, buttonText}: Props) {
  return (
    <Button
      variant="contained"
      color={buttonType}
      sx={{ width:'120px' }}
      onClick={onClick}>
        {buttonText}
      </Button>
  )
}

export default QuizSubmitButton
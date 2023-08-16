import { Box } from '@mui/material';

const BubbleBox = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#2196F3', // 말풍선 배경색
        color: '#fff', // 말풍선 텍스트 색상
        borderRadius: '10px', // 말풍선 테두리 곡률
        padding: '4px 8px', // 말풍선 안의 내용과 테두리 사이의 간격
        maxWidth: '200px', // 말풍선의 최대 너비
        marginBottom: '.75rem',
        // '::before': {
        //   content: '""',
        //   position: 'absolute',
        //   top: '100%',
        //   left: '16px', // 말풍선 꼬리의 위치
        //   borderStyle: 'solid',
        //   borderColor: 'transparent transparent #2196F3 transparent', // 말풍선 꼬리의 색상
        //   borderWidth: '8px',
        //   transform: 'rotate(180deg)'
        // },
      }}
    >
      {children}
    </Box>
  );
};

export default BubbleBox




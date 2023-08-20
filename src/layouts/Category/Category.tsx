import { CategoryCarousel } from '@components/ui';
import { CategoryCard } from '@components/ui/CategoryCard/CategoryCard';
import { CategoryBoard } from '@components/ui/CategoryBoard/CategoryBoard';
import useResponsive from '@hooks/useResponsive';
import { CategoryCarouselMobile } from '@components/ui/CategoryCarouselMobile';

// import useToggle from '@hooks/useToggle';
// import { Box, Button, Icon, Modal, Typography } from '@mui/material';

const bannerData = [
  {
    id: 1,
    img: '/assets/images/banner.jpg',
    title: 'test 1',
    description: 'description 1',
  },
  {
    id: 2,
    img: '/assets/images/banner.jpg',
    title: 'test 2',
    description: 'description 2',
  },
];
// {
//   dialog({
//     variant: 'alert',
//     title: '알림',
//     description: '현재 서버 운영 테스트 기간으로 교육 진행이 불가능하며 잘못된 방법으로 수강하여도 수료로 인정되지 않습니다.',
//     confirmText: '확인',
//   })
// }

export function Category() {
  const isDesktop = useResponsive(1024);
  // const { toggle, onToggle } = useToggle();

  return (
    <>
    {/* 테스트기간 중 유저에게 학습불인정기간임을 알려주는 모달 */}
    {/* {
        <Modal
        open={!toggle}
        onClose={onToggle}
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        >
          <Box
            sx={{
              width: '50%',
              minWidth:'400px',
              maxWidth: '600px',
              backgroundColor: '#fff',
              height: '50%',
              padding: '2rem',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '16px',
              boxShadow: '-12px 16px 4px #193883dd',
              overflow: 'hidden',
              border: '2px solid #c7c7c7c7'
            }}
          >
            <Box
              sx={{
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.25rem',
              }}
            >
              <Icon color="error" sx={{fontSize:'84px',height:'120px'}}>!</Icon>
            <Typography  sx={{fontSize: '28px',textUnderlineOffset:'.4rem',textDecoration:'underline'}}>알림</Typography>
            <Typography sx={{fontWeight:'bold'}}>
            현재 서버 운영 테스트 기간으로 교육 진행이 불가능하며 잘못된 방법으로 수강하여도 수료로 인정되지 않습니다.
            </Typography>
            </Box>
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left:0,
              width:'100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems:'center',
              
            }}>
              <Button
                sx={{
                  flex:1,
                  minHeight: '50px',
                  bgcolor: '#2047a1',
                  color:'#fff',
                  border: '1px solid transparent',
                  ': hover': {
                    color:' #2048a1',
                    border: '1px solid #2048a1',
                  },
                  borderRadius: '0px 0px 16px 16px'
                }}
                onClick={onToggle}
              >
                확인
              </Button>
            </Box>
          </Box>
        </Modal>
    } */}
      {
        isDesktop
        ? <CategoryCarousel datas={bannerData} />
        : <CategoryCarouselMobile datas={bannerData} />
      }
      <CategoryCard></CategoryCard>
      
      {/* 게시판 */}
      <CategoryBoard></CategoryBoard>
    </>
  );
}
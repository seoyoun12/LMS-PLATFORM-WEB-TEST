import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '@utils/cookie';

const popup = { seq: 1, img: 'internet Explorer를 제발 쓰지 마세요.' };

export function PopupBox() {
  const [isClose, setIsClose] = useState(false);
  // useEffect(() => {
  //   console.log(getCookie('popupNotView'));
  // }, []);

  const handleClose = () => {
    setIsClose(true);
  };

  const onClickTodaynotView = () => {
    setCookie('popupNotView', 'done', 24);
    handleClose();
  };

  if (typeof window !== 'object') return null;
  if (getCookie('popupNotView') === 'done' || isClose) return null;
  return (
    <PopupBoxWrap>
      <Popup>
        <PopupContent textAlign="center">{popup.img}</PopupContent>
        <PopupActions>
          <PopupButton variant="text" onClick={onClickTodaynotView}>
            오늘 하루 보지않기
          </PopupButton>
          <PopupButton variant="text" onClick={handleClose}>
            닫기
          </PopupButton>
        </PopupActions>
      </Popup>
    </PopupBoxWrap>
  );
}

const PopupBoxWrap = styled(Box)`
  position: absolute;
`;
const Popup = styled(Box)`
  position: absolute;
  width: 600px;
  height: 660px;
  left: 0;
  top: 0;
  z-index: 222;
  background: white;
  /* box-shadow: 2px 2px 10px 1px; */
`;
const PopupContent = styled(Box)`
  width: 100%;
  height: 620px;
`;
const PopupActions = styled(Box)`
  background: black;
  height: 40px;
  display: flex;
  justify-content: space-around;
`;
const PopupButton = styled(Button)``;

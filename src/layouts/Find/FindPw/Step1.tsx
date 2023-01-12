import { logout } from '@common/api';
import { checkingSignin, loginType, SignInResponse } from '@common/api/auth/signIn';
import { niceConfirm } from '@common/api/nice';
import { existsUserId, findUserPw } from '@common/api/user';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
  handleStepChange: (stepNumber: number) => void;
  handleNiceChange: (nicePhone: string, niceName: string) => void;
}

export function Step1({ handleStepChange, handleNiceChange }: Props) {
  const snackbar = useSnackbar();
  const uuidRef = useRef(uuid());
  const popUpRef = useRef<Window>(null);
  const [popUpState, setPopUpState] = useState<Window>(null);

  const onClickPop = () => {
    const scheme = process.env.NEXT_PUBLIC_SCHEME;
    const domain = process.env.NEXT_PUBLIC_HOST;
    const popUp = document.open(
      `${scheme}://${domain}/api/v1/nice?uuid=` + uuidRef.current,
      '_parant',
      'popup=yes'
    );
    setPopUpState(popUp);
  };

  useEffect(() => {
    if (popUpState) {
      const interval = setInterval(async () => {
        if (popUpState.closed) {
          try {
            const { data } = await niceConfirm(uuidRef.current);
            // console.log('data is arrive!', data);
            handleNiceChange(data.mobileNo, data.name);
            handleStepChange(2);
          } catch (e: any) {
            snackbar({ variant: 'error', message: '인증실패 혹은 취소하셨습니다.' });
          }
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [popUpState]);

  return (
    <Step1Wrap>
      <StepMain>
        <TitleTypo>본인인증</TitleTypo>

        <SpaceBox mt={2} />
        <ContentBoxes>
          비밀번호 변경을 위한 본인확인 단계입니다. 인증수단을 미리 준비해주세요
        </ContentBoxes>

        <SpaceBox mt={6} />
        <ContentBoxes fontSize="1.25rem" fontWeight="bold">
          본인인증 방법 선택
        </ContentBoxes>

        <SpaceBox mt={2} />
        <ContentBoxes>
          <SelfCertificateBox
            onClick={onClickPop}
            // onClick={() => {
            //   handleStep(2);
            // }}
          >
            <PhoneAndroidIcon sx={{ fontSize: '6rem', width: '20%' }} />
            <Box display="flex" flexDirection="column" width="70%" paddingRight="1rem">
              <Typography>휴대폰</Typography>
              <Typography>본인명의로 된 휴대폰으로 인증번호를 전송받아 인증</Typography>
            </Box>
            <ArrowForwardIosIcon sx={{ fontSize: '3rem', width: '10%' }} />
          </SelfCertificateBox>
        </ContentBoxes>
        <SpaceBox mt={4} />

        <ContentBoxes display="flex" alignItems="center">
          <WarningAmberIcon />
          <Typography fontWeight="bold">알아두실 사항</Typography>
        </ContentBoxes>
        <SpaceBox mt={2} />

        <ContentBoxes component="li">본인인증은 휴대폰으로 가능합니다.</ContentBoxes>
        <ContentBoxes component="li">
          본인인증 절차가 정상적으로 이루어지지 않을 경우 휴대폰 본인인증은
          한국모바일인증(주)
        </ContentBoxes>
        <ContentBoxes>☎ 02-2033-8500으로 문의하시기 바랍니다.</ContentBoxes>
        <ContentBoxes component="li">
          비밀번호변경에 대한 다른 궁금한 사항은 고객센터로 문의하여 주시기 바랍니다.
        </ContentBoxes>
      </StepMain>
    </Step1Wrap>
  );
}

const Step1Wrap = styled(Box)`
  list-style-type: '•';
  /* max-width: 700px;
  margin: auto;
  .find-form {
    max-width: 450px;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  } */
`;
// const Typo = styled(Box)`
//   font-weight: bold;
//   font-size: 1.25rem;
//   margin-top: 1rem;
//   padding-bottom: 0.5rem;
//   border-bottom: 2px solid #888888;
// `;
// const FindForm = styled(Box)`
// `;

const StepMain = styled(Box)`
  max-width: 700px;
  margin: auto;
`;
const TitleTypo = styled(Typography)`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #c3c3c3;
`;
const ContentBoxes = styled(Box)`
  width: fit-content;
  margin: auto;
`;
const SpaceBox = styled(Box)``;

const SelfCertificateBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #ececec;
  max-width: 450px;
  cursor: pointer;
`;

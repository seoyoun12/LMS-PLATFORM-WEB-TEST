import styled from "@emotion/styled";
import { Button, ButtonBase } from "@mui/material";
import { Modal } from "@components/ui";

export const MeCertificateContainer = styled.div``;

export const MeCertificateHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 262px;
  position: relative;
  overflow: hidden;

  > svg {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    z-index: -1;
  }
`;

export const MeCertificateHeaderTitle = styled.p`
  font-size: 48px;
  font-weight: 500;
  color: #fff;
  line-height: 42px;
`;

export const MeCertificateHeaderSubtitle = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  line-height: 42px;
`;

export const MeCertificateContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 62px auto 0 auto;
`;

export const MeCertificateItemContainer = styled(ButtonBase)`
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 0 26px 30px 0;
  text-align: left;
  align-items: flex-start;

  &:nth-of-type(4n) {
    margin-right: 0;
  }
`;

export const MeCertificateItemImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f6f6f6;
  border-radius: 8px;
  margin-bottom: 10px;

  > img {
    width: 100%;
    height: 100%;
  }
`;

export const MeCertificateItemContentContainer = styled.div`
  width: 100%;
`;

export const MeCertificateItemContentTitle = styled.p`
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  padding-bottom: 4px;
  border-bottom: 1px solid #d4d4d4;
  margin-bottom: 4px;
`;

export const MeCertificateItemContentSubtitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  margin-bottom: 10px;
`;

export const MeCertificateItemConfirmButton = styled.p`
  color: #256aef;
`;

export const PrintModal = styled(Modal)``;

export const PrintModalWrapper = styled.div`
  width: 80vw;
  max-width: 520px;
`;

export const PrintModalImage = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;

export const PrintModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PrintModalButton = styled(Button)``;

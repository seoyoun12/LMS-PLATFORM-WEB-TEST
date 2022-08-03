import styled from "@emotion/styled";
import {Button} from "@mui/material";

export const MeCertificateContainer = styled.div``;

export const MeCertificateHeaderContainer = styled.div`
	width: 100%;
	display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 262px;
  background-color: #666;
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

export const MeCertificateItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 0 26px 30px 0;
  
  &:nth-of-type(4n) {
    margin-right: 0;
  }
`;

export const MeCertificateItemImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #F6F6F6;
  border-radius: 8px;
  margin-bottom: 10px;
  
  > img {
    width: 100%;
    height: 100%;
  }
`;

export const MeCertificateItemContentContainer = styled.div``;

export const MeCertificateItemContentTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
`;

export const MeCertificateItemContentSubtitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  margin-bottom: 10px;
`;

export const MeCertificateItemConfirmButton = styled.p`
  color: #256AEF;
  cursor: pointer;
`;

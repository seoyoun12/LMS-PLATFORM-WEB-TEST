import styled from "@emotion/styled";
import { ButtonBase, Chip } from "@mui/material";

export const Container = styled.div``;
export const ChipItem = styled(Chip)`
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;

export const ContentContainer = styled.div`
  padding: 0rem 2rem;
  width: 100%;
  max-width: 1200px;
  display : grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-content: center;
`;

export const ItemContainer = styled(ButtonBase)`
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 0 26px 30px 0;
  text-align: left;
  align-items: flex-start;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
  border-radius: 8px;

  &:nth-of-type(4n) {
    margin-right: 0;
  }
  &:hover {
    transform: scale(1.02);
    transition: transform 0.25s;
    cursor: pointer;
  }

  @media (max-width: 786px) {
    width: 100%;
    margin: 0 0 32px 0;
  }
`;

export const ItemImageContainer = styled.div`
  width: 100%;
  
  margin: 0 auto;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.33);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 4px;
  }
  
`;

export const ItemContentContainer = styled.div`
  width: 100%;
`;

export const ItemContentHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const ItemContentTitle = styled.p`
  width: 0;
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
  margin-top: .25rem;
  font-weight: 700;
`;

export const ItemContentDate = styled.p`
  color: #858585;
  
`;

export const ItemContentSubtitle = styled.p`
  color: #a7a7a7ff;
  font-size: 14px;
`;

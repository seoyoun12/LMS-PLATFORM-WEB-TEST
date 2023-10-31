import styled from '@emotion/styled';
import { Tab, Tabs as MeterialTabs } from '@mui/material';

export const Wrapper = styled.div``;

export const HeaderContainer = styled.div`
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

export const HeaderTitle = styled.p`
  font-size: 48px;
  font-weight: 500;
  color: #fff;
  line-height: 42px;
  margin-bottom: 10px;
`;

export const HeaderSubtitle = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  margin: 0 30px;
  word-break: break-word;
`;

export const TabWrapper = styled.div`
  border-bottom: 1px solid #bfbfbf;
  margin-bottom: 40px;
`;

export const Tabs = styled(MeterialTabs)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TabItem = styled(Tab)`
  width: 0;
  flex-grow: 1;
  color: #000;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const TableWrapper = styled.div`
  width: 100%;
`;

export const TableHeader = styled.div`
  display: flex;
  line-height: 75px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #cdcdcd;
`;

interface TableItemProps {
  width: string;
  textAlign?: 'left' | 'center' | 'right';
}

export const TableItem = styled.div<TableItemProps>`
  width: ${({ width }) => width};
  text-align: ${({ textAlign }) => textAlign || 'center'};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

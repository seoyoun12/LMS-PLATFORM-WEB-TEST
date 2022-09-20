import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { TableHeader } from "@layouts/Traffic/LearningMaterial/style";

export const ReferenceWrapper = styled.div`
  padding: 0 0 230px 0;
`;

export const ReferenceChipWrapper = styled.div`
  display: flex;
  margin-bottom: 62px;
`;

export const ReferenceChipItem = styled(Chip)`
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;

export const ReferenceItemWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #cdcdcd;
`;

export const ReferenceItemHeaderWrapper = styled(TableHeader)`
  border: 0;
`;

export const ReferenceItemHeaderDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ReferenceItemHeaderDateText = styled.p`
  color: #8f8f8f;
  margin-right: 12px;
`;

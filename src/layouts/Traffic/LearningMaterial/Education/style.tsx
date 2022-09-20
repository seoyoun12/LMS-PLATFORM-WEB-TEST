import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { TableHeader } from "@layouts/Traffic/LearningMaterial/style";

export const EducationWrapper = styled.div`
  padding: 0 0 230px 0;
`;

export const EducationChipWrapper = styled.div`
  display: flex;
  margin-bottom: 62px;
`;

export const EducationChipItem = styled(Chip)`
  &:not(:last-of-type) {
    margin-right: 8px;
  }
`;

interface EducationItemWrapperProps {
  open: boolean;
}

export const EducationItemWrapper = styled.div<EducationItemWrapperProps>`
  width: 100%;
  height: ${({ open }) => (open ? `auto` : `75px`)};
  overflow: hidden;
  border-bottom: 1px solid #cdcdcd;
`;

export const EducationItemHeaderWrapper = styled(TableHeader)`
  border: 0;
`;

interface EducationItemHeaderDateWrapperProps {
  open?: boolean;
}

export const EducationItemHeaderDateWrapper = styled.div<EducationItemHeaderDateWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  > svg {
    transform: rotate(${({ open }) => (open ? 0 : "180deg")});
  }
`;

export const EducationItemHeaderDateText = styled.p`
  color: #8f8f8f;
  margin-right: 12px;
`;

export const EducationItemContentWrapper = styled.div`
  padding: 14px 10%;
  background-color: #fbfbfb;
`;

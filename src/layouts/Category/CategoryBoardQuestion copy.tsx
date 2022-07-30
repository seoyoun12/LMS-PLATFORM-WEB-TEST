import { Container } from "@mui/material";
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { useIsLoginStatus } from "@hooks/useIsLoginStatus";
import { useEffect, useState } from "react";
import { MemberType } from "@common/api/user";
import { CategoryBoardQuestionLogin } from "./CategoryBoardQuestionLogin";
import { CategoryBoardQuestionForm } from "./CategoryBoardQuestionForm";

export function CategoryBoardQuestion() {
  const isLoginStatus = useIsLoginStatus();
  const [isNonMenberQuestion, setIsNonMenberQuestion] = useState(false);
  const [isOpenQues, setIsOpneQues] = useState(false);
  const [memberType, setMemberType] = useState<undefined | MemberType>();

  useEffect(() => {
    if (isLoginStatus) {
      setIsOpneQues(true);
      setMemberType(MemberType.TYPE_MEMBER);
    }
  }, []);

  return (
    <NtContainer>
      {isOpenQues ? (
        <CategoryBoardQuestionForm memberType={memberType} />
      ) : (
        <CategoryBoardQuestionLogin setIsOpneQues={setIsOpneQues} setMemberType={setMemberType} />
      )}{" "}
    </NtContainer>
  );
}

const NtContainer = styled(Container)`
  /* box-sizing: border-box;
  border: 1px solid black; */
  width: 100%;
  height: 100%;
`;

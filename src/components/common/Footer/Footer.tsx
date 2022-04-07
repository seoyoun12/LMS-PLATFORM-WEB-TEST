import { FC } from 'react';
import styles from '@styles/common.module.scss';
import s from './Footer.module.scss';
import styled from '@emotion/styled';

interface Props {
  className?: string;
}

export const Footer: FC<Props> = () => {
  return (
    <footer className={s.root}>
      <div className={styles.globalContainer}>
        <ContentContainer>
          <div className="logo">LOGO</div>
          <div className="desc">
            미림미디어랩은 ‘교육을 통하여 세상을 평등하게 만든다’ 는 경영원칙을 바탕으로
            대상의 제한 없이 모두에게 배움의 기회를 제공하고 생애 걸친 교육을 통하여
            평등한 세상을 구현하고자 합니다.
          </div>
        </ContentContainer>
        <ContentContainer>

        </ContentContainer>
      </div>
    </footer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .logo {
    font-size: 26px;
    font-weight: 700;
  }

  .desc {
    height: 30px;
  }
`;


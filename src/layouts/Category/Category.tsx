import type { NextPage } from 'next';
import styles from '@styles/common.module.scss';
import * as React from 'react';
import styled from '@emotion/styled';
import { ContentCard, CategoryCarousel, Spinner } from '@components/ui';
import cn from 'clsx';
import { Link } from '@components/common';
import { Grid } from '@mui/material';
import { useCourseList } from '@common/api/course';
import { useState } from 'react';
import { CategoryCard } from '@components/ui/CategoryCard/CategoryCard';
import { CategoryBoard } from '@components/ui/CategoryBoard/CategoryBoard';

const bannerData = [
  {
    id: 1,
    img: '/assets/images/banner.jpg',
    title: 'test 1',
    description: 'description 1',
  },
  {
    id: 2,
    img: '/assets/images/banner.jpg',
    title: 'test 2',
    description: 'description 2',
  },
  {
    id: 3,
    img: '/assets/images/banner.jpg',
    title: 'test 3',
    description: 'description 3',
  },
];

// const SecondPage: NextPage = (res) => {
export function Category() {
  // const [ page, setPage ] = useState(0);
  // const { data, error } = useCourseList({ page });
  // // console.log(data);

  // if (error) return <div>error</div>;
  // if (!data) return <Spinner />;
  return (
    <div>

      <CategoryCarousel datas={bannerData} />

      <CategoryCard></CategoryCard>

      <CategoryBoard></CategoryBoard>

    </div>
  );
};



// const ContentContainer = styled.div`
//   padding: 76px 20px 0 20px !important;
// `;

// const CourseGrid = styled(Grid)`
//   display: flex;
//   justify-content: center;
// `;

// const BannerContainer = styled.div`
//   display: flex;
//   width: 100%;
//   background: linear-gradient(270.44deg,
//   rgb(255, 122, 0) 0.21%,
//   rgba(255, 122, 0, 0.4) 99.18%) 0% 0% / 100%;
//   margin-bottom: 32px;

//   img {
//     padding-right: 16px;
//     position: relative;
//     top: 32px;
//   }
// `;

// const ContentCardContainer = styled.div`
//   display: flex;
//   align-items: center;
//   padding-bottom: 32px;

//   > *:not(:last-child) {
//     margin-right: 24px;
//   }
// `;

import styled from '@emotion/styled'
import { Download } from '@mui/icons-material'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Whole from './statistics/Whole'
import FluctuationInBusiness from './statistics/FluctuationInBusiness'
import RegistrationAddress from './statistics/RegistrationAddress'
import FluctuationByPeriod from './statistics/FluctuationByPeriod'
import FluctuationByBusiness from './statistics/FluctuationByBusiness'
import YearlyAgeByBusiness from './statistics/YearlyAgeByBusiness'
import ComparisonAgeByYearly from './statistics/ComparisonAgeByYearly'
import useStatistics, { StatisticsResponse } from '@hooks/useStatistics'
import { useEffect, useState } from 'react'

// const DUMMY_STATISTICS:StatisticsResponse = {
//   statisticsTransEduIntegratedResponseDto: {
//       totalCourseUserCnt: Math.floor(Math.random() * 100000),
//       completedCourseUserCnt: Math.floor(Math.random() * 100000),
//       inCompletedCourseUserCnt: Math.floor(Math.random() * 100000),
//   },
//   statisticsTransEduCategoryResponseDto: {
//       statisticsTransEduCategoryResponseDtoList: [
//           {
//               userBusinessSubType: 'GENERAL_CARGO',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           }
//       ],
//       sumCompletedCntSum: Math.floor(Math.random() * 100),
//       sumInCompletedCnt: Math.floor(Math.random() * 100),
//       sumTotalCntSum: Math.floor(Math.random() * 100),
//   },
//   statisticsTransEduCarRegisteredRegionResultResponseDto: {
//       statisticsTransEduCarRegisteredRegionResponseDtoList: [
//           {
//               userRegistrationTypeEnum: 'HONGSEONG',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'SEOUL',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'GANGWON',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'JEJU',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'GYEONGSANG',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'JEOLLABUK',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'JEOLLANAM',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'CHUNGCHEONG',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'BUSAN',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'DAEGU',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'INCHEON',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'GWANGJU',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'DAEJEON',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'ULSAN',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'SEJONG',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'GANGWON',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'CHUNGCHEONG',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'JEOLLABUK',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'JEOLLANAM',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'GYEONGSANG',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           },
//           {
//               userRegistrationTypeEnum: 'JEJU',
//               completedCnt: Math.floor(Math.random() * 100),
//               inCompletedCnt: Math.floor(Math.random() * 100),
//               totalCnt: Math.floor(Math.random() * 100),
//           }
//       ],
//       sumCompletedCntSum: Math.floor(Math.random() * 10000),
//       sumInCompletedCnt: Math.floor(Math.random() * 10000),
//       sumTotalCntSum: Math.floor(Math.random() * 100000),
//       exceptSejongCompletedCntSum: Math.floor(Math.random() * 100),
//       exceptSejongInCompletedCntSum: Math.floor(Math.random() * 100),
//       exceptSejongTotalCntSum: Math.floor(Math.random() * 100),
//   },
//   statisticsTransEduStepResponseDto: [
//       {
//           step: Math.floor(Math.random() * 100),
//           studentCnt: Math.floor(Math.random() * 1000)
//       },
//       {
//         step: Math.floor(Math.random() * 100),
//         studentCnt: Math.floor(Math.random() * 1000)
//     },
//     {
//       step: Math.floor(Math.random() * 100),
//       studentCnt: Math.floor(Math.random() * 1000)
//   },
//   {
//     step: Math.floor(Math.random() * 100),
//     studentCnt: Math.floor(Math.random() * 1000)
// },{
//   step: Math.floor(Math.random() * 100),
//   studentCnt: Math.floor(Math.random() * 1000)
// },{
//   step: Math.floor(Math.random() * 100),
//   studentCnt: Math.floor(Math.random() * 1000)
// },{
//   step: Math.floor(Math.random() * 100),
//   studentCnt: Math.floor(Math.random() * 1000)
// },{
//   step: Math.floor(Math.random() * 100),
//   studentCnt: Math.floor(Math.random() * 1000)
// },{
//   step: Math.floor(Math.random() * 100),
//   studentCnt: Math.floor(Math.random() * 1000)
// }
//   ],
//   statisticsTransEduCategoryIncreaseResponseDto: [
//       {
//           userBusinessSubType: 'GENERAL_CARGO',
//           courseSeq: Math.floor(Math.random() * 10),
//           step: 1,
//           studentCnt: Math.floor(Math.random() * 1000),
//       },
//       {
//           userBusinessSubType: 'BUS',
//           courseSeq: Math.floor(Math.random() * 10),
//           step: 1,
//           studentCnt: Math.floor(Math.random() * 1000)
//       },
//       {
//           userBusinessSubType: 'CHARTER_BUS',
//           courseSeq: Math.floor(Math.random() * 10),
//           step: 1,
//           studentCnt: Math.floor(Math.random() * 1000)
//       },
//       {
//           userBusinessSubType: 'SPECIAL_PASSENGER',
//           courseSeq: Math.floor(Math.random() * 10),
//           step: 1,
//           studentCnt: Math.floor(Math.random() * 1000)
//       },
//       {
//           userBusinessSubType: 'CORPORATE_TAXI',
//           courseSeq: Math.floor(Math.random() * 10),
//           step: 1,
//           studentCnt: Math.floor(Math.random() * 1000)
//       },
//       {
//           userBusinessSubType: 'PRIVATE_TAXI',
//           courseSeq: Math.floor(Math.random() * 10),
//           step: 1,
//           studentCnt: Math.floor(Math.random() * 1000)
//       },
//       {
//           userBusinessSubType: 'INDIVIDUAL_CARGO',
//           courseSeq: Math.floor(Math.random() * 10),
//           step: 1,
//           studentCnt: Math.floor(Math.random() * 1000)
//       },
//       {
//           userBusinessSubType: 'CONSIGNMENT',
//           courseSeq: Math.floor(Math.random() * 10),
//           step: 1,
//           studentCnt: Math.floor(Math.random() * 1000)
//       },
      
      
      
    
//       {
//         userBusinessSubType: 'GENERAL_CARGO',
//         courseSeq: Math.floor(Math.random() * 10),
//         step: 2,
//         studentCnt: Math.floor(Math.random() * 1000),
//     },
//     {
//         userBusinessSubType: 'BUS',
//         courseSeq: Math.floor(Math.random() * 10),
//         step: 2,
//         studentCnt: Math.floor(Math.random() * 1000)
//     },
//     {
//         userBusinessSubType: 'CHARTER_BUS',
//         courseSeq: Math.floor(Math.random() * 10),
//         step: 2,
//         studentCnt: Math.floor(Math.random() * 1000)
//     },
//     {
//         userBusinessSubType: 'SPECIAL_PASSENGER',
//         courseSeq: Math.floor(Math.random() * 10),
//         step: 2,
//         studentCnt: Math.floor(Math.random() * 1000)
//     },
//     {
//         userBusinessSubType: 'CORPORATE_TAXI',
//         courseSeq: Math.floor(Math.random() * 10),
//         step: 2,
//         studentCnt: Math.floor(Math.random() * 1000)
//     },
//     {
//         userBusinessSubType: 'PRIVATE_TAXI',
//         courseSeq: Math.floor(Math.random() * 10),
//         step: 2,
//         studentCnt: Math.floor(Math.random() * 1000)
//     },
//     {
//         userBusinessSubType: 'INDIVIDUAL_CARGO',
//         courseSeq: Math.floor(Math.random() * 10),
//         step: 2,
//         studentCnt: Math.floor(Math.random() * 1000)
//     },
//     {
//         userBusinessSubType: 'CONSIGNMENT',
//         courseSeq: Math.floor(Math.random() * 10),
//         step: 2,
//         studentCnt: Math.floor(Math.random() * 1000)
//     },
//     {
//       userBusinessSubType: 'GENERAL_CARGO',
//       courseSeq: Math.floor(Math.random() * 10),
//       step: 3,
//       studentCnt: Math.floor(Math.random() * 1000),
//   },
//   {
//       userBusinessSubType: 'BUS',
//       courseSeq: Math.floor(Math.random() * 10),
//       step: 3,
//       studentCnt: Math.floor(Math.random() * 1000)
//   },
//   {
//       userBusinessSubType: 'CHARTER_BUS',
//       courseSeq: Math.floor(Math.random() * 10),
//       step: 3,
//       studentCnt: Math.floor(Math.random() * 1000)
//   },
//   {
//       userBusinessSubType: 'SPECIAL_PASSENGER',
//       courseSeq: Math.floor(Math.random() * 10),
//       step: 3,
//       studentCnt: Math.floor(Math.random() * 1000)
//   },
//   {
//       userBusinessSubType: 'CORPORATE_TAXI',
//       courseSeq: Math.floor(Math.random() * 10),
//       step: 3,
//       studentCnt: Math.floor(Math.random() * 1000)
//   },
//   {
//       userBusinessSubType: 'PRIVATE_TAXI',
//       courseSeq: Math.floor(Math.random() * 10),
//       step: 3,
//       studentCnt: Math.floor(Math.random() * 1000)
//   },
//   {
//       userBusinessSubType: 'INDIVIDUAL_CARGO',
//       courseSeq: Math.floor(Math.random() * 10),
//       step: 3,
//       studentCnt: Math.floor(Math.random() * 1000)
//   },
//   {
//       userBusinessSubType: 'CONSIGNMENT',
//       courseSeq: Math.floor(Math.random() * 10),
//       step: 3,
//       studentCnt: Math.floor(Math.random() * 1000)
//   },
//   {
//     userBusinessSubType: 'GENERAL_CARGO',
//     courseSeq: Math.floor(Math.random() * 10),
//     step: 4,
//     studentCnt: Math.floor(Math.random() * 1000),
// },
// {
//     userBusinessSubType: 'BUS',
//     courseSeq: Math.floor(Math.random() * 10),
//     step: 4,
//     studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//     userBusinessSubType: 'CHARTER_BUS',
//     courseSeq: Math.floor(Math.random() * 10),
//     step: 4,
//     studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//     userBusinessSubType: 'SPECIAL_PASSENGER',
//     courseSeq: Math.floor(Math.random() * 10),
//     step: 4,
//     studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//     userBusinessSubType: 'CORPORATE_TAXI',
//     courseSeq: Math.floor(Math.random() * 10),
//     step: 4,
//     studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//     userBusinessSubType: 'PRIVATE_TAXI',
//     courseSeq: Math.floor(Math.random() * 10),
//     step: 4,
//     studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//     userBusinessSubType: 'INDIVIDUAL_CARGO',
//     courseSeq: Math.floor(Math.random() * 10),
//     step: 4,
//     studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//     userBusinessSubType: 'CONSIGNMENT',
//     courseSeq: Math.floor(Math.random() * 10),
//     step: 4,
//     studentCnt: Math.floor(Math.random() * 1000)
// },{
//   userBusinessSubType: 'GENERAL_CARGO',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 5,
//   studentCnt: Math.floor(Math.random() * 1000),
// },
// {
//   userBusinessSubType: 'BUS',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 5,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'CHARTER_BUS',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 5,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'SPECIAL_PASSENGER',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 5,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'CORPORATE_TAXI',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 5,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'PRIVATE_TAXI',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 5,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'INDIVIDUAL_CARGO',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 5,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'CONSIGNMENT',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 5,
//   studentCnt: Math.floor(Math.random() * 1000)
// },{
//   userBusinessSubType: 'GENERAL_CARGO',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 6,
//   studentCnt: Math.floor(Math.random() * 1000),
// },
// {
//   userBusinessSubType: 'BUS',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 6,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'CHARTER_BUS',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 6,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'SPECIAL_PASSENGER',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 6,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'CORPORATE_TAXI',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 6,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'PRIVATE_TAXI',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 6,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'INDIVIDUAL_CARGO',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 6,
//   studentCnt: Math.floor(Math.random() * 1000)
// },
// {
//   userBusinessSubType: 'CONSIGNMENT',
//   courseSeq: Math.floor(Math.random() * 10),
//   step: 6,
//   studentCnt: Math.floor(Math.random() * 1000)
// }
//   ],
//   statisticsTransEduCategoryAgeResponseDto: [
//       {
//           userBusinessSubType: 'GENERAL_CARGO',
//           age20s: 93,
//           age30s: 23,
//           age40s: 44,
//           age50s: 51,
//           age60s: 44,
//           age70s: 81,
//           age80s: 23,
//           age90s: 45
//       },
//       {
//           userBusinessSubType: 'BUS',
//           age20s: Math.floor(Math.random() * 1000),
//           age30s: Math.floor(Math.random() * 1000),
//           age40s: Math.floor(Math.random() * 1000),
//           age50s: Math.floor(Math.random() * 1000),
//           age60s: Math.floor(Math.random() * 1000),
//           age70s: Math.floor(Math.random() * 1000),
//           age80s: Math.floor(Math.random() * 1000),
//           age90s: 0
//       },
//       {
//           userBusinessSubType: 'CHARTER_BUS',
//           age20s: Math.floor(Math.random() * 1000),
//           age30s: Math.floor(Math.random() * 1000),
//           age40s: Math.floor(Math.random() * 1000),
//           age50s: Math.floor(Math.random() * 1000),
//           age60s: Math.floor(Math.random() * 1000),
//           age70s: Math.floor(Math.random() * 1000),
//           age80s: Math.floor(Math.random() * 1000),
//           age90s: 0
//       },
//       {
//           userBusinessSubType: 'SPECIAL_PASSENGER',
//           age20s: Math.floor(Math.random() * 1000),
//           age30s: Math.floor(Math.random() * 1000),
//           age40s: Math.floor(Math.random() * 1000),
//           age50s: Math.floor(Math.random() * 1000),
//           age60s: Math.floor(Math.random() * 1000),
//           age70s: Math.floor(Math.random() * 1000),
//           age80s: Math.floor(Math.random() * 1000),
//           age90s: 0
//       },
//       {
//           userBusinessSubType: 'CORPORATE_TAXI',
//           age20s: Math.floor(Math.random() * 1000),
//           age30s: Math.floor(Math.random() * 1000),
//           age40s: Math.floor(Math.random() * 1000),
//           age50s: Math.floor(Math.random() * 1000),
//           age60s: Math.floor(Math.random() * 1000),
//           age70s: Math.floor(Math.random() * 1000),
//           age80s: Math.floor(Math.random() * 1000),
//           age90s: 0
//       },
//       {
//           userBusinessSubType: 'PRIVATE_TAXI',
//           age20s: Math.floor(Math.random() * 1000),
//           age30s: Math.floor(Math.random() * 1000),
//           age40s: Math.floor(Math.random() * 1000),
//           age50s: Math.floor(Math.random() * 1000),
//           age60s: Math.floor(Math.random() * 1000),
//           age70s: Math.floor(Math.random() * 1000),
//           age80s: Math.floor(Math.random() * 1000),
//           age90s: 0
//       },
//       {
//           userBusinessSubType: 'INDIVIDUAL_CARGO',
//           age20s: Math.floor(Math.random() * 1000),
//           age30s: Math.floor(Math.random() * 1000),
//           age40s: Math.floor(Math.random() * 1000),
//           age50s: Math.floor(Math.random() * 1000),
//           age60s: Math.floor(Math.random() * 1000),
//           age70s: Math.floor(Math.random() * 1000),
//           age80s: Math.floor(Math.random() * 1000),
//           age90s: 0
//       },
      
//   ],
//   statisticsTransEduYearAgeResponseDto: [
//       {
//           year: 2023,
//           age20s: Math.floor(Math.random() * 1000),
//           age30s: Math.floor(Math.random() * 1000),
//           age40s: Math.floor(Math.random() * 1000),
//           age50s: Math.floor(Math.random() * 1000),
//           age60s: Math.floor(Math.random() * 1000),
//           age70s: Math.floor(Math.random() * 1000),
//           age80s: Math.floor(Math.random() * 1000),
//           age90s: 0
//       },
//       {
//         year: 2022,
//         age20s: Math.floor(Math.random() * 1000),
//         age30s: Math.floor(Math.random() * 1000),
//         age40s: Math.floor(Math.random() * 1000),
//         age50s: Math.floor(Math.random() * 1000),
//         age60s: Math.floor(Math.random() * 1000),
//         age70s: Math.floor(Math.random() * 1000),
//         age80s: Math.floor(Math.random() * 1000),
//         age90s: 0
//     },
//     {
//       year: 2021,
//       age20s: Math.floor(Math.random() * 1000),
//       age30s: Math.floor(Math.random() * 1000),
//       age40s: Math.floor(Math.random() * 1000),
//       age50s: Math.floor(Math.random() * 1000),
//       age60s: Math.floor(Math.random() * 1000),
//       age70s: Math.floor(Math.random() * 1000),
//       age80s: Math.floor(Math.random() * 1000),
//       age90s: 0
//   },
//   {
//     year: 2020,
//     age20s: Math.floor(Math.random() * 1000),
//     age30s: Math.floor(Math.random() * 1000),
//     age40s: Math.floor(Math.random() * 1000),
//     age50s: Math.floor(Math.random() * 1000),
//     age60s: Math.floor(Math.random() * 1000),
//     age70s: Math.floor(Math.random() * 1000),
//     age80s: Math.floor(Math.random() * 1000),
//     age90s: 0
// },{
//   year: 2019,
//   age20s: Math.floor(Math.random() * 1000),
//   age30s: Math.floor(Math.random() * 1000),
//   age40s: Math.floor(Math.random() * 1000),
//   age50s: Math.floor(Math.random() * 1000),
//   age60s: Math.floor(Math.random() * 1000),
//   age70s: Math.floor(Math.random() * 1000),
//   age80s: Math.floor(Math.random() * 1000),
//   age90s: 0
// },{
//   year: 2018,
//   age20s: Math.floor(Math.random() * 1000),
//   age30s: Math.floor(Math.random() * 1000),
//   age40s: Math.floor(Math.random() * 1000),
//   age50s: Math.floor(Math.random() * 1000),
//   age60s: Math.floor(Math.random() * 1000),
//   age70s: Math.floor(Math.random() * 1000),
//   age80s: Math.floor(Math.random() * 1000),
//   age90s: 0
// }
//   ]
// }


interface Queries {
  year: number;
  courseClassSeq?: number;
  courseSeq?: number;
}
const currentYear = new Date().getFullYear();
const defaultYearArray = Array.from({length: (currentYear - 2021) + 1}, (_, i) => 2021 + i).reverse()

export default function Overall() {
  const [queries, setQueries] = useState<Queries>(null)
  const [submitValue, setSubmitValue] = useState(null);
  const { data, course, period, getCourses, getStatistics, isStatisticsLoading } = useStatistics(submitValue);
  
  const onChangeQueries = async(e: SelectChangeEvent<unknown>) => {
    const { name,value } = e.target;
    setQueries({
      ...queries,
      [name]: value
    }) 
  }

  const onClickGetStatistics = async () => {
    try {
      await getStatistics({
        courseClassSeq: queries.courseClassSeq,
        courseSeq: queries.courseSeq,
        year: queries.year
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(!data) return;
    console.log(data)
  },[data])
  return (
    <Wrapper>
      
      <Header>
        <Title>현황 통계</Title>
        <ExcelDownloadButton>
          <Typography>(전체) 통계 엑셀 다운로드</Typography>
          <Download />
        </ExcelDownloadButton>
      </Header>

       <Main>
        <SelectForm>
          <FormControl>
            <InputLabel id="year">교육년도</InputLabel>
            <StyledSelect
              label="교육년도"
              name="year"
              onChange={onChangeQueries}
              value={queries?.year || ''}
              variant="outlined"
              >
              {
                defaultYearArray.map((year, i) => (
                  <MenuItem key={i} value={year || ''} onClick={() => getCourses(year)}>{year}</MenuItem>
                ))
              }
            </StyledSelect>
          </FormControl>

          <FormControl>
            <InputLabel id="course">과정</InputLabel>
            <StyledSelect
              label="과정"
              name="courseSeq"
              onChange={onChangeQueries}
              variant="outlined"
              value={queries?.courseSeq || ''}
              labelId='course'
              disabled={!queries?.year}
              >
              {
                course?.map((course, i) => (
                  <MenuItem
                    key={i} value={course.courseSeq || ''}
                    onClick={() => {
                      setQueries({...queries, courseSeq: course.courseSeq})
                      setSubmitValue({...queries, courseSeq: course.courseSeq})
                    }}
                    >{course.courseName}</MenuItem>
                )) 
              }
            </StyledSelect>
          </FormControl>

          <FormControl>
            <InputLabel id="period">과정기수</InputLabel>
            <StyledSelect
              label="과정기수"
              name="courseClassSeq"
              value={queries?.courseClassSeq || ''}
              onChange={onChangeQueries}
              variant="outlined"
              labelId='period'
              disabled={!queries?.courseSeq}
              >
              {
                period?.data.map((period, i) => (
                  <MenuItem
                    key={i} value={period?.courseClassSeq || ''}
                    onClick={() => setQueries({...queries, courseClassSeq: period?.courseClassSeq})}
                    >{period?.yearAndStep}</MenuItem>
                ))
              }
            </StyledSelect>
          </FormControl>
          <ConfirmSearchButton
            onClick={onClickGetStatistics}
          variant="contained"
          >통계 확인
          </ConfirmSearchButton>
        </SelectForm>
        {
          isStatisticsLoading
          ? <div>loading...</div>
          :
          <>
            <InfoMessage>"교육년도, 과정, 과정기수"를 선택하고 "통계 확인"을 눌러 확인하세요.</InfoMessage>
            <Whole data={data?.statisticsTransEduIntegratedResponseDto} />
            <FluctuationInBusiness data={data?.statisticsTransEduCategoryResponseDto} />
            <RegistrationAddress data={data?.statisticsTransEduCarRegisteredRegionResultResponseDto} />
            <FluctuationByPeriod data={data?.statisticsTransEduStepResponseDto} />
            <FluctuationByBusiness data={data?.statisticsTransEduCategoryIncreaseResponseDto} />
            <YearlyAgeByBusiness data={data?.statisticsTransEduCategoryAgeResponseDto} />
            <ComparisonAgeByYearly data={data?.statisticsTransEduYearAgeResponseDto} />
          </>
        }
      </Main>
      
      
    </Wrapper>
  )
}

const InfoMessage = styled(Typography)`
  font-size: 0.9rem;
  margin-bottom: 2rem;
  color: #BF3133;
`

const ConfirmSearchButton = styled(Button)`
  width: 140px;
  height:48px;
  color:white;
  font-size: 1.15rem;
  margin-left: 1rem;
`

const StyledSelect = styled(Select)`
  width: 180px;
  
`

const SelectForm = styled(Box)`
  align-self: flex-start;
  display:flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #222;
`

const Main = styled(Box)`
  width: 100%;
  height: auto;
`

const Header = styled(Box)`
  width:100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
`;

const ExcelDownloadButton = styled(Button)`
  display:flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  background-color: #38761D;
  color:white;
  font-size: 1.15rem;
  padding: .5rem 1rem;

  &:hover {
    background-color: #306719;
  }
`
const Title = styled(Typography)`
  font-weight: bold;
  font-size: 1.5rem;
`

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
`
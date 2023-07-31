import { ServiceBoard } from '@components/ui/ServiceBoard';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';


export function Service() {
  return (
    <>
      <Image src={'/assets/images/customer_center.png'} alt='서비스' width={1920} height={262} layout='intrinsic'/>
      <ServiceBoard />
    </>
  );
}

import styled from '@emotion/styled';
import { ArrowRightOutlined } from '@mui/icons-material'
import { Box } from '@mui/material';
import Link from 'next/link'

interface Props {
  href: string;
  text: string;
}

export default function NavigationItem({ href, text }: Props) {
  return (
    <ItemWrapper>
      <Link href={href}>{text}</Link>
      <ArrowRightOutlined />
    </ItemWrapper>
  )
}

const ItemWrapper = styled(Box)`
  width: 100%;
  height: 60px;
  font-size: 18px;
  font-weight: 500;
  color: #777;
  text-decoration: none;
  display:flex;
  align-items:center;
  justify-content: space-between;
  &:hover {
    background-color: #f3f3f3;
  }
  border-bottom: 1px solid #e5e5e5;
`

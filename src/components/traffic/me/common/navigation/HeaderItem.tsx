import React from 'react'
import { CenterDropdownLink, DropdownLinkBox } from './TopNavigation'
import Link from 'next/link'

interface Props {
    title: string;
    href: string;
}


export default function HeaderItem({title, href}: Props) {
  return (
    <DropdownLinkBox>
      <Link href={href} passHref>
        <CenterDropdownLink className='header-link'>{title}</CenterDropdownLink>
      </Link>
    </DropdownLinkBox>
  )
}

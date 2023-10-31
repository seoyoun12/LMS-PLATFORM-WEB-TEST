import React from 'react'
import { DropDownItem, DropDownText } from '../TopNavigation'
import Link from 'next/link'

interface Props {
  href: string;
  title: string;
  isExternal?: boolean
}

export default function DropdownItem({href,title,isExternal}: Props) {
  return (
    <DropDownItem>
      <Link href={href} passHref>
        {
          isExternal
          ? <a target='_blank'><DropDownText className='child-link'>{title}</DropDownText></a>
          : <DropDownText className='child-link'>{title}</DropDownText> 
        }
        
      </Link>
    </DropDownItem>
  )
}

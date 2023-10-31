import { CenterNavigationBar, LeftNavigationBar, RightNavigationBar, Wrapper } from './TopNavigation'
import Link from 'next/link'
import Image from 'next/image'
import { AccountMenu } from '@components/ui'
import HeaderItem from './HeaderItem'

const 센터네비게이션리스트 = [
  {
    title: '학습자료',
    href: '/traffic/learning-material/education',
    isExternal: false,
  },
  {
    title: '온라인교육',
    href: '/traffic/class-room',
    isExternal: false,
  },
  {
    title: '마이페이지',
    href: '/traffic/me',
    isExternal: false,
  },
  {
    title: '고객센터',
    href: '/traffic/service?tab=Notice',
    isExternal: false,
  },
  {
    title: '메타버스',
    href: 'https://zep.us/@ctti',
    isExternal: true,
  },
]

export default function Header() {
  return (
    <Wrapper >
        <LeftNavigationBar>
          <Link href="/" passHref>
            <Image src="/assets/images/ctsoecLogo.png" height={40} width={230} alt="ctti logo" />
          </Link>
        </LeftNavigationBar>
        
        <CenterNavigationBar>
          { 센터네비게이션리스트.map((item) => <HeaderItem key={item.href} href={item.href} title={item.title} />)}
        </CenterNavigationBar>

        <RightNavigationBar>
          <AccountMenu />
        </RightNavigationBar>
      </Wrapper>
  )
}

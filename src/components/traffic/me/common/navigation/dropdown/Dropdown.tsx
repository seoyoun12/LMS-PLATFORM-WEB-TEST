import { CenterNavigationBar, DropdownWrapper, LeftNavigationBar, RightNavigationBar } from '../TopNavigation'
import DropdownList from './DropdownList'

const 학습자료 = [{title: '교통안전교육',href: '/traffic/learning-material/education'},{title: '연령별 학습지도안',href: '/traffic/learning-material/learning-guide'},{title: '타기관 자료모음',href: '/traffic/learning-material/reference'}]
const 온라인교육 = [{title: '신청하기',href: '/traffic/stebMove/steb1'},{title: '학습하기',href: '/traffic/class-room'}]
const 마이페이지 = [{title: '학습현황',href: '/traffic/me/learning-status'},{title: '증명서발급',href: '/traffic/me/cert'},{title: '온라인 학습 신청내역',href: '/traffic/me/my-course'}]
const 고객센터 = [{title: '공지사항',href: '/traffic/service?tab=Notice'},{title: '자주묻는질문',href: '/traffic/service?tab=Faq'},{title: '교육문의',href: '/traffic/service?tab=Question'},{title: '문의내역조회',href: '/traffic/service?tab=Look'}]
const 메타버스 = [{title: '메타버스',href: 'https://zep.us/@ctti',isExternal: true}]

export default function Dropdown() {
  return (
    <DropdownWrapper sx={{color:'#121b2e'}}>
      <LeftNavigationBar />
        <CenterNavigationBar>
          <DropdownList list={학습자료} />
          <DropdownList list={온라인교육} />
          <DropdownList list={마이페이지} />
          <DropdownList list={고객센터} />
          <DropdownList list={메타버스} />
        </CenterNavigationBar>
      <RightNavigationBar />
    </DropdownWrapper>
  )
}


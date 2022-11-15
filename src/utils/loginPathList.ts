import { UserRole } from '@common/api/user';

export const notNeededLoginPathList: { href: string }[] = [
  { href: 'category' },
  { href: 'service' },
  { href: 'learning-material' },
  { href: 'sign-in' },
  { href: 'sign-up' },
  { href: 'find' },
  { href: 'guide' },
  { href: 'stebMove/steb1' },
  { href: 'term' },
  // { href: 'stebMove/steb2' },
  // { href: 'stebMove/steb3' },
  // { href: 'me' },
  // { href: 'edit' },
];

/**
 * 유저 , 어드민 공통으로 사용합니다
 * localStorage로 운수, 저상, 도민인지 판단하고 localStorage에 없으면 판단이 불가하므로 루트페이지로 리다이렉트 합니다.
 * 해당 변수는 판단필요가 없는 바로 들어가도 되는 사이트가 맞는지 판단하는 변수입니다.
 * 어드민은 애초에 site_course_type이 필요하지 않습니다.
 */
export const notNeededSiteCourseTypePathList: { href: string }[] = [
  { href: 'term' },
  { href: 'admin-center'}
]

//운수저상도민 공통으로 사용하는 주소
export const allowCommonPahtLis: { href: string }[] = [{ href: 'me' }];

export const allowUserPahtList: { href: string; roles: UserRole[] }[] = [
  {
    href: '/traffic/stebMove',
    roles: [UserRole.ROLE_TRAFFIC_SAFETY_MANAGER, UserRole.ROLE_TRAFFIC_SAFETY_USER],
  },
  { href: '/stebMove', roles: [UserRole.ROLE_TRANS_MANAGER, UserRole.ROLE_TRANS_USER] },
];

export const onlyAdminPahtList: { href: string }[] = [{ href: 'admin-center' }];

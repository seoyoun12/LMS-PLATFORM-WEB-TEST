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
  // { href: 'me' },
  // { href: 'edit' },
];

export const allowUserPahtList: { href: string; roles: UserRole[] }[] = [
  { href: '/traffic/stebMove', roles: [UserRole.ROLE_TRAFFIC_SAFETY_MANAGER, UserRole.ROLE_TRAFFIC_SAFETY_USER] },
  { href: '/stebMove', roles: [UserRole.ROLE_TRANS_MANAGER, UserRole.ROLE_TRANS_USER] },
];

export const onlyAdminPahtList: { href: string }[] = [{ href: 'admin-center' }];

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Drawer } from '@components/admin-center';
import { Layout } from '@layouts/Layout';
import { useRouter } from 'next/router';
import { useSnackbar } from '@hooks/useSnackbar';
import { getMyUser, MyUser, UserRole } from '@common/api/user';
import { Spinner } from '@components/ui';

export const AdminCenterLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [loading , setLoading] = useState(true)

  useLayoutEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const { data }: { data: MyUser } = await getMyUser();
        if(!data || !data.roles.includes(UserRole.ROLE_ADMIN)){
          window.alert('권한이 없습니다.');
          router.back();
          setLoading(false);
        }
        console.log('뭐ㅜ야')
        setLoading(false);
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
        setLoading(false);
      }
    })();
  }, [router]);

  if(loading) return <Spinner />
  return (
    <Layout>
      <Drawer>{children}</Drawer>
    </Layout>
  );
};

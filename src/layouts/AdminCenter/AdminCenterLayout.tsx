import React, { useLayoutEffect, useRef, useState } from 'react';
import { Drawer } from '@components/admin-center';
import { Drawer02 } from '@components/admin-center';
import { Layout } from '@layouts/Layout';
import { useRouter } from 'next/router';
import { useSnackbar } from '@hooks/useSnackbar';
import { getMyUser, MyUser, UserRole } from '@common/api/user';
import { Spinner } from '@components/ui';

export const AdminCenterLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    (async function () {
      try {
        if (!localStorage.getItem('ACCESS_TOKEN')) {
          window.alert('권한이 없습니다.');
          return router.push('/admin-center/signin');
        }
        setLoading(true);
        const { data }: { data: MyUser } = await getMyUser();
        if (!data || !data.roles.includes(UserRole.ROLE_ADMIN)) {
          window.alert('권한이 없습니다.');
          return router.push('/admin-center/signin');
        }
        setLoading(false);
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
        router.back();
      }
    })();
  }, [router]);

  if (loading) return <Spinner />;
  return (
    <Layout>
      <Drawer>{children}</Drawer>
      {/* <Drawer02>{children}</Drawer02> */}
    </Layout>
  );
};

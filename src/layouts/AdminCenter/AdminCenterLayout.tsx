import React from 'react';
import { Drawer } from '@components/admin-center';
import { Layout } from '@layouts/Layout';

export const AdminCenterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Drawer>
        {children}
      </Drawer>
    </Layout>
  );
};

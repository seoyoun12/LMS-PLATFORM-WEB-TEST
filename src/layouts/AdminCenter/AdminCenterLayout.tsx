import React from 'react';
import { Drawer } from '@components/admin-center';
import { Layout } from '@layouts/Layout';

export const AdminCenterLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Drawer>
        {children}
      </Drawer>
    </Layout>
  );
};

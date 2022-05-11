import React from 'react';
import { Drawer } from '@components/tutor-center';
import { Layout } from '@layouts/Layout';

export const TutorCenterLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Drawer>
        {children}
      </Drawer>
    </Layout>
  );
};

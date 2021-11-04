import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { SidebarDrawerProvider } from './sidebarDrawer';

interface IAppProvider {
  children: ReactNode;
}

const AppProvider: React.FC<IAppProvider> = ({ children }: IAppProvider) => (
  <AuthProvider>
    <SidebarDrawerProvider>{children}</SidebarDrawerProvider>
  </AuthProvider>
);

export default AppProvider;

import { useEffect, useContext, createContext, ReactNode } from 'react';

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

interface ISidebarDrawerProviderProps {
  children: ReactNode;
}

type ISidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as ISidebarDrawerContextData);

const SidebarDrawerProvider = ({ children }: ISidebarDrawerProviderProps) => {
  const disclosure = useDisclosure();

  const { pathname } = useLocation();

  useEffect(() => {
    disclosure.onClose();
    // Não deve-se adicionar o disclosure a condição
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

function useSidebarDrawer(): ISidebarDrawerContextData {
  const context = useContext(SidebarDrawerContext);

  if (!context) {
    throw new Error(
      'useSidebarDrawer must be used within an SidebarDrawerProvider',
    );
  }

  return context;
}

export { SidebarDrawerProvider, useSidebarDrawer };

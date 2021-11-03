import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import SignIn from './pages/SignIn';

import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <SignIn />
    </ChakraProvider>
  );
};

export default App;

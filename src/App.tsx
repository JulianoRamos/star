import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { theme } from './styles/theme';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AppProvider>
          <Routes />
        </AppProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;

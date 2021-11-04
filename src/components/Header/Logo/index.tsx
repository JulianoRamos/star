import React from 'react';
import { Text } from '@chakra-ui/react';

const Logo: React.FC = () => {
  return (
    <Text
      fontSize={['xl', '2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      Dashboard
      <Text as="span" ml="1" color="pink.500">
        .
      </Text>
    </Text>
  );
};

export default Logo;

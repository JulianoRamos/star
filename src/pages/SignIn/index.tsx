import { Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const SignIn: React.FC = () => {
  return (
    <Flex w="100vw" h="100vh">
      Imagem
      <Flex w="100%" maxWidth={488} flexDir="column">
        <Stack spacing={4}>
          <Flex justify="space-between">
            <Text>Entre na sua conta</Text>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default SignIn;

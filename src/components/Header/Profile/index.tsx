import React from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '../../../hooks/auth';

interface IProfileProps {
  showProfileData: boolean;
}

const Profile: React.FC<IProfileProps> = ({ showProfileData }) => {
  const { user } = useAuth();

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user.name}</Text>
          <Text color="gray.300" fontSize="sm">
            {user.email}
          </Text>
        </Box>
      )}

      <Avatar size="md" name={user.name} src={user.avatarUrl} />
    </Flex>
  );
};

export default Profile;

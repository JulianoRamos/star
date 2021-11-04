import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import Header from '../../components/Header';
import Pagination from '../../components/shared/Pagination';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    setLoading(true);

    async function load() {
      const { data, headers } = await api.get('/users', {
        params: {
          page: page + 1,
        },
      });

      const xtotalCount = Number(headers['x-total-count']);

      setUsers(data.users);
      setTotalCount(xtotalCount);
      setLoading(false);
    }

    load();
  }, [page]);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Link to="/users/create">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
              >
                Criar usuário
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : users.length === 0 ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    {isWideVersion && <Th width="8" />}
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>

                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        {isWideVersion && (
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize={16} />
                              }
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Users;

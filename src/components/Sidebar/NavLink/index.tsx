import React, { ElementType } from 'react';
import { Icon, Link as ChakraLink, LinkProps, Text } from '@chakra-ui/react';
import ActiveLink from '../ActiveLink';

interface INavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

const NavLink: React.FC<INavLinkProps> = ({
  icon,
  children,
  href,
  ...rest
}) => {
  return (
    <ActiveLink to={href}>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize={20} />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
};

export default NavLink;

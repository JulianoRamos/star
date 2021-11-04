import { cloneElement, ReactElement } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

interface IActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

const ActiveLink = ({
  children,
  shouldMatchExactHref = false,
  ...rest
}: IActiveLinkProps) => {
  let isActive = false;
  const { pathname } = useLocation();

  if (
    shouldMatchExactHref &&
    (pathname === rest.href || pathname === rest.to)
  ) {
    isActive = true;
  }

  if (
    !shouldMatchExactHref &&
    (pathname.startsWith(String(rest.href)) ||
      pathname.startsWith(String(rest.to)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
};

export default ActiveLink;

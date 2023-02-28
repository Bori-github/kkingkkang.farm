import { useRouter } from 'next/router';
import { ReactChild } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactChild;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <main>{children}</main>
      {pathname !== '/' && <Navigation />}
    </>
  );
};

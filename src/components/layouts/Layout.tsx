import { ReactChild } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactChild;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main>{children}</main>
      <Navigation />
    </>
  );
};

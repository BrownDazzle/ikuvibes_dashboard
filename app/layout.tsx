// app/layout.tsx
import React, { ReactNode } from 'react';
import { Poppins } from 'next/font/google';

import './globals.css';
import { ContextProvider } from '@/contexts/ContextProvider';
import Provider from '@/lib/providers/session-provider';
import { Session } from 'next-auth';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'IkuVibes - Dashboard',
  description: 'IkuVibes is a platform for free music and video downloads.',
};

interface LayoutProps {
  children: ReactNode;
  session: never;
}

const Layout: React.FC<LayoutProps> = ({ children, session }) => {
  return (
    <html lang="en">
      <head>
        {/* Add your head elements here */}
        <title>{metadata.title}</title>
        {/* Add other head elements */}
      </head>
      <body className={poppins.variable}>
        <Provider session={session as never}>
          <ContextProvider>{children}</ContextProvider>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;

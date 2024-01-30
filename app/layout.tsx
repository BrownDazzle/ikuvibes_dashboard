import React, { ReactNode } from 'react'
import { Poppins } from 'next/font/google'

import './globals.css'
import { ContextProvider } from '@/contexts/ContextProvider'
import Provider from '@/lib/providers/session-provider'
import { Session } from 'next-auth'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'IkuVibes - Dashboard',
  description: 'IkuVibes is a platform for free music and video downloads.',
}

type LayoutProps = {
  children: ReactNode;
  session: Session;
};

const RootLayout: React.FC<LayoutProps> = ({ children, session }) => {
  return (
    <Provider session={session}>
      <ContextProvider>
        <>
          <html lang="en">
            <body className={poppins.variable}>{children}</body>
          </html>
        </>
      </ContextProvider>
    </Provider>
  )
}

export default RootLayout

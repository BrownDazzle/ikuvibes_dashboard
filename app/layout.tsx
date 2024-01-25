import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'MellowMusic - Dashboard',
  description: 'MellowMusic is a platform for free music and video downloads.',
  /*icons: {
    icon: '/assets/images/logo.svg'
  }*/
}

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode; session: Session
}) {
  return (
    <Provider session={session}>
      <ContextProvider>
        <html lang="en">
          <body className={poppins.variable}>{children}</body>
        </html>
      </ContextProvider>
    </Provider>
  )
}

/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import TopNav from '@/app/ui/TopNav'
import './styles/inspire.css'
import Socials from './ui/Socials'

export const metadata: Metadata = {
  title: 'Inspire Girls Academy',
  description:
    'Inspire Girls Academy is a football club for femail player that wish to progress from grassroot to compete at an eleite level and persue a career in sports.',
  icons: {
    icon: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          data-n-head="ssr"
          rel="stylesheet"
          href="https://use.typekit.net/wcy1ghe.css"
        ></link>
      </head>
      <body>
        <TopNav />
        {children}
        <Socials />
      </body>
    </html>
  )
}

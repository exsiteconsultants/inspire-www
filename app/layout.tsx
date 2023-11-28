import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import Socials from '../ui/Socials'
import TopNav from '../ui/TopNav'
import './global.css'

export const metadata: Metadata = {
  title: 'Inspire Girls Academy',
  description:
    'Inspire Girls Academy is a football club for femail player that wish to progress from grassroot to compete at an elite level and persue a career in sports.',
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
        <Analytics />
        <Socials />
      </body>
    </html>
  )
}

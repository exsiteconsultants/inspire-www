import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/app/ui/Header'
import Socials from '@/app/ui/Socials'
import Sponsors from '@/app/ui/Sponsors'
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
  metadataBase: new URL('https://www.inspiregirlsacademy.co.uk/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-GB': '/en-GB',
    },
  },
  openGraph: {
    images: '/images/iga_logo.webp',
  },
}

export const RootLayout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => (
  <html lang="en">
    <head>
      <link
        data-n-head="ssr"
        rel="stylesheet"
        href="https://use.typekit.net/wcy1ghe.css"
      ></link>
    </head>
    <body>
      <Header />
      {children}
      <Sponsors />
      <Socials />
      <Analytics />
    </body>
  </html>
)

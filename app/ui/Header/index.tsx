import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'
import DesktopNavbar from '../DesktopNavbar/DesktopNavBar'
import MobileNavBar from '../MobileNavbar/MobileNavBar'

const menuItemsData = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Teams',
    submenu: [
      {
        title: 'U12',
        url: '/squad/u12',
      },
      {
        title: 'U13',
        url: '/squad/u13',
      },
      {
        title: 'U15',
        url: '/squad/u15',
      },
      {
        title: 'U16',
        url: '/squad/u16',
      },
    ],
  },
  {
    title: 'Staff',
    submenu: [
      {
        title: 'Coaches',
        url: '/staff/coaches',
      },
      {
        title: 'Committee',
        url: '/staff/committee',
      },
    ],
  },
  {
    title: 'About',
    submenu: [
      {
        title: 'IGA History',
        url: '/about/history',
      },
      {
        title: 'Our Mission',
        url: '/about/mission',
      },
    ],
  },
  {
    title: 'Contact',
    url: '/contact',
  },
]

export const Header = () => (
  <div className={styles.header}>
    <Link href="/" className={styles.logo}>
      <Image
        src="/images/iga_logo.webp"
        height={50}
        width={50}
        className={styles.logoImage}
        alt="IGA Logo"
      />
      <span className={styles.siteName}>Inspire Girls Academy</span>
    </Link>

    <DesktopNavbar items={menuItemsData} />
    <MobileNavBar items={menuItemsData} />
  </div>
)

export default Header

'use client'

import Link from 'next/link'
import styles from './styles.module.css'

const menuItemsData = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Teams',
    url: '/',
    subMenu: [
      {
        title: 'U12',
        url: '/',
      },
      {
        title: 'U13',
        url: '/',
      },
    ],
  },
  {
    title: 'Staff',
    url: '/staff',
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
]

export const Menu = () => (
  <nav>
    <ul className={styles.mainNav}>
      {menuItemsData.map((item) => (
        <li key={item.url} className={styles.mainNavItem}>
          <Link href={item.url} className={styles.mainNavItemLink}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

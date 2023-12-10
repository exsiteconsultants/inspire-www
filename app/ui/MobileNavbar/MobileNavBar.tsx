'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MenuItemData } from '@/app/lib/types'
import { MobileMenuItems } from './MobileMenuItems'
import styles from './styles.module.css'
import { usePathname } from 'next/navigation'

export const MobileNavBar: React.FC<{ items: MenuItemData[] }> = ({
  items,
}) => {
  const depthLevel = 0
  const [showMenu, setShowMenu] = useState(false)
  let ref = useRef<HTMLUListElement>(null)

  // Listen for next JS navigation events, when the page changes we want to close the menu
  const pathname = usePathname()

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  return (
    <nav className={styles.mobileNav}>
      <button
        className={styles.menuButton}
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <svg
          className={styles.menuIcon}
          viewBox="0 0 100 100"
          width="20"
          height="20"
        >
          <rect width="100" height="20"></rect>
          <rect y="40" width="100" height="20"></rect>
          <rect y="80" width="100" height="20"></rect>
        </svg>
      </button>

      {showMenu && (
        <ul className={styles.menus} ref={ref}>
          {items.map((menu, index) => {
            return (
              <MobileMenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
              />
            )
          })}
        </ul>
      )}
    </nav>
  )
}

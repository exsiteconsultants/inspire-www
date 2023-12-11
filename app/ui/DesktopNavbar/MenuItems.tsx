'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Dropdown } from './Dropdown'
import { MenuItemData } from '../../lib/types'
import styles from './styles.module.css'

const MenuItems: React.FC<{
  items: MenuItemData
  depthLevel: number
}> = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false)
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement
      if (dropdown && ref.current && !ref.current.contains(target)) {
        setDropdown(false)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [dropdown])

  const onMouseEnter = () => {
    setDropdown(true)
  }

  const onMouseLeave = () => {
    setDropdown(false)
  }

  const toggleDropdown = () => {
    setDropdown((prev) => !prev)
  }

  const closeDropdown = () => {
    dropdown && setDropdown(false)
  }

  return (
    <li
      className={styles.menuItems}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => toggleDropdown()}
          >
            <Link href={items.url}>{items.title}</Link>
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
          >
            {items.title}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link href={items.url || ''}>{items.title}</Link>
      )}
    </li>
  )
}

export default MenuItems

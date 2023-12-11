import { useRouter } from 'next/navigation'
import { MenuItemData } from '@/app/lib/types'
import MobileDropdown from './MobileDropdown'
import styles from './styles.module.css'

const MobileMenuItems: React.FC<{
  items: MenuItemData
  depthLevel: number
  showMenu: boolean
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ items, depthLevel, showMenu, setShowMenu }) => {
  const router = useRouter()

  const ActiveLink: React.FC<{
    href: string
    children: React.ReactNode
  }> = ({ children, href }) => {
    const handleClick = (e: { preventDefault: () => void }) => {
      e.preventDefault()
      setShowMenu(false)
      router.push(href)
    }

    return (
      <a href={href} onClick={handleClick}>
        {children}
      </a>
    )
  }

  return (
    <li className={styles.menuItems}>
      {items.url && items.submenu ? (
        <>
          <ActiveLink href={items.url}>{items.title}</ActiveLink>
          <MobileDropdown
            depthLevel={depthLevel}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
            submenus={items.submenu}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button type="button" aria-haspopup="menu" aria-expanded={true}>
            {items.title}
          </button>
          <MobileDropdown
            depthLevel={depthLevel}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
            submenus={items.submenu}
          />
        </>
      ) : (
        <ActiveLink href={items.url || ''}>{items.title}</ActiveLink>
      )}
    </li>
  )
}

export default MobileMenuItems

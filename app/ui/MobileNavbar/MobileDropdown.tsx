import { MenuItemData } from '@/app/lib/types'
import MobileMenuItems from './MobileMenuItems'
import styles from './styles.module.css'

export const MobileDropdown: React.FC<{
  submenus: MenuItemData[]
  depthLevel: number
  showMenu: boolean
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowMenu, showMenu, submenus, depthLevel }) => {
  depthLevel = depthLevel + 1

  const classNames = [styles.dropdown]

  if (depthLevel > 1) classNames.push(styles.dropdownSubmenu)
  classNames.push(styles.show)

  return (
    <ul className={classNames.join(' ')}>
      {submenus.map((submenu, index) => (
        <MobileMenuItems
          items={submenu}
          key={index}
          depthLevel={depthLevel}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
        />
      ))}
    </ul>
  )
}

export default MobileDropdown

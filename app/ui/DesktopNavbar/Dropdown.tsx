import { MenuItems } from './MenuItems'
import { MenuItemData } from '../../lib/types'
import styles from './styles.module.css'

export const Dropdown: React.FC<{
  submenus: MenuItemData[]
  dropdown: boolean
  depthLevel: number
}> = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1

  const classNames = [styles.dropdown]
  if (depthLevel > 1) classNames.push(styles.submenu)
  if (dropdown) classNames.push(styles.show)

  return (
    <ul className={classNames.join(' ')}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  )
}

import { MenuItems } from './MenuItems'
import { MenuItemData } from '../../lib/types'
import styles from './styles.module.css'

export const DesktopNavbar: React.FC<{ items: MenuItemData[] }> = ({
  items,
}) => (
  <nav className={styles.desktopNavBar}>
    <ul className={styles.menus}>
      {items.map((menu, index) => (
        <MenuItems items={menu} key={index} depthLevel={0} />
      ))}
    </ul>
  </nav>
)

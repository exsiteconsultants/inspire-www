import { Dispatch, SetStateAction } from 'react'
import styles from './styles.module.css'

const TabNav: React.FC<{
  options: string[]
  selectedTab: string
  setSelectedTab: Dispatch<SetStateAction<string>>
}> = ({ options, selectedTab, setSelectedTab }) => (
  <ul className={styles.tabNav} role="tablist">
    {options.map((option) => (
      <li
        key={option}
        role="presentation"
        className={`${styles.tabNavItem} ${
          option === selectedTab ? styles.isActive : ''
        } `}
      >
        <a
          onClick={() => setSelectedTab(option)}
          role="tab"
          aria-selected={option === selectedTab}
        >
          {option}
        </a>
      </li>
    ))}
  </ul>
)

export default TabNav

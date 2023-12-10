import Link from 'next/link'
import styles from './styles.module.css'

export const TabNav: React.FC<{
  options: string[]
  selectedTab: string
}> = ({ options, selectedTab }) => (
  <ul className={styles.tabNav} role="tablist" id="tab-nav">
    {options.map((option) => (
      <li
        key={option}
        role="presentation"
        className={`${styles.tabNavItem} ${
          option === selectedTab ? styles.isActive : ''
        } `}
      >
        <Link
          id={`link-${option}`}
          href={`/${option}#link-${option}`}
          role="tab"
          aria-selected={option === selectedTab}
        >
          {option}
        </Link>
      </li>
    ))}
  </ul>
)

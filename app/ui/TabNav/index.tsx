import Link from 'next/link'
import styles from './styles.module.css'

const TabNav: React.FC<{
  options: string[]
  selectedTab: string
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>
}> = ({ options, selectedTab, setSelectedTab }) => {
  const onSelectTab = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const tab = event.currentTarget.innerText
    setSelectedTab(tab)
  }

  return (
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
            onClick={onSelectTab}
            role="tab"
            aria-selected={option === selectedTab}
          >
            {option}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TabNav

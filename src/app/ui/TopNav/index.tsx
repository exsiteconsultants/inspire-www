import styles from './styles.module.css'

const TopNav = () => (
  <div className={styles.topnav}>
    <a href="/" className={styles.logo}>
      <img
        className={styles.logoImage}
        src="/images/iga_logo.webp"
        alt="IGA Logo"
      />
      <span className={styles.siteName}>Inspire Girls Academy</span>
    </a>

    <nav>
      <ul className={styles.mainNav}>
        <li className={styles.mainNavItem}>
          <a href="/" className={styles.mainNavItemLink}>
            Home
          </a>
        </li>
        <li className={styles.mainNavItem}>
          <a href="/staff" className={styles.mainNavItemLink}>
            Staff
          </a>
        </li>
        <li className={styles.mainNavItem}>
          <a href="/about" className={styles.mainNavItemLink}>
            About
          </a>
        </li>
        <li className={styles.mainNavItem}>
          <a href="/contact" className={styles.mainNavItemLink}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </div>
)

export default TopNav

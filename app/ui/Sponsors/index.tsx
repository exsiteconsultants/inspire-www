import { Quicksand } from 'next/font/google'
import styles from './styles.module.css'
import Link from 'next/link'

const exsiteFont = Quicksand({
  weight: '400',
  subsets: ['latin'],
})

export const Sponsors = () => (
  <ul className={styles.sponsors}>
    <li className={styles.sponsor}>
      <Link
        href="/sponsors/exsite"
        className={`${exsiteFont.className} ${styles.exsiteLogo}`}
      >
        E<span className={styles.exsiteHighlight}>x</span>site.
        <span className={styles.exsiteHighlight}>dev</span>
      </Link>
    </li>
  </ul>
)

export default Sponsors

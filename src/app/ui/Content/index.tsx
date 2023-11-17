import styles from './styles.module.css'

export const Content: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => <div className={styles.content}>{children}</div>

export default Content

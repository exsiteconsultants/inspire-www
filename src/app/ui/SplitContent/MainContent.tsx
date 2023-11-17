import styles from './styles.module.css'

export const MainContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.mainContent}>{children}</div>
}

import styles from './styles.module.css'

export const Grid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.grid}>{children}</div>
)

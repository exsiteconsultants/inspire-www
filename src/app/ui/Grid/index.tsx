import styles from './styles.module.css'

const Grid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.grid}>{children}</div>
)

export default Grid

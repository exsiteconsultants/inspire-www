import styles from './styles.module.css'

export const ThreeColumnSplit: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.threeColumnSplit}>{children}</div>

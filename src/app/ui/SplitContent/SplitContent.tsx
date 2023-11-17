import styles from './styles.module.css'

export const SplitContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.splitContent}>{children}</div>
}

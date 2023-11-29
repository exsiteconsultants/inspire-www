import styles from './styles.module.css'

export const SubContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.subContent}>{children}</div>
}

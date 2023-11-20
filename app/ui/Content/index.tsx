import styles from './styles.module.css'

export const Content: React.FC<{
  children?: React.ReactNode
  compact?: boolean
}> = ({ children, compact }) => (
  <div className={`${styles.content} ${compact ? styles.compact : ''}`}>
    {children}
  </div>
)

export default Content

import styles from './styles.module.css'

const ImageCard: React.FC<{
  children?: React.ReactNode
  image: string
  subTitle?: string
  title: string
}> = ({ children, image, subTitle, title }) => (
  <div className={styles.card}>
    <div
      className={styles.image}
      style={{ backgroundImage: `url(/images/${image})` }}
    />
    <h3 className={styles.title}>{title}</h3>
    {subTitle && <h4 className={styles.subTitle}>{subTitle}</h4>}
    <div className={styles.text}>{children}</div>
  </div>
)

export default ImageCard

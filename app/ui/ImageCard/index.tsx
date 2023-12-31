import styles from './styles.module.css'

export const ImageCard: React.FC<{
  children?: React.ReactNode
  email?: string
  id?: string
  image: string
  subTitle?: string
  title: string
}> = ({ children, email, id, image, subTitle, title }) => (
  <div className={styles.card} id={id}>
    <div
      className={styles.image}
      style={{ backgroundImage: `url(/images/${image})` }}
    />
    <h3 className={styles.title}>{title}</h3>
    {subTitle && <h4 className={styles.subTitle}>{subTitle}</h4>}
    <div className={styles.text}>{children}</div>
    {email && (
      <a className={styles.email} href={`mailto:${email}`}>
        {email}
      </a>
    )}
  </div>
)

export default ImageCard

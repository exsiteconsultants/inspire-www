import styles from './styles.module.css'

const ContentHero: React.FC<{
  image: string
  subTitle?: string
  title: string
}> = ({ image, subTitle, title }) => (
  <div className={styles.contentHero}>
    <div
      className={styles.heroImage}
      style={{ backgroundImage: `url(/images/${image})` }}
    >
      &nbsp;
    </div>
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{title}</h1>
      {subTitle && <h2 className={styles.subTitle}>{subTitle}</h2>}
    </div>
  </div>
)

export default ContentHero

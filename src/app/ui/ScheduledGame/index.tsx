/* eslint-disable @next/next/no-img-element */
import { getDateString } from '@/app/lib/date'
import { ScheduledGame } from '@/app/lib/types'
import styles from './styles.module.css'

const ScheduledGame: React.FC<ScheduledGame> = ({
  crest,
  date,
  home,
  location,
  team,
}) => (
  <article className={styles.scheduledGame}>
    <div className={styles.header}>
      <p className={styles.headerLabel}>{getDateString(date)}</p>
      <p className={styles.homeAway}>{home ? 'HOME' : 'AWAY'}</p>
    </div>
    <div className={styles.content}>
      <img
        src={`/images/crests/${crest}`}
        className={styles.crest}
        alt="Team Crest"
      />

      <div className={styles.info}>
        <h3 className={styles.opposition}>{team}</h3>
        {location && <p className={styles.location}>{location}</p>}
      </div>
    </div>
  </article>
)

export default ScheduledGame
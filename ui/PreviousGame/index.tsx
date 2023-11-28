import Image from 'next/image'
import { getDateString } from '../../lib/date'
import styles from './styles.module.css'
import { Result } from '../../types'

const PreviousGame: React.FC<Result> = ({
  awayTeam,
  awayTeamScore,
  crest,
  date,
  home,
  homeTeam,
  homeTeamScore,
}) => (
  <article data-testid="previous-game" className={styles.previousGame}>
    <div className={styles.header}>
      <p className={styles.headerLabel}>Last Result - {getDateString(date)}</p>
      <p className={styles.homeAway}>{home ? 'HOME' : 'AWAY'}</p>
    </div>
    <div className={styles.content}>
      <Image
        src={`/images/crests/${crest}`}
        height={68}
        width={68}
        className={styles.crest}
        alt="Team Crest"
      />

      <div className={styles.info}>
        <div className={`${styles.team} ${home ? styles.ownClub : ''}`}>
          <h3 className={styles.teamName}>{homeTeam}</h3>
          <p className={styles.score}>{homeTeamScore}</p>
        </div>
        <div className={`${styles.team} ${home ? '' : styles.ownClub}`}>
          <h3 className={styles.teamName}>{awayTeam}</h3>
          <p className={styles.score}>{awayTeamScore}</p>
        </div>
      </div>
    </div>
  </article>
)

export default PreviousGame

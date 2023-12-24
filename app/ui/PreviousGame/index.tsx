import Image from 'next/image'
import { getDateString } from '@/app/lib/date'
import { Result } from '@/app/db/types'
import styles from './styles.module.css'

const PreviousGame: React.FC<{
  game: Result
  latestResult?: boolean
}> = ({ game, latestResult }) => (
  <article data-testid="previous-game" className={styles.previousGame}>
    <div className={styles.header}>
      <p className={styles.headerLabel}>
        {latestResult && <span>Last Result - </span>}
        {getDateString(game.date)}
      </p>
      <p className={styles.homeAway}>
        {game.group_type === 'jpl_cup' && 'JPL Cup - '}
        {game.group_type === 'hampshire_cup' && 'Hampshire Cup - '}
        {game.home ? 'HOME' : 'AWAY'}
      </p>
    </div>
    <div className={styles.content}>
      {game.crest && (
        <Image
          src={game.crest}
          height={68}
          width={68}
          className={styles.crest}
          alt="Team Crest"
        />
      )}

      <div className={styles.info}>
        <div className={`${styles.team} ${game.home ? styles.ownClub : ''}`}>
          <h3 className={styles.teamName}>{game.home_team_name}</h3>
          <p className={styles.score}>{game.home_team_score}</p>
        </div>
        <div className={`${styles.team} ${game.home ? '' : styles.ownClub}`}>
          <h3 className={styles.teamName}>{game.away_team_name}</h3>
          <p className={styles.score}>{game.away_team_score}</p>
        </div>
      </div>
    </div>
  </article>
)

export default PreviousGame

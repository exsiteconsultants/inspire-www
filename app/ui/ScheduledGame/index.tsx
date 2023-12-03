import Image from 'next/image'
import { getDateString } from '@/app/lib/date'
import { SheduledGameRecord } from '@/app/db'
import styles from './styles.module.css'

export const ScheduledGame: React.FC<{
  game: SheduledGameRecord
  nextGame?: boolean
}> = ({ game, nextGame }) => {
  return (
    <article className={styles.scheduledGame}>
      <div className={styles.header}>
        <p className={styles.headerLabel}>
          {nextGame && <span>Next Match - </span>}
          {getDateString(game.date)}
        </p>
        <p className={styles.homeAway}>{game.home ? 'HOME' : 'AWAY'}</p>
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
          <h3 className={styles.opposition}>{game.opponent}</h3>
          {game.location && <p className={styles.location}>{game.location}</p>}
        </div>
      </div>
    </article>
  )
}

export default ScheduledGame

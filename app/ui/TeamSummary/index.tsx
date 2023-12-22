import { AgeGroupData } from '@/app/lib/types'
import styles from './styles.module.css'
import LeagueTableSummary from '@/app/ui/LeagueTableSummary'
import PreviousGame from '@/app/ui/PreviousGame'
import ScheduledGame from '@/app/ui/ScheduledGame'

const TeamSummary: React.FC<AgeGroupData> = ({
  lastPlayedGame,
  group,
  groupTableEntries,
  nextGame,
  squad,
}) => {
  if (!squad) {
    return null
  }

  return (
    <div className={styles.teamData}>
      {lastPlayedGame && <PreviousGame game={lastPlayedGame} />}
      {nextGame && <ScheduledGame game={nextGame} />}
      {group && groupTableEntries && (
        <LeagueTableSummary
          group={group}
          groupTableEntries={groupTableEntries}
          squad={squad}
        />
      )}
    </div>
  )
}

export default TeamSummary

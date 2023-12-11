import { AgeGroupData } from '@/app/lib/types'
import styles from './styles.module.css'
import LeagueTableSummary from '@/app/ui/LeagueTableSummary'
import PreviousGame from '@/app/ui/PreviousGame'
import ScheduledGame from '@/app/ui/ScheduledGame'

const TeamSummary: React.FC<AgeGroupData> = ({
  lastPlayedGame,
  league,
  leagueTableEntries,
  nextGame,
  team,
}) => {
  if (!team) {
    return null
  }

  return (
    <div className={styles.teamData}>
      {lastPlayedGame && <PreviousGame game={lastPlayedGame} />}
      {nextGame && <ScheduledGame game={nextGame} />}
      {league && leagueTableEntries && (
        <LeagueTableSummary
          league={league}
          leagueTableEntries={leagueTableEntries}
          team={team}
        />
      )}
    </div>
  )
}

export default TeamSummary

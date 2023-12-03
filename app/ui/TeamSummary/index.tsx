import styles from './styles.module.css'
import { getLastPlayedGame, getNextGame, getTeamAndGroupForAge } from '@/app/db'
import { LeagueTableSummary, PreviousGame, ScheduledGame } from '@/app/ui'

export const TeamSummary: React.FC<{ age: string }> = async ({ age }) => {
  const team = await getTeamAndGroupForAge(age.toUpperCase())

  if (!team) {
    return null
  }

  // Get the last played game
  const lastPlayedGame = await getLastPlayedGame({ teamID: team.team_id })
  const nextGame = await getNextGame({ teamID: team.team_id })

  return (
    <div className={styles.teamData}>
      {lastPlayedGame && <PreviousGame game={lastPlayedGame} />}
      {nextGame && <ScheduledGame game={nextGame} />}
      <LeagueTableSummary groupID={team.group_id} teamID={team.team_id} />
    </div>
  )
}

export default TeamSummary

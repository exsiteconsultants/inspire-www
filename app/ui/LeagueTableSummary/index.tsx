import Image from 'next/image'
import { League, LeagueTableEntryAndTeam, TeamAndGroup } from '@/app/db/types'
import styles from './styles.module.css'

const LeagueTableSummary: React.FC<{
  league: League
  leagueTableEntries: LeagueTableEntryAndTeam[]
  team: TeamAndGroup
}> = ({ league, leagueTableEntries, team }) => {
  // Get the poosition for the selected team and only show the team the the 2 teams above and below
  // or 2 teams below or 2 teams above
  const teamPositionIndex = leagueTableEntries.findIndex(
    (entry) => entry.team_id === team.team_id
  )

  let startIndex: number
  let endIndex: number

  if (teamPositionIndex === 0) {
    startIndex = 0
    endIndex = 2
  } else if (teamPositionIndex === leagueTableEntries.length - 1) {
    startIndex = leagueTableEntries.length - 4
    endIndex = leagueTableEntries.length - 1
  } else {
    startIndex = teamPositionIndex - 1
    endIndex = teamPositionIndex + 1
  }

  // Get the subset of the league table entries
  const leagueTableSubset = leagueTableEntries.slice(startIndex, endIndex + 1)

  return (
    <div data-testid="league-table-summary" className={styles.leagueTable}>
      <h4 className={styles.title}>{league?.name}</h4>
      <table className={styles.table} cellSpacing={0}>
        <thead>
          <tr>
            <th data-field="team" colSpan={3}>
              Team
            </th>
            <th data-field="played">MP</th>
            <th data-field="goal-difference">GD</th>
            <th data-field="points">PTS</th>
          </tr>
        </thead>

        <tbody>
          {leagueTableSubset.map((entry) => (
            <tr
              key={`league-position-${entry.position}`}
              className={entry.team_id === team.team_id ? styles.ownTeam : ''}
            >
              <td data-field="position">{entry.position}</td>
              <td data-field="crest">
                {entry.crest && (
                  <Image
                    src={entry.crest}
                    height={20}
                    width={20}
                    className={styles.crest}
                    alt="Team Logo"
                  />
                )}
              </td>
              <td data-field="team">{entry.team}</td>
              <td data-field="played">{entry.played}</td>
              <td data-field="goal-difference">{entry.goal_difference}</td>
              <td data-field="points">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeagueTableSummary

import Image from 'next/image'
import { getLeague, getLeagueTable } from '@/app/db'
import styles from './styles.module.css'

export const LeagueTableSummary: React.FC<{
  groupID: number
  teamID: number
}> = async ({ groupID, teamID }) => {
  const league = await getLeague(groupID)
  const leagueTableEntries = await getLeagueTable(groupID)

  // Get the poosition for the selected team and only show the team the the 2 teams above and below
  // or 2 teams below or 2 teams above
  const teamPositionIndex = leagueTableEntries.findIndex(
    (entry) => entry.team_id === teamID
  )

  let startIndex = teamPositionIndex - 1
  let endIndex = teamPositionIndex + 1

  if (teamPositionIndex === 0) {
    endIndex = teamPositionIndex + 2
  }

  if (teamPositionIndex === leagueTableEntries.length - 1) {
    startIndex = teamPositionIndex - 2
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
              className={entry.team_id === teamID ? styles.ownTeam : ''}
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
              <td data-field="goal-difference">{entry.goalDifference}</td>
              <td data-field="points">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

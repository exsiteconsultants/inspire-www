import Image from 'next/image'
import { Group, GroupTableEntryAndTeam, SquadAndGroup } from '@/app/db/types'
import styles from './styles.module.css'

const LeagueTableSummary: React.FC<{
  group: Group
  groupTableEntries: GroupTableEntryAndTeam[]
  squad: SquadAndGroup
}> = ({ group, groupTableEntries, squad }) => {
  // Get the poosition for the selected team and only show the team the the 2 teams above and below
  // or 2 teams below or 2 teams above
  const teamPositionIndex = groupTableEntries.findIndex(
    (entry) => entry.team_id === squad.team_id
  )

  let startIndex: number
  let endIndex: number

  if (teamPositionIndex === 0) {
    startIndex = 0
    endIndex = 2
  } else if (teamPositionIndex === groupTableEntries.length - 1) {
    startIndex = groupTableEntries.length - 4
    endIndex = groupTableEntries.length - 1
  } else {
    startIndex = teamPositionIndex - 1
    endIndex = teamPositionIndex + 1
  }

  // Get the subset of the league table entries
  const leagueTableSubset = groupTableEntries.slice(startIndex, endIndex + 1)

  return (
    <div data-testid="league-table-summary" className={styles.leagueTable}>
      <h4 className={styles.title}>{group?.name}</h4>
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
              className={entry.team_id === squad.team_id ? styles.ownTeam : ''}
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

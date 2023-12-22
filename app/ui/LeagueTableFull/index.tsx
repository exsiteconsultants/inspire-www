import Image from 'next/image'
import styles from './styles.module.css'
import { Group, GroupTableEntryAndTeam, SquadAndGroup } from '@/app/db/types'

export const LeagueTableFull: React.FC<{
  group: Group
  groupTableEntries: GroupTableEntryAndTeam[]
  squad: SquadAndGroup
}> = ({ group, groupTableEntries, squad }) => (
  <div data-testid="league-table-summary" className={styles.leagueTable}>
    <h4 className={styles.title}>{group?.name}</h4>
    <table className={styles.table} cellSpacing={0}>
      <thead>
        <tr>
          <th data-field="team" colSpan={3}>
            Team
          </th>
          <th data-field="played">MP</th>
          <th data-field="won">W</th>
          <th data-field="lost">L</th>
          <th data-field="drawn">D</th>
          <th data-field="goals-for">GF</th>
          <th data-field="goals-against">GA</th>
          <th data-field="goal-difference">GD</th>
          <th data-field="points">PTS</th>
        </tr>
      </thead>

      <tbody>
        {groupTableEntries.map((entry) => (
          <tr
            key={entry.position}
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
            <td data-field="won">{entry.won}</td>
            <td data-field="lost">{entry.lost}</td>
            <td data-field="drawn">{entry.drawn}</td>
            <td data-field="goals-for">{entry.goals_for}</td>
            <td data-field="goals-against">{entry.goals_against}</td>
            <td data-field="goal-difference">{entry.goal_difference}</td>
            <td data-field="points">{entry.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default LeagueTableFull

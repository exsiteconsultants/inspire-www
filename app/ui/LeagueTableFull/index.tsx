import Image from 'next/image'
import { db } from '@/app/lib/db'
import styles from './styles.module.css'

export const LeagueTableFull: React.FC<{
  groupID: number
  teamID: number
}> = async ({ groupID, teamID }) => {
  // Get the League details
  const league = await db
    .selectFrom('league')
    .where('group_id', '=', groupID)
    .selectAll()
    .executeTakeFirst()

  // Get the League table
  const leagueTableEntries = await db
    .selectFrom('league_table')
    .innerJoin('team', 'league_table.team_id', 'team.id')
    .select([
      'league_table.position',
      'league_table.played',
      'league_table.won',
      'league_table.drawn',
      'league_table.lost',
      'league_table.goals_for as goalsFor',
      'league_table.goals_against as goalsAgainst',
      'league_table.goal_difference as goalDifference',
      'league_table.points',
      'team.id as teamID',
      'team.name as team',
      'team.crest',
    ])
    .where('group_id', '=', groupID)
    .orderBy('position', 'asc')
    .selectAll()
    .execute()

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
          {leagueTableEntries.map((entry) => (
            <tr
              key={entry.position}
              className={entry.teamID == teamID ? styles.ownTeam : ''}
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
              <td data-field="goals-for">{entry.goalsFor}</td>
              <td data-field="goals-against">{entry.goalsAgainst}</td>
              <td data-field="goal-difference">{entry.goalDifference}</td>
              <td data-field="points">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeagueTableFull

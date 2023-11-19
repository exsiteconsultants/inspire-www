import Image from 'next/image'
import { LeagueTableEntry } from '@/app/lib/types'
import styles from './styles.module.css'

export const LeagueTable: React.FC<{
  leagueName: string
  leagueTableEntries: LeagueTableEntry[]
}> = ({ leagueName, leagueTableEntries }) => (
  <div data-testid="league-table-summary" className={styles.leagueTable}>
    <h4 className={styles.title}>{leagueName}</h4>
    <table className={styles.table} cellSpacing={0}>
      <thead>
        <tr>
          <th data-field="team" colSpan={3}>
            Team
          </th>
          <th data-field="played">P</th>
          <th data-field="goal-difference">GD</th>
          <th data-field="points">PTS</th>
        </tr>
      </thead>

      <tbody>
        {leagueTableEntries.map((entry) => (
          <tr key={entry.position}>
            <td data-field="position">{entry.position}</td>
            <td data-field="crest">
              <Image
                src={`/images/crests/${entry.crest}`}
                height={20}
                width={20}
                className={styles.crest}
                alt="Team Logo"
              />
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

export default LeagueTable

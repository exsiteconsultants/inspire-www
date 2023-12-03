import { JPLLeagueTableEntry } from '@/app/lib/gotSport/types'
import { db } from '.'

export async function updateLeagueTable({
  leagueTable,
}: {
  leagueTable: JPLLeagueTableEntry[]
}) {
  const start = Date.now()

  const newEntries = leagueTable.map((entry) => ({
    team_id: entry.teamID,
    group_id: entry.groupID,
    position: entry.position,
    played: entry.played,
    won: entry.won,
    lost: entry.lost,
    drawn: entry.drawn,
    goals_for: entry.goalsFor,
    goals_against: entry.goalsAgainst,
    goal_difference: entry.goalDifference,
    points: entry.points,
  }))

  await db
    .deleteFrom('league_table')
    .where('group_id', '=', leagueTable[0].groupID)
    .execute()

  await db.insertInto('league_table').values(newEntries).execute()

  console.log('Updating league table took', Date.now() - start, 'ms')
}

import { JPLLeagueTableEntry } from '@/app/lib/gotSport/types'
import { getDB } from './db'
import { NewGroupTableEntry } from './types'

export default async function updateLeagueTable({
  leagueTable,
}: {
  leagueTable: JPLLeagueTableEntry[]
}) {
  const db = getDB()

  const newEntries: NewGroupTableEntry[] = leagueTable.map((entry) => ({
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
    .deleteFrom('group_table')
    .where('group_id', '=', leagueTable[0].groupID)
    .execute()

  await db.insertInto('group_table').values(newEntries).execute()
}

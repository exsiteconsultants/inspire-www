import { LeagueTableEntryAndTeam } from './types'
import { getDB } from './db'

export default async function getLeagueTable(
  groupID: number
): Promise<LeagueTableEntryAndTeam[]> {
  // Get the League table
  const db = getDB()
  const leagueTableEntries = await db
    .selectFrom('league_table')
    .innerJoin('team', 'league_table.team_id', 'team.id')
    .select(['team.name as team', 'team.crest'])
    .where('group_id', '=', groupID)
    .orderBy('position', 'asc')
    .selectAll()
    .execute()

  return leagueTableEntries
}

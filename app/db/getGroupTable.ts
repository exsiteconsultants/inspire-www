import { GroupTableEntryAndTeam } from './types'
import { getDB } from './db'

export default async function getGroupTable(
  groupID: number
): Promise<GroupTableEntryAndTeam[]> {
  // Get the League table
  const db = getDB()
  const leagueTableEntries = await db
    .selectFrom('group_table')
    .innerJoin('team', 'group_table.team_id', 'team.id')
    .select(['team.name as team', 'team.crest'])
    .where('group_table.group_id', '=', groupID)
    .orderBy('position', 'asc')
    .selectAll()
    .execute()

  return leagueTableEntries
}

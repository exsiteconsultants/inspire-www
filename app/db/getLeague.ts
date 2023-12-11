import { getDB } from './db'

export async function getLeague(groupID: number) {
  const db = getDB()
  const league = await db
    .selectFrom('league')
    .where('group_id', '=', groupID)
    .selectAll()
    .executeTakeFirst()

  return league
}

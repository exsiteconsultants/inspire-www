import { db } from '.'

export async function getLeague(groupID: number) {
  const league = await db
    .selectFrom('league')
    .where('group_id', '=', groupID)
    .selectAll()
    .executeTakeFirst()

  return league
}

import { getDB } from './db'

export default async function getGroup(groupID: number) {
  const db = getDB()
  const league = await db
    .selectFrom('group')
    .where('id', '=', groupID)
    .selectAll()
    .executeTakeFirst()

  return league
}

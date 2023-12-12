import { getDB } from './db'

export default async function getCoaches() {
  const db = getDB()

  const coaches = await db
    .selectFrom('staff')
    .selectAll()
    .where((eb) =>
      eb.or([eb('title', '=', 'Coach'), eb('title', '=', 'Manager')])
    )
    .orderBy('name', 'asc')
    .execute()

  return coaches
}

import { getDB } from './db'

export default async function getCommittee() {
  const db = getDB()

  const coaches = await db
    .selectFrom('staff')
    .selectAll()
    .where((eb) =>
      eb.and([eb('title', '!=', 'Coach'), eb('title', '!=', 'Manager')])
    )
    .orderBy('name', 'asc')
    .execute()

  return coaches
}

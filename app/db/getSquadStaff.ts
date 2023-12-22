import { getDB } from './db'

export interface SquadStaffMember {
  id: number
  image: string | null
  name: string
  title: string
}

export default async function getSquadStaff(
  squadID: number
): Promise<SquadStaffMember[]> {
  const db = getDB()

  const coaches = await db
    .selectFrom('staff')
    .select(['staff.id', 'staff.name', 'staff.title', 'staff.image'])
    .where('staff.squad_id', '=', squadID)
    .orderBy('name', 'asc')
    .execute()

  return coaches
}

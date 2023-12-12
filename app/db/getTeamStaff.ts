import { getDB } from './db'

export interface TeamStaffMember {
  id: number
  image: string | null
  name: string
  title: string
}

export default async function getTeamStaff(
  age: string
): Promise<TeamStaffMember[]> {
  const db = getDB()

  const coaches = await db
    .selectFrom('staff')
    .innerJoin('team_staff', 'staff.id', 'team_staff.staff_id')
    .innerJoin('team', 'team_staff.team_id', 'team.id')
    .select(['staff.id', 'staff.name', 'staff.title', 'staff.image'])
    .where('team.age', '=', age.toUpperCase())
    .orderBy('name', 'asc')
    .execute()

  return coaches
}

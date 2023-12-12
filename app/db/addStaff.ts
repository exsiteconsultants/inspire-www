import { getDB } from './db'
import { NewStaff, NewTeamStaff } from './types'

export interface AddStaffParams extends NewStaff {
  teamAge?: string
}

export default async function addStaff(staffToAdd: AddStaffParams) {
  const db = getDB()

  const [newStaff] = await db
    .insertInto('staff')
    .values({
      bio: staffToAdd.bio,
      email: staffToAdd.email,
      image: staffToAdd.image,
      name: staffToAdd.name,
      title: staffToAdd.title,
    })
    .returning('id')
    .execute()

  // If provided with a team age, get the team ID and then add
  // associate the staff member with the team
  if (staffToAdd.teamAge) {
    const team = await db
      .selectFrom('team')
      .selectAll()
      .where('age', '=', staffToAdd.teamAge.toUpperCase())
      .executeTakeFirst()

    if (team) {
      const teamStaff: NewTeamStaff = {
        staff_id: newStaff.id,
        team_id: team.id,
      }

      await db.insertInto('team_staff').values(teamStaff).execute()
    }
  }
}

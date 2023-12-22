import { JPLTeam } from '@/app/lib/gotSport/types'
import { getDB } from './db'

export default async function addTeams({
  teams,
}: {
  age: string
  teams: JPLTeam[]
}) {
  try {
    const db = getDB()
    // For each team check if it exists in the database
    for (const team of teams) {
      const dbTeams = await db
        .selectFrom('team')
        .select(['id', 'name'])
        .where('id', '=', team.teamID)
        .execute()

      // If the team doesn't exist in the database then add it.
      if (Number(dbTeams.length) === 0) {
        console.log('Add Team')
        await db
          .insertInto('team')
          .values({
            id: team.teamID,
            name: team.name,
            group_id: team.groupID,
          })
          .execute()
      }
    }
  } catch (e) {
    console.error(e)
  }
}

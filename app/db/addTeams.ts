import { JPLTeam } from '@/app/lib/gotSport/types'
import { db } from '.'

async function addTeamToDatabase({
  age,
  team,
}: {
  age: string
  team: JPLTeam
}) {
  // Add the team
  try {
    await db
      .insertInto('team')
      .values({
        id: team.teamID,
        name: team.name,
        age,
      })
      .execute()

    // Join the team to the league and group
    await db
      .insertInto('league_team')
      .values({
        group_id: team.groupID,
        team_id: team.teamID,
      })
      .execute()
  } catch (e) {
    console.error(e)
  }
}

export async function addTeams({
  age,
  teams,
}: {
  age: string
  teams: JPLTeam[]
}) {
  try {
    // For each team check if it exists in the database
    for (const team of teams) {
      const dbTeams = await db
        .selectFrom('team')
        .where('id', '=', team.teamID)
        .execute()

      // If the team doesn't exist in the database then add it.
      if (Number(dbTeams.length) === 0) {
        console.log('Add Team')
        await addTeamToDatabase({ age, team })
      }
    }
  } catch (e) {
    console.error(e)
  }
}

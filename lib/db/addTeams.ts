import { JPLTeam } from '@/lib/gotSport/types'
import { db } from '.'

async function addTeamToDatabase({ team }: { team: JPLTeam }) {
  // Add the team
  try {
    await db
      .insertInto('team')
      .values({
        id: team.teamID,
        name: team.name,
        crest: team.crest,
        age: 'u15',
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

export async function addTeams({ teams }: { teams: JPLTeam[] }) {
  try {
    // For each team check if it exists in the database
    for (const team of teams) {
      const dbTeams = await db
        .selectFrom('team')
        .where('id', '=', team.teamID)
        .execute()

      // If the team doesn't exist in the database then add it.
      if (Number(dbTeams.length) === 0) {
        await addTeamToDatabase({ team })

        // TODO - Upload the crest to blob storage and use the team ID as the file name
        // Then update the DB with the URL
      }
    }
  } catch (e) {
    console.error(e)
  }
}

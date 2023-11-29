import {
  put as putBlob,
  list as listBlobs,
  ListBlobResultBlob,
} from '@vercel/blob'
import { JPLTeam } from '@/app/lib/gotSport/types'
import { db } from '.'

const crestImagePrefix = 'images/crests'

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

async function addTeamCrest({
  blobs,
  team,
}: {
  blobs: ListBlobResultBlob[]
  team: JPLTeam
}) {
  const imageName = team.crest.split('/').pop()?.split('?')[0]
  const imageExtension = imageName?.split('.').pop()
  const blobPath = `${crestImagePrefix}/${team.teamID}.${imageExtension}`
  let teamBlobUrl: string | null = null

  const existingBlob = blobs.find((blob) => blob.pathname === blobPath)

  if (existingBlob) {
    teamBlobUrl = existingBlob.url
  } else if (imageName) {
    const image = await fetch(team.crest)
    const sourceBlob = await image.blob()
    const { url } = await putBlob(blobPath, sourceBlob, {
      access: 'public',
    })

    teamBlobUrl = url
  }

  if (teamBlobUrl) {
    await db
      .updateTable('team')
      .set({ crest: teamBlobUrl })
      .where('id', '=', team.teamID)
      .execute()
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
    // Get a list of the blobs in the images/crests folder
    const { blobs } = await listBlobs({ prefix: crestImagePrefix })

    // For each team check if it exists in the database
    for (const team of teams) {
      const dbTeams = await db
        .selectFrom('team')
        .where('id', '=', team.teamID)
        .execute()

      // If the team doesn't exist in the database then add it.
      if (Number(dbTeams.length) === 0) {
        await addTeamToDatabase({ age, team })
      }

      // Check the crest image exists and if not add it.
      await addTeamCrest({ blobs, team })
    }
  } catch (e) {
    console.error(e)
  }
}

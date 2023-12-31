import { Team } from '@/app/db/types'
import { getDB } from '@/app/db/db'
import { getTeamCrestUrl } from '@/app/lib/gotSport'
import { put as putBlob, list as listBlobs } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic' // defaults to force-static

const gotoSportRoolUrl = 'https://system.gotsport.com'
const crestImagePrefix = 'images/crests'

export async function GET() {
  try {
    const db = getDB()

    // Get a list of the teams and associated crest urls
    const teams: Team[] = await db.selectFrom('team').selectAll().execute()

    // Get a list of the blobs in the images/crests folder
    const { blobs } = await listBlobs({ prefix: crestImagePrefix })

    for (const team of teams) {
      // Generate the blob path to expect
      const blobPath = `${crestImagePrefix}/${team.id}`

      // Does the blob exist?
      const found = blobs.find((blob) => blob.pathname.includes(blobPath))

      // No? Add it and update the database with the generated URL
      if (!found) {
        await addTeamCrest({ team })
        continue
      }

      // It exists, but does the database have the URL?
      if (team.crest !== found.url) {
        // No? Update the database with the generated URL
        await db
          .updateTable('team')
          .set({ crest: found.url })
          .where('id', '=', team.id)
          .execute()
      }
    }

    revalidatePath('/', 'page')
    revalidatePath('/squad/[id]', 'page')

    return Response.json({ done: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error })
  }
}

async function addTeamCrest({ team }: { team: Team }) {
  const db = getDB()

  // Get the event ID for the team
  const result = await db
    .selectFrom('team')
    .innerJoin('group', 'team.group_id', 'group.id')
    .select(['group.event_id as eventID'])
    .where('team.id', '=', team.id)
    .executeTakeFirst()

  if (!result) {
    return
  }

  // Load the jpl team page and get the crest url
  const jplCrestUrl = await getTeamCrestUrl({
    eventID: result.eventID,
    teamID: team.id,
  })

  if (!jplCrestUrl) {
    return
  }

  // Generate the blob path by getting the image type and combining with team id
  const imageExtension = jplCrestUrl
    .split('/')
    .pop()
    ?.split('?')[0]
    ?.split('.')
    .pop()

  if (!imageExtension) {
    return
  }

  const blobPath = `${crestImagePrefix}/${team.id}.${imageExtension}`

  // Fetch the image and put it in the blob store
  const expandedUrl = `${gotoSportRoolUrl}${jplCrestUrl}`
  const image = await fetch(expandedUrl)
  const sourceBlob = await image.blob()
  const { url: teamBlobUrl } = await putBlob(blobPath, sourceBlob, {
    access: 'public',
  })

  if (teamBlobUrl) {
    await db
      .updateTable('team')
      .set({ crest: teamBlobUrl })
      .where('id', '=', team.id)
      .execute()
  }
}

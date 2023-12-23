import { getDB } from '@/app/db/db'
import { NewGame } from '@/app/db/types'
import { parseCupGamesPage } from '@/app/lib/hampshire/parseCupGamesPage'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic' // defaults to force-static

async function addGames(games: NewGame[]) {
  const db = getDB()
  await db.insertInto('game').values(games).execute()
}

async function clearGames({ groupID }: { groupID: number }) {
  const db = getDB()
  await db.deleteFrom('game').where('group_id', '=', groupID).execute()
}

export async function GET() {
  try {
    const db = getDB()

    // Get a list of teams that belong to a squad that are part of
    // the Hampshire cup
    const teams = await db
      .selectFrom('team')
      .innerJoin('group', 'team.group_id', 'group.id')
      .select([
        'team.id',
        'team.name',
        'team.group_id',
        'group.event_id',
        'group.age',
      ])
      .where((eb) =>
        eb.and([
          eb('group.group_type', '=', 'hampshire_cup'),
          eb('team.squad_id', 'is not', null),
        ])
      )
      .execute()

    const result: NewGame[] = []

    await Promise.all(
      teams.map(async (team) => {
        const games = await parseCupGamesPage(team)

        await clearGames({ groupID: team.group_id })

        if (games.length > 0) {
          await addGames(games)
          result.push(...games)
        }
      })
    )

    revalidatePath('/', 'page')
    revalidatePath('/squad/[id]', 'page')

    return Response.json(result)
  } catch (error) {
    return Response.json({ error })
  }
}

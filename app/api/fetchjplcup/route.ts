import addTeams from '@/app/db/addTeams'
import { getDB } from '@/app/db/db'
import updateGames from '@/app/db/updateGames'
import parseCupTeamPage from '@/app/lib/gotSport/parseCupTeamPage'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET() {
  try {
    const db = getDB()

    // Get a list of teams that belong to a squad that are part of
    // a cup
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
          eb('group.cup', '=', true),
          eb('team.squad_id', 'is not', null),
        ])
      )
      .execute()

    await Promise.all(
      teams.map(async (team) => {
        const data = await parseCupTeamPage({
          eventID: team.event_id,
          groupID: team.group_id,
          teamID: team.id,
        })

        await addTeams({ teams: data.teams, age: team.age })
        await updateGames({ games: data.games, groupID: team.group_id })
      })
    )

    revalidatePath('/', 'page')
    revalidatePath('/squad/[id]', 'page')

    return Response.json({ done: true })
  } catch (error) {
    return Response.json({ error })
  }
}

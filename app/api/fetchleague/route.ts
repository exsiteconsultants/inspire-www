import { revalidatePath } from 'next/cache'
import { getDB } from '@/app/db/db'
import addTeams from '@/app/db/addTeams'
import updateLeagueTable from '@/app/db/updateLeagueTable'
import { parseTeamPage } from '@/app/lib/gotSport'
import updateGames from '@/app/db/updateGames'

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET() {
  console.log('------------------- FETCHING JPL DATA -------------------')

  try {
    const db = getDB()

    // Get a list of teams that belong to a squad and are part of a league
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
          eb('group.group_type', '=', 'jpl_league'),
          eb('team.squad_id', 'is not', null),
        ])
      )
      .execute()

    await Promise.all(
      teams.map(async (team) => {
        const data = await parseTeamPage({
          eventID: team.event_id,
          groupID: team.group_id,
          teamID: team.id,
        })

        await addTeams({ teams: data.teams, age: team.age })

        await Promise.all([
          updateLeagueTable({ leagueTable: data.leagueTable }),
          updateGames({ games: data.games, groupID: team.group_id }),
        ])
      })
    )

    console.log('------------------- INVALIDATING CACHE -------------------')

    // Invalidate the cache for the home page and the team pages
    revalidatePath('/', 'page')
    revalidatePath('/squad/[id]', 'page')

    console.log(
      '------------------- FETCHING JPL DATA:DONE -------------------'
    )

    return Response.json({ done: true })
  } catch (error) {
    return Response.json({ error })
  }
}

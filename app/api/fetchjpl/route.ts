import { revalidatePath } from 'next/cache'
import { parseTeamPage } from '@/app/lib/gotSport'
import { addTeams, db, updateGames, updateLeagueTable } from '@/app/db'

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET() {
  try {
    const teams = await db
      .selectFrom('team')
      .innerJoin('league_team', 'team.id', 'league_team.team_id')
      .innerJoin('league', 'league_team.group_id', 'league.group_id')
      .select(['team.id', 'team.age', 'league.event_id', 'league.group_id'])
      .where('team.isownteam', '=', true)
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
          updateGames({ games: data.games }),
        ])
      })
    )

    console.log('Done')

    // Invalidate the cache for the home page and the team pages
    revalidatePath('/', 'page')
    revalidatePath('/[id]', 'page')
    revalidatePath('/teamtest/[id]', 'page')

    return Response.json({ done: true })
  } catch (error) {
    return Response.json({ error })
  }
}

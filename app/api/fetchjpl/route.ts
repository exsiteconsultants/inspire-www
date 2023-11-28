import parseTeamPage from '@/lib/gotSport/parseTeamPage'
import { addTeams, db } from '@/lib/db'

import { leagueTable, games, teams } from './data'
import { updateLeagueTable } from '@/lib/db/updateLeagueTable'
import { updateGames } from '@/lib/db/updateGames'

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: Request) {
  try {
    const teams = await db
      .selectFrom('team')
      .innerJoin('league_team', 'team.id', 'league_team.team_id')
      .innerJoin('league', 'league_team.group_id', 'league.group_id')
      .select(['team.id', 'team.age', 'league.event_id', 'league.group_id'])
      .where('team.isownteam', '=', true)
      .execute()

    for (const team of teams) {
      const data = await parseTeamPage({
        eventID: team.event_id,
        groupID: team.group_id,
        teamID: team.id,
      })

      await addTeams({ teams: data.teams, age: team.age })
      await updateLeagueTable({ leagueTable: data.leagueTable })
      await updateGames({ games: data.games })
    }

    return Response.json({ done: true })
  } catch (error) {
    return Response.json({ error })
  }
}

import parseTeamPage from '@/lib/gotSport/parseTeamPage'
import { JPLTeamInput } from '@/lib/gotSport/types'
import { addTeams } from '@/lib/db'

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: Request) {
  const myTeam: JPLTeamInput = {
    eventID: 28798,
    groupID: 222634,
    teamID: 1782574,
  }

  const data = await parseTeamPage(myTeam)

  addTeams({ teams: data.teams })

  return Response.json(data)
}

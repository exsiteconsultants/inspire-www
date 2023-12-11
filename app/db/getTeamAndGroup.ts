import { TeamAndGroup } from './types'
import { getDB } from './db'

export const getTeamAndGroup = async (
  teamID: number
): Promise<TeamAndGroup | undefined> => {
  const db = getDB()
  return await db
    .selectFrom('team')
    .innerJoin('league_team', 'team.id', 'league_team.team_id')
    .selectAll()
    .where('team.id', '=', teamID)
    .executeTakeFirst()
}

import { TeamAndGroup } from './types'
import { getDB } from './db'

export const getTeamAndGroupForAge = async (
  age: string
): Promise<TeamAndGroup | undefined> => {
  const db = getDB()
  return await db
    .selectFrom('team')
    .innerJoin('league_team', 'team.id', 'league_team.team_id')
    .selectAll()
    .where((eb) =>
      eb.and([eb('team.age', '=', age), eb('team.isownteam', '=', true)])
    )
    .executeTakeFirst()
}

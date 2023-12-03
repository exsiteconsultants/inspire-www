import { TeamAndGroup, db } from '.'

export const getTeamAndGroup = async (
  teamID: number
): Promise<TeamAndGroup | undefined> => {
  return await db
    .selectFrom('team')
    .innerJoin('league_team', 'team.id', 'league_team.team_id')
    .selectAll()
    .where('team.id', '=', teamID)
    .executeTakeFirst()
}

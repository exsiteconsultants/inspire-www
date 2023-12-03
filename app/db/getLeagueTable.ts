import { db } from '.'

export async function getLeagueTable(groupID: number) {
  // Get the League table
  const leagueTableEntries = await db
    .selectFrom('league_table')
    .innerJoin('team', 'league_table.team_id', 'team.id')
    .select([
      'league_table.position',
      'league_table.played',
      'league_table.won',
      'league_table.drawn',
      'league_table.lost',
      'league_table.goals_for as goalsFor',
      'league_table.goals_against as goalsAgainst',
      'league_table.goal_difference as goalDifference',
      'league_table.points',
      'team.name as team',
      'team.crest',
    ])
    .where('group_id', '=', groupID)
    .orderBy('position', 'asc')
    .selectAll()
    .execute()

  return leagueTableEntries
}

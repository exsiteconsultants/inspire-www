import { Result } from './types'
import { getDB } from './db'

export async function getTeamResults({
  teamID,
}: {
  teamID: number
}): Promise<Result[]> {
  const db = getDB()
  const game = await db
    .selectFrom('game')
    .innerJoin('team as home', 'home.id', 'game.home_team_id')
    .innerJoin('team as away', 'away.id', 'game.away_team_id')
    .select([
      'game.id',
      'game.date',
      'game.home_team_id as home_team_id',
      'game.home_team_score',
      'home.name as home_team_name',
      'home.crest as home_team_crest',
      'game.away_team_id as away_team_id',
      'game.away_team_score as away_team_score',
      'away.name as away_team_name',
      'away.crest as away_team_crest',
    ])
    .where((eb) =>
      eb.and([
        eb.or([
          eb('home_team_id', '=', teamID),
          eb('away_team_id', '=', teamID),
        ]),
        eb.or([eb('home_team_score', '>=', 0), eb('away_team_score', '>=', 0)]),
      ])
    )
    .orderBy('date', 'asc')
    .execute()

  const expandedGame = game.map((game) => {
    const home = game.home_team_id === teamID
    const crest = home ? game.away_team_crest : game.home_team_crest

    return {
      ...game,
      crest,
      home,
    }
  })

  return expandedGame
}

import { Result } from './types'
import { getDB } from './db'

export default async function getLastPlayedGame({
  squadID,
}: {
  squadID: number
}): Promise<Result | null> {
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
      'home.squad_id as home_squad_id',
      'home.name as home_team_name',
      'home.crest as home_team_crest',
      'game.away_team_id as away_team_id',
      'game.away_team_score as away_team_score',
      'away.squad_id as away_squad_id',
      'away.name as away_team_name',
      'away.crest as away_team_crest',
    ])
    .where((eb) =>
      eb.and([
        eb.or([
          eb('home.squad_id', '=', squadID),
          eb('away.squad_id', '=', squadID),
        ]),
        eb.or([eb('home_team_score', '>=', 0), eb('away_team_score', '>=', 0)]),
      ])
    )
    .orderBy('date', 'desc')
    .executeTakeFirst()

  if (!game) {
    return null
  }

  const home = game.home_squad_id === squadID
  const crest = home ? game.away_team_crest : game.home_team_crest

  return {
    ...game,
    crest,
    home,
  }
}

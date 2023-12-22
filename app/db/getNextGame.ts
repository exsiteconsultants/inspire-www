import { getDB } from './db'
import { SheduledGameRecord } from './types'

export default async function getNextGame({
  squadID,
}: {
  squadID: number
}): Promise<SheduledGameRecord | null> {
  // get the date for 00:00 today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

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
      'game.location',
    ])
    .where((eb) =>
      eb.and([
        eb.or([
          eb('home.squad_id', '=', squadID),
          eb('away.squad_id', '=', squadID),
        ]),
        eb.or([
          eb('home_team_score', 'is', null),
          eb('away_team_score', 'is', null),
        ]),
        eb('date', '>=', today),
      ])
    )
    .orderBy('date', 'asc')
    .executeTakeFirst()

  if (!game) {
    return null
  }

  const home = game.home_squad_id === squadID
  const crest = home ? game.away_team_crest : game.home_team_crest
  const opponent = home ? game.away_team_name : game.home_team_name

  return {
    ...game,
    crest,
    home,
    opponent,
  }
}

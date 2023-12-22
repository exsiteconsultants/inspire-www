import { SheduledGameRecord } from './types'
import { getDB } from './db'

export default async function getSquadSchedule({
  squadID,
}: {
  squadID: number
}): Promise<SheduledGameRecord[]> {
  const db = getDB()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const games = await db
    .selectFrom('game')
    .innerJoin('team as home', 'home.id', 'game.home_team_id')
    .innerJoin('team as away', 'away.id', 'game.away_team_id')
    .select([
      'game.id',
      'game.date',
      'game.location',
      'game.home_team_id as home_team_id',
      'home.squad_id as home_squad_id',
      'home.name as home_team_name',
      'home.crest as home_team_crest',
      'game.away_team_id as away_team_id',
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
        eb.or([
          eb('home_team_score', 'is', null),
          eb('away_team_score', 'is', null),
        ]),
        eb('date', '>=', today),
      ])
    )
    .orderBy('date', 'asc')
    .execute()

  const expandedGames = games.map((game) => ({
    ...game,
    home: game.home_squad_id === squadID,
    crest:
      game.home_squad_id === squadID
        ? game.away_team_crest
        : game.home_team_crest,
    opponent:
      game.home_squad_id === squadID
        ? game.away_team_name
        : game.home_team_name,
  }))

  return expandedGames
}

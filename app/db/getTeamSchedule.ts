import { SheduledGameRecord } from './types'
import { getDB } from './db'

export default async function getTeamSchedule({
  teamID,
}: {
  teamID: number
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
      'home.name as home_team_name',
      'home.crest as home_team_crest',
      'game.away_team_id as away_team_id',
      'away.name as away_team_name',
      'away.crest as away_team_crest',
    ])
    .where((eb) =>
      eb.and([
        eb.or([
          eb('home_team_id', '=', teamID),
          eb('away_team_id', '=', teamID),
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
    home: game.home_team_id === teamID,
    crest:
      game.home_team_id === teamID
        ? game.away_team_crest
        : game.home_team_crest,
    opponent:
      game.home_team_id === teamID ? game.away_team_name : game.home_team_name,
  }))

  return expandedGames
}

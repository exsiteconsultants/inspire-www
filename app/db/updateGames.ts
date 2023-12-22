import { getDB } from './db'
import { JPLGame } from '@/app/lib/gotSport/types'
import { NewGame } from './types'

export default async function updateGames({
  games,
  groupID,
}: {
  games: JPLGame[]
  groupID: number
}) {
  // Delete all games for the group
  const db = getDB()

  const dbGames: NewGame[] = games.map((game) => ({
    game_number: game.gameNumber,
    date: game.dateTime,
    group_id: game.groupID,
    home_team_id: game.homeTeamId,
    home_team_score:
      game.homeTeamScore === undefined ? null : game.homeTeamScore,
    away_team_id: game.awayTeamId,
    away_team_score:
      game.awayTeamScore === undefined ? null : game.awayTeamScore,
    location: game.location || null,
  }))

  await db.deleteFrom('game').where('group_id', '=', groupID).execute()

  // Insert all the new game data for the group
  await db.insertInto('game').values(dbGames).execute()
}

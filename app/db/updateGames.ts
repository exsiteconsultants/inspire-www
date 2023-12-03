import { db } from '.'
import { JPLGame } from '../lib/gotSport/types'

async function updateGame({ game }: { game: JPLGame }) {
  await db
    .deleteFrom('game')
    .where((eb) =>
      eb.and([
        eb('group_id', '=', game.groupID),
        eb('game_number', '=', game.gameNumber),
      ])
    )
    .execute()

  // Insert the new Game/Fixture into the db
  await db
    .insertInto('game')
    .values({
      group_id: game.groupID,
      game_number: game.gameNumber,
      date: game.dateTime,
      location: game.location,
      home_team_id: game.homeTeamId,
      home_team_score: game.homeTeamScore,
      away_team_id: game.awayTeamId,
      away_team_score: game.awayTeamScore,
    })
    .execute()
}

export async function updateGames({ games }: { games: JPLGame[] }) {
  const start = Date.now()
  await Promise.all(games.map((game) => updateGame({ game })))
  console.log('Updating games took', Date.now() - start, 'ms')
}

import { db } from '.'

export async function getLastPlayedGame({ teamID }: { teamID: number }) {
  const sql = await db
    .selectFrom('game')
    .selectAll()
    .where((eb) =>
      eb.or([eb('home_team_id', '=', teamID), eb('away_team_id', '=', teamID)])
    )
    .orderBy('date', 'desc')

    .compile()

  const game = await db
    .selectFrom('game')
    .selectAll()
    .where((eb) =>
      eb.or([eb('home_team_id', '=', teamID), eb('away_team_id', '=', teamID)])
    )
    .orderBy('date', 'desc')
    .executeTakeFirst()

  return game
}

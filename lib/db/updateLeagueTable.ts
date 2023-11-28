import { JPLLeagueTableEntry } from '@/lib/gotSport/types'
import { db } from '.'

export async function updateLeagueTable({
  leagueTable,
}: {
  leagueTable: JPLLeagueTableEntry[]
}) {
  // Delete the existing entry and replace it with the new one
  for (const entry of leagueTable) {
    await db
      .deleteFrom('league_table')
      .where((eb) =>
        eb.and([
          eb('team_id', '=', entry.teamID),
          eb('group_id', '=', entry.groupID),
        ])
      )
      .execute()

    await db
      .insertInto('league_table')
      .values({
        team_id: entry.teamID,
        group_id: entry.groupID,
        position: entry.position,
        played: entry.played,
        won: entry.won,
        lost: entry.lost,
        drawn: entry.drawn,
        goals_for: entry.goalsFor,
        goals_against: entry.goalsAgainst,
        goal_difference: entry.goalDifference,
        points: entry.points,
      })
      .execute()
  }
}

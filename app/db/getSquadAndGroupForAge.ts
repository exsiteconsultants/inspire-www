import { getDB } from './db'
import { SquadAndGroup } from './types'

/** Find the squad for the given age and the group id for the team
 * they play as in the league
 */
export default async function getSquadAndGroupForAge(
  age: string
): Promise<SquadAndGroup | undefined> {
  const db = getDB()
  return await db
    .selectFrom('squad')
    .innerJoin('team', 'squad.id', 'team.squad_id')
    .innerJoin('group', 'team.group_id', 'group.id')
    .select([
      'squad.id',
      'squad.name',
      'squad.bio',
      'squad.age',
      'squad.photo',
      'team.id as team_id',
      'team.group_id',
    ])
    .where((eb) =>
      eb.and([eb('squad.age', '=', age), eb('group.cup', '=', false)])
    )
    .executeTakeFirst()
}

import { Homepage } from './Homepage'
import { getLastPlayedGame } from './db/getLastGame'
import { getLeague } from '@/app/db/getLeague'
import { getLeagueTable } from '@/app/db/getLeagueTable'
import { getNextGame } from '@/app/db/getNextGame'
import { getTeamAndGroupForAge } from '@/app/db/getTeamAndGroupForAge'
import { AgeGroupData } from '@/app/lib/types'

const options = ['u12', 'u13', 'u15', 'u16']

const Home = async () => {
  // Get the data for each age group

  const ageGroupData = await Promise.all(
    options.map(async (age) => {
      const team = await getTeamAndGroupForAge(age.toUpperCase())

      if (!team)
        return Promise.resolve({
          lastPlayedGame: null,
          nextGame: null,
          team: null,
        })

      const lastPlayedGame = await getLastPlayedGame({ teamID: team.id })
      const nextGame = await getNextGame({ teamID: team.id })
      const league = await getLeague(team.group_id)
      const leagueTableEntries = await getLeagueTable(team.group_id)

      return {
        lastPlayedGame,
        league,
        leagueTableEntries,
        nextGame,
        team,
      } as AgeGroupData
    })
  )

  const validData: AgeGroupData[] = ageGroupData.filter((data) => data.team)

  console.log(validData)

  return <Homepage ageGroupData={validData} ageGroups={options} />
}

export default Home

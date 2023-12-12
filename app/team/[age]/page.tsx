import Markdown from 'react-markdown'

import getLastPlayedGame from '@/app/db/getLastGame'
import getLeague from '@/app/db/getLeague'
import getLeagueTable from '@/app/db/getLeagueTable'
import getNextGame from '@/app/db/getNextGame'
import getTeamAndGroupForAge from '@/app/db/getTeamAndGroupForAge'
import getTeamResults from '@/app/db/getTeamResults'
import getTeamSchedule from '@/app/db/getTeamSchedule'
import getTeamStaff from '@/app/db/getTeamStaff'
import { SplitContent, MainContent, SubContent } from '@/app/ui/SplitContent'
import Content from '@/app/ui/Content'
import ContentHero from '@/app/ui/ContentHero'
import LeagueTableFull from '@/app/ui/LeagueTableFull'
import PreviousGame from '@/app/ui/PreviousGame'
import ScheduledGame from '@/app/ui/ScheduledGame'
import TeamStaffMemberCard from '@/app/ui/TeamStaffMemberCard'
import styles from './styles.module.css'

export default async function TeamPage({
  params,
}: {
  params: { age: string }
}) {
  const team = await getTeamAndGroupForAge(params.age.toUpperCase())

  if (!team) {
    return null
  }

  // Get the last played game
  const lastPlayedGame = await getLastPlayedGame({ teamID: team.team_id })
  const nextGame = await getNextGame({ teamID: team.team_id })
  const teamResults = await getTeamResults({ teamID: team.team_id })
  const teamSchedule = await getTeamSchedule({ teamID: team.team_id })
  const league = await getLeague(team.group_id)
  const leagueTableEntries = await getLeagueTable(team.group_id)
  const staff = await getTeamStaff(params.age)

  return (
    <div className={styles.wrapper}>
      <ContentHero
        image={`/team_photos/${team.team_photo}`}
        title={`${team.name} - ${team.age}`}
      />

      <SplitContent>
        <MainContent>
          <Content>
            <Markdown>{team.bio}</Markdown>
          </Content>

          <Content>
            {league && leagueTableEntries && (
              <LeagueTableFull
                league={league}
                leagueTableEntries={leagueTableEntries}
                team={team}
              />
            )}
          </Content>

          {teamResults.length > 0 && (
            <Content>
              <h3>Results</h3>
              <div className={styles.resultList}>
                {teamResults.map((game) => (
                  <PreviousGame key={game.id} game={game} />
                ))}
              </div>
            </Content>
          )}

          {teamSchedule.length > 0 && (
            <Content>
              <h3>Schedule</h3>
              <div className={styles.resultList}>
                {teamSchedule.map((game) => (
                  <ScheduledGame key={game.date.getTime()} game={game} />
                ))}
              </div>
            </Content>
          )}
        </MainContent>

        <SubContent>
          <Content compact>
            {lastPlayedGame && (
              <PreviousGame game={lastPlayedGame} latestResult />
            )}
            {nextGame && <ScheduledGame game={nextGame} nextGame />}
          </Content>

          <Content compact>
            <h3 className={styles.contentTitle}>Staff</h3>
            <ul className={styles.staffList}>
              {staff.map((staff) => (
                <TeamStaffMemberCard key={staff.id} staff={staff} />
              ))}
            </ul>
          </Content>
        </SubContent>
      </SplitContent>
    </div>
  )
}

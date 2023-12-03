import Markdown from 'react-markdown'
import {
  getLastPlayedGame,
  getNextGame,
  getTeamAndGroupForAge,
  getTeamResults,
  getTeamSchedule,
} from '@/app/db'
import {
  Content,
  ContentHero,
  LeagueTableFull,
  PreviousGame,
  ScheduledGame,
  MainContent,
  SplitContent,
  SubContent,
} from '@/app/ui'
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
            <LeagueTableFull groupID={team.group_id} teamID={team.team_id} />
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
        </SubContent>
      </SplitContent>
    </div>
  )
}

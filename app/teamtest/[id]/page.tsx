import { u15NextGame, u15PreviousResult, u15Schedule } from '@/data/schedule'
import Content from '@/app/ui/Content'
import ContentHero from '@/app/ui/ContentHero'
import NextGame from '@/app/ui/NextGame'
import ScheduledGame from '@/app/ui/ScheduledGame'
import { MainContent, SplitContent, SubContent } from '@/app/ui/SplitContent'
import PreviousGame from '@/app/ui/PreviousGame'
import { db, getLastPlayedGame } from '@/app/lib/db'
import LeagueTableFull from '@/app/ui/LeagueTableFull'

export default async function TeamPage({ params }: { params: { id: number } }) {
  const team = await db
    .selectFrom('team')
    .innerJoin('league_team', 'team.id', 'league_team.team_id')
    .selectAll()
    .where('team.id', '=', params.id)
    .executeTakeFirst()

  if (!team) {
    return null
  }

  // Get the last played game
  const lastPlayedGame = await getLastPlayedGame({ teamID: team.id })

  return (
    <>
      <ContentHero
        image={`/team_photos/${team.team_photo}`}
        title={`${team.name} - ${team.age}`}
      />

      <SplitContent>
        <MainContent>
          <Content>
            <p>Intro to team</p>
            <h3>League</h3>
            <p>The IGA U15 team competes in the JPL Warrior league</p>
            <h3>Coach</h3>
            <p>Info about coach</p>
            <h3>Practice Schedule</h3>
            <p>
              The team practices twice a week on Tuesdays at Gordons school and
              ...
            </p>
          </Content>

          <Content>
            <p>
              Home: {lastPlayedGame?.home_team_name} :
              {lastPlayedGame?.home_team_score}
            </p>
            <p>
              Away: {lastPlayedGame?.away_team_name} :
              {lastPlayedGame?.away_team_score}
            </p>
          </Content>

          <Content>
            <LeagueTableFull groupID={team.group_id} teamID={params.id} />
          </Content>

          <Content>
            <h3>Schedule</h3>

            {u15Schedule.map((game) => (
              <ScheduledGame key={game.date.getTime()} {...game} />
            ))}
          </Content>
        </MainContent>

        <SubContent>
          <Content compact>
            <PreviousGame {...u15PreviousResult} />
            <NextGame {...u15NextGame} />
          </Content>
        </SubContent>
      </SplitContent>
    </>
  )
}

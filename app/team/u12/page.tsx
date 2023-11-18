import { u12LeagueTableSummary } from '@/app/data/leagueData'
import {
  u12NextGame,
  u12PreviousResult,
  u12Schedule,
} from '@/app/data/schedule'
import Content from '@/app/ui/Content'
import ContentHero from '@/app/ui/ContentHero'
import LeagueTable from '@/app/ui/LeagueTable'
import NextGame from '@/app/ui/NextGame'
import ScheduledGame from '@/app/ui/ScheduledGame'
import { MainContent, SplitContent, SubContent } from '@/app/ui/SplitContent'
import PreviousGame from '@/app/ui/PreviousGame'

export default function U12TeamPage() {
  return (
    <>
      <ContentHero
        image="/team_photos/u12-team.jpg"
        title="Inspire Girls Academy - U12"
      />

      <SplitContent>
        <MainContent>
          <Content>
            <p>Intro to team</p>
            <h3>League</h3>
            <p>The IGA U12 team competes in the JPL Warrior league</p>
            <h3>Coach</h3>
            <p>Info about coach</p>
            <h3>Practice Schedule</h3>
            <p>
              The team practices twice a week on Tuesdays at Gordons school and
              ...
            </p>
          </Content>

          <Content>
            <LeagueTable
              leagueName={'JPL U12 Warrior League - NPC Blue'}
              leagueTableEntries={u12LeagueTableSummary}
            />
          </Content>

          <Content>
            <h3>Schedule</h3>

            {u12Schedule.map((game) => (
              <ScheduledGame key={game.date.getTime()} {...game} />
            ))}
          </Content>
        </MainContent>

        <SubContent>
          <Content>
            <PreviousGame {...u12PreviousResult} />
            <NextGame {...u12NextGame} />
          </Content>
        </SubContent>
      </SplitContent>
    </>
  )
}

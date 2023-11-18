import { u13LeagueTableSummary } from '@/app/data/leagueData'
import {
  u13NextGame,
  u13PreviousResult,
  u13Schedule,
} from '@/app/data/schedule'
import Content from '@/app/ui/Content'
import ContentHero from '@/app/ui/ContentHero'
import LeagueTable from '@/app/ui/LeagueTable'
import NextGame from '@/app/ui/NextGame'
import ScheduledGame from '@/app/ui/ScheduledGame'
import { MainContent, SplitContent, SubContent } from '@/app/ui/SplitContent'
import PreviousGame from '@/app/ui/PreviousGame'

export default function U13TeamPage() {
  return (
    <>
      <ContentHero
        image="/team_photos/u13-team.jpg"
        title="Inspire Girls Academy - U13"
      />

      <SplitContent>
        <MainContent>
          <Content>
            <p>Intro to team</p>
            <h3>League</h3>
            <p>The IGA U13 team competes in the JPL Warrior league</p>
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
              leagueName={'JPL U13 Warrior League - NPC Blue'}
              leagueTableEntries={u13LeagueTableSummary}
            />
          </Content>

          <Content>
            <h3>Schedule</h3>

            {u13Schedule.map((game) => (
              <ScheduledGame key={game.date.getTime()} {...game} />
            ))}
          </Content>
        </MainContent>

        <SubContent>
          <Content>
            <PreviousGame {...u13PreviousResult} />
            <NextGame {...u13NextGame} />
          </Content>
        </SubContent>
      </SplitContent>
    </>
  )
}

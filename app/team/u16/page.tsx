import { u16LeagueTableSummary } from '@/app/data/leagueData'
import {
  u16NextGame,
  u16PreviousResult,
  u16Schedule,
} from '@/app/data/schedule'
import Content from '@/app/ui/Content'
import ContentHero from '@/app/ui/ContentHero'
import LeagueTable from '@/app/ui/LeagueTable'
import NextGame from '@/app/ui/NextGame'
import ScheduledGame from '@/app/ui/ScheduledGame'
import { MainContent, SplitContent, SubContent } from '@/app/ui/SplitContent'
import PreviousGame from '@/app/ui/PreviousGame'

export default function U16TeamPage() {
  return (
    <>
      <ContentHero
        image="/team_photos/u16-team.jpg"
        title="Inspire Girls Academy - U16"
      />

      <SplitContent>
        <MainContent>
          <Content>
            <p>Intro to team</p>
            <h3>League</h3>
            <p>The IGA U16 team competes in the JPL Warrior league</p>
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
              leagueName={'JPL U16 Warrior League - NPC Blue'}
              leagueTableEntries={u16LeagueTableSummary}
            />
          </Content>

          <Content>
            <h3>Schedule</h3>

            {u16Schedule.map((game) => (
              <ScheduledGame key={game.date.getTime()} {...game} />
            ))}
          </Content>
        </MainContent>

        <SubContent>
          <Content compact>
            <PreviousGame {...u16PreviousResult} />
            <NextGame {...u16NextGame} />
          </Content>
        </SubContent>
      </SplitContent>
    </>
  )
}

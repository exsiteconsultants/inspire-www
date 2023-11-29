import { u16LeagueTableSummary } from '../../../data/leagueData'
import {
  u16NextGame,
  u16PreviousResult,
  u16Schedule,
} from '../../../data/schedule'
import Content from '../../ui/Content'
import ContentHero from '../../ui/ContentHero'
import LeagueTable from '../../ui/LeagueTable'
import NextGame from '../../ui/NextGame'
import ScheduledGame from '../../ui/ScheduledGame'
import { MainContent, SplitContent, SubContent } from '../../ui/SplitContent'
import PreviousGame from '../../ui/PreviousGame'

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

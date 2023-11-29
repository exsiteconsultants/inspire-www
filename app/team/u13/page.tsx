import { u13LeagueTableSummary } from '../../../data/leagueData'
import {
  u13NextGame,
  u13PreviousResult,
  u13Schedule,
} from '../../../data/schedule'
import Content from '../../ui/Content'
import ContentHero from '../../ui/ContentHero'
import LeagueTable from '../../ui/LeagueTable'
import NextGame from '../../ui/NextGame'
import ScheduledGame from '../../ui/ScheduledGame'
import { MainContent, SplitContent, SubContent } from '../../ui/SplitContent'
import PreviousGame from '../../ui/PreviousGame'

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
          <Content compact>
            <PreviousGame {...u13PreviousResult} />
            <NextGame {...u13NextGame} />
          </Content>
        </SubContent>
      </SplitContent>
    </>
  )
}

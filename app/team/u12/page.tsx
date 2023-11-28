import { u12LeagueTableSummary } from '../../../data/leagueData'
import {
  u12NextGame,
  u12PreviousResult,
  u12Schedule,
} from '../../../data/schedule'
import Content from '../../../ui/Content'
import ContentHero from '../../../ui/ContentHero'
import LeagueTable from '../../../ui/LeagueTable'
import NextGame from '../../../ui/NextGame'
import ScheduledGame from '../../../ui/ScheduledGame'
import { MainContent, SplitContent, SubContent } from '../../../ui/SplitContent'
import PreviousGame from '../../../ui/PreviousGame'

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
            <p>
              The Inspire Girls Academy Under 12&apos;s team provides a platform
              for young girls passionate about football, aspiring to become
              professional athletes. Our committed passion to driving success
              has allowed former, and current players the opportunity in
              securing full-time contracts at the Brighton FC football academy
              as well as some of our current players having been selected for
              the Oxford Town and Reading Emerging Talent Centres which have
              opened avenues for further opportunities in their football
              journeys.
            </p>
            <p>
              Coached by qualified professionals, the team trains twice weekly,
              competes in the JPL Warrior league against teams like Crystal
              Palace and West Ham, and actively participates in cups and premier
              tournaments across the UK. Our dynamic style of play is built on
              exciting football, featuring set match targets and scenarios for
              comprehensive player development.
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
          <Content compact>
            <PreviousGame {...u12PreviousResult} />
            <NextGame {...u12NextGame} />
          </Content>
        </SubContent>
      </SplitContent>
    </>
  )
}

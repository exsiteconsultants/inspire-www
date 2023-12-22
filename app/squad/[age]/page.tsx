import Markdown from 'react-markdown'
import { SplitContent, MainContent, SubContent } from '@/app/ui/SplitContent'
import Content from '@/app/ui/Content'
import ContentHero from '@/app/ui/ContentHero'
import LeagueTableFull from '@/app/ui/LeagueTableFull'
import PreviousGame from '@/app/ui/PreviousGame'
import ScheduledGame from '@/app/ui/ScheduledGame'
import TeamStaffMemberCard from '@/app/ui/TeamStaffMemberCard'
import styles from './styles.module.css'
import getSquadAndGroupForAge from '@/app/db/getSquadAndGroupForAge'
import getLastPlayedGame from '@/app/db/getLastGame'
import getNextGame from '@/app/db/getNextGame'
import getGroup from '@/app/db/getGroup'
import getGroupTable from '@/app/db/getGroupTable'
import getSquadResults from '@/app/db/getSquadResults'
import getSquadSchedule from '@/app/db/getSquadSchedule'
import getSquadStaff from '@/app/db/getSquadStaff'

export default async function TeamPage({
  params,
}: {
  params: { age: string }
}) {
  const squad = await getSquadAndGroupForAge(params.age.toUpperCase())

  if (!squad) {
    return null
  }

  // Get the last played game
  const lastPlayedGame = await getLastPlayedGame({ squadID: squad.id })
  const nextGame = await getNextGame({ squadID: squad.id })
  const squadResults = await getSquadResults({ squadID: squad.id })
  const squadSchedule = await getSquadSchedule({ squadID: squad.id })
  const group = await getGroup(squad.group_id)
  const groupTableEntries = await getGroupTable(squad.group_id)
  const staff = await getSquadStaff(squad.id)

  return (
    <div className={styles.wrapper}>
      <ContentHero image={`/team_photos/${squad.photo}`} title={squad.age} />

      <SplitContent>
        <MainContent>
          <Content>
            <Markdown>{squad.bio}</Markdown>
          </Content>

          <Content>
            {group && groupTableEntries && (
              <LeagueTableFull
                group={group}
                groupTableEntries={groupTableEntries}
                squad={squad}
              />
            )}
          </Content>

          {squadResults.length > 0 && (
            <Content>
              <h3>Results</h3>
              <div className={styles.resultList}>
                {squadResults.map((game) => (
                  <PreviousGame key={game.id} game={game} />
                ))}
              </div>
            </Content>
          )}

          {squadSchedule.length > 0 && (
            <Content>
              <h3>Schedule</h3>
              <div className={styles.resultList}>
                {squadSchedule.map((game) => (
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

'use client'

import Link from 'next/link'
import { useState } from 'react'
import Markdown from 'react-markdown'
import { AgeGroupData } from '@/app/lib/types'
import Content from '@/app/ui/Content'
import TabNav from '@/app/ui/TabNav'
import TeamSummary from '@/app/ui/TeamSummary'
import styles from './styles.module.css'

const TeamSummaries: React.FC<{
  ageGroups: string[]
  ageGroupData: AgeGroupData[]
}> = ({ ageGroups, ageGroupData }) => {
  const [currentAge, setCurrentAge] = useState(ageGroups[0])

  return (
    <>
      <TabNav
        options={ageGroups}
        selectedTab={currentAge}
        setSelectedTab={setCurrentAge}
      />

      {ageGroupData.map(
        ({ lastPlayedGame, league, leagueTableEntries, nextGame, team }) => (
          <div
            key={team?.id}
            className={`${styles.teamContentWrapper} ${
              team?.age !== currentAge ? styles.hidden : ''
            }`}
          >
            <div className={styles.teamContent}>
              <TeamSummary
                lastPlayedGame={lastPlayedGame}
                league={league}
                leagueTableEntries={leagueTableEntries}
                nextGame={nextGame}
                team={team}
              />

              <Link className={styles.teamLink} href={`/team/${team?.age}`}>
                Find out more
              </Link>

              {team && team.bio && team.bio !== 'tbd' && (
                <Content>
                  <Markdown>{team.bio}</Markdown>
                </Content>
              )}
            </div>
          </div>
        )
      )}
    </>
  )
}

export default TeamSummaries

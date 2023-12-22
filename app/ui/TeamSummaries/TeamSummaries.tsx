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
        ({ lastPlayedGame, group, groupTableEntries, nextGame, squad }) => (
          <div
            key={squad?.id}
            className={`${styles.teamContentWrapper} ${
              squad?.age !== currentAge ? styles.hidden : ''
            }`}
          >
            <div className={styles.teamContent}>
              <TeamSummary
                lastPlayedGame={lastPlayedGame}
                group={group}
                groupTableEntries={groupTableEntries}
                nextGame={nextGame}
                squad={squad}
              />

              <Link className={styles.teamLink} href={`/squad/${squad?.age}`}>
                Find out more
              </Link>

              {squad && squad.bio && squad.bio !== 'tbd' && (
                <Content>
                  <Markdown>{squad.bio}</Markdown>
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

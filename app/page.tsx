'use client'

import { useState } from 'react'
import {
  u12LeagueTableSummary,
  u13LeagueTableSummary,
  u15LeagueTableSummary,
  u16LeagueTableSummary,
} from '@/app/data/leagueData'
import {
  u12NextGame,
  u12PreviousResult,
  u13NextGame,
  u13PreviousResult,
  u15NextGame,
  u15PreviousResult,
  u16NextGame,
  u16PreviousResult,
} from '@/app/data/schedule'
import Content from '@/app/ui/Content'
import TabNav from '@/app/ui/TabNav'
import NextGame from '@/app/ui/NextGame'
import LeagueTable from '@/app/ui/LeagueTable'
import PreviousGame from '@/app/ui/PreviousGame'
import styles from './page.module.css'

const options = ['u12', 'u13', 'u15', 'u16']

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<string>('u12')
  return (
    <main className={styles.homepage}>
      <div className={styles.hero}>
        <div className={styles.featuredArticle}>
          <div
            className={styles.featuredImage}
            style={{ backgroundImage: 'url(/images/stories/cover.jpg)' }}
          >
            &nbsp;
          </div>
          <div className={styles.featuredStory}>
            <div>
              <h1 className={styles.featuredTitle}>
                Empowering Dreams, Igniting Excellence
              </h1>
              <h2 className={styles.featuredSubTitle}>
                Every Kick Fuels a journey, and Every Goal Sparks Greatness
              </h2>
            </div>
            <a
              href="/about"
              className={`btn btn-white btn-outline ${styles.featuredLink}`}
            >
              Read More
            </a>
          </div>
        </div>
      </div>

      <Content>
        <p>
          At Inspire Girls Academy, our commitment extends beyond inspiration;
          we forge a path of excellence for female athletes, nurturing not just
          players but visionary leaders. We empower individuals to surpass their
          highest potential, creating a legacy of inspiration that transcends
          the game. Rooted in &apos;Respect, Honesty, and Integrity&apos; our
          philosophy centers on the standards we instill in our players, our
          coaches, and our club. These principles form the bedrock of our
          vision, providing essential support pillars to prepare our girls for
          high-level football.
        </p>
        <p>
          Beyond the field, we aim to instill the same principles across our age
          groups, ensuring that our athletes are not only equipped with the
          skills needed for elite football but are also imbued with a positive
          attitude. This forward-thinking approach prepares our players for the
          challenges of elite-level competition, laying the foundation for a
          future where greatness is not just a goal but a constant pursuit.
        </p>
      </Content>

      <TabNav
        options={options}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <div className={styles.teamContentWrapper}>
        {selectedTab === 'u12' && (
          <div data-team="u12" className={styles.teamContent}>
            <div className={styles.teamData}>
              <PreviousGame {...u12PreviousResult} />
              <NextGame {...u12NextGame} />
              <LeagueTable
                leagueName={'JPL U12 Warrior League - NPC Blue'}
                leagueTableEntries={u12LeagueTableSummary}
              />
            </div>

            <div className={styles.teamLink}>
              <a href="/team/u12">Find out more</a>
            </div>

            <Content>
              <p>
                The Inspire girls academy under 12&apos;s team was formed in
                2023 to start an all girls team to allow young girls with a
                passion for football and a desire to one day become a
                professional footballer or sport person.
              </p>
              <p>
                The under 12&apos;s team trains twice a week with qualified
                coaches and competes in the JPL Warrior league against teams
                such as Crystal Palace. The team also plays in cups and premiere
                tournaments across the UK.
              </p>
            </Content>
          </div>
        )}

        {selectedTab === 'u13' && (
          <div data-team="u13" className={styles.teamContent}>
            <div className={styles.teamData}>
              <PreviousGame {...u13PreviousResult} />
              <NextGame {...u13NextGame} />

              <LeagueTable
                leagueName={'JPL U13 Warrior League - NPC Blue'}
                leagueTableEntries={u13LeagueTableSummary}
              />
            </div>

            <div className={styles.teamLink}>
              <a href="/team//u13">Find out more</a>
            </div>

            <Content>
              <p>
                The newly formed UGA U13&apos;s was formed for players that
                wanted to progress out of grassroots football and into a more
                competitive environment. The team compete in the JPL Warrior
                league against teams such as Crystal Palace as well as playing
                in cups and premiere tournaments across the UK.
              </p>

              <p>
                The team trains twice and week, concentrating on skills and
                tactics and how they apply to each players position. The team is
                further supported in areas of fitness, strenth and conditioning.
              </p>
            </Content>
          </div>
        )}

        {selectedTab === 'u15' && (
          <div data-team="u15" className={styles.teamContent}>
            <div className={styles.teamData}>
              <PreviousGame {...u15PreviousResult} />
              <NextGame {...u15NextGame} />

              <LeagueTable
                leagueName={'JPL U15 Warrior League - NPC Red'}
                leagueTableEntries={u15LeagueTableSummary}
              />
            </div>

            <div className={styles.teamLink}>
              <a href="/team/u15">Find out more</a>
            </div>

            <Content>
              <p>
                The Inspire girls academy under 15&apos;s team was formed in
                2022 to take provide a route for players that wanted to progress
                out of grassroots football and into a more competitive
                environment.
              </p>
              <p>
                The team has now been expanded and improved, following a
                successful summer trial process, and are once again competing in
                the JPL Warrior league at the highest level.
              </p>

              <p>
                The under 15&apos;s team trains twice a week regular JPL league
                games, county cups and premiere tournaments across the UK.
              </p>
            </Content>
          </div>
        )}

        {selectedTab === 'u16' && (
          <div data-team="u16" className={styles.teamContent}>
            <div className={styles.teamData}>
              <PreviousGame {...u16PreviousResult} />
              <NextGame {...u16NextGame} />

              <LeagueTable
                leagueName={'JPL U16 Warrior League - NPC Green'}
                leagueTableEntries={u16LeagueTableSummary}
              />
            </div>

            <div className={styles.teamLink}>
              <a href="/team/u16">Find out more</a>
            </div>

            <Content>
              <p>
                The Inspire girls academy under 16&apos;s team was formed in
                2022 with the aim of providing a platform for young women to
                perform at an elite level and provide a pathway into a career in
                sport. During their first year they found great success in the
                JPL Warrior league and continue into the 2023/24 season with
                their coac Sophie Hollis with there sights set on winning the
                league.
              </p>
            </Content>
          </div>
        )}
      </div>
    </main>
  )
}

export default Home

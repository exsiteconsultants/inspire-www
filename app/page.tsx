import Image from 'next/image'
import { getLastPlayedGame } from '@/app/db/getLastGame'
import { getLeague } from '@/app/db/getLeague'
import { getLeagueTable } from '@/app/db/getLeagueTable'
import { getNextGame } from '@/app/db/getNextGame'
import { getTeamAndGroupForAge } from '@/app/db/getTeamAndGroupForAge'
import { AgeGroupData } from '@/app/lib/types'
import Content from '@/app/ui/Content'
import { TeamSummaries } from '@/app/ui/TeamSummaries/TeamSummaries'
import { ThreeColumnSplit } from '@/app/ui/ThreeColumnSplit'
import styles from './styles.module.css'

const ageGroups = ['U12', 'U13', 'U15', 'U16']

const Home = async () => {
  // Get the data for each age group
  const ageGroupData = await Promise.all(
    ageGroups.map(async (age) => {
      const team = await getTeamAndGroupForAge(age.toUpperCase())

      if (!team)
        return Promise.resolve({
          lastPlayedGame: null,
          league: null,
          leagueTableEntries: [],
          nextGame: null,
          team: null,
        })

      const lastPlayedGame = await getLastPlayedGame({ teamID: team.team_id })
      const nextGame = await getNextGame({ teamID: team.team_id })
      const league = await getLeague(team.group_id)
      const leagueTableEntries = await getLeagueTable(team.group_id)

      return {
        lastPlayedGame,
        league,
        leagueTableEntries,
        nextGame,
        team,
      } as AgeGroupData
    })
  )

  const validData: AgeGroupData[] = ageGroupData.filter((data) => data.team)

  return (
    <main className={styles.homepage}>
      <div className={styles.hero}>
        <div>
          <h1 className={styles.featuredTitle}>
            Empowering Dreams, Igniting Excellence
          </h1>
          <h2 className={styles.featuredSubTitle}>
            Where Every Kick Fuels a journey, and Every Goal Sparks Greatness
          </h2>
        </div>
      </div>

      <Content>
        <p>
          At Inspire Girls Academy, our commitment extends beyond inspiration;
          we forge a path of excellence for female athletes, nurturing not just
          players but visionary leaders. We empower individuals to surpass their
          highest potential, creating a legacy of inspiration that transcends
          the game.
        </p>
        <p>
          Rooted in{' '}
          <strong>&apos;Respect, Honesty, and Integrity,&apos;</strong> our
          philosophy centers on the standards we instill in our players, our
          coaches, and our club. These principles form the bedrock of our
          vision, providing essential support pillars to prepare our girls for
          high-level football.
        </p>
        <p>
          Beyond the field, we aim to instill the same principles across our age
          groups, ensuring that our athletes are not only equipped with the
          skills needed for elite football but are also imbued with a positive
          attitude.
        </p>
        <p>
          This forward-thinking approach prepares our players for the challenges
          of elite-level competition, laying the foundation for a future where
          {''}
          <strong>
            &apos;greatness is not just a goal but a constant pursuit&apos;
          </strong>
        </p>
      </Content>

      <Content>
        <ThreeColumnSplit>
          <div>
            <Image
              src="/images/hampshirefa.png"
              height={64}
              width={49}
              alt="Hampshire FA"
            />
          </div>
          <div>
            <Image
              src="/images/accredited.png"
              height={64}
              width={122}
              alt="FA Accreditation"
            />
          </div>
          <div>
            <Image
              src="/images/warriors.jpg"
              height={64}
              width={44}
              alt="JPL Warriors"
            />
          </div>
        </ThreeColumnSplit>
      </Content>

      <TeamSummaries ageGroups={ageGroups} ageGroupData={validData} />
    </main>
  )
}

export default Home

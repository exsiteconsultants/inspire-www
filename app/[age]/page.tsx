import Image from 'next/image'
import { Content, TabNav, TeamSummary, ThreeColumnSplit } from '@/app/ui'
import styles from './styles.module.css'

const options = ['u12', 'u13', 'u15', 'u16']

const Home = ({ params }: { params: { age: string } }) => {
  const age = params.age || 'u12'

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

      <TabNav options={options} selectedTab={age} />

      <div className={styles.teamContentWrapper}>
        <div className={styles.teamContent}>
          <TeamSummary age={age} />

          <div className={styles.teamLink}>
            <a href={`/team/${age}`}>Find out more</a>
          </div>

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
          </Content>
        </div>
      </div>
    </main>
  )
}

export default Home

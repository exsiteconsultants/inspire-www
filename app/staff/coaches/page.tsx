import Markdown from 'react-markdown'
import getCoaches from '@/app/db/getCoaches'
import Content from '@/app/ui/Content'
import ContentHero from '@/app/ui/ContentHero'
import Grid from '@/app/ui/Grid'
import ImageCard from '@/app/ui/ImageCard'

export default async function CoachesPage() {
  const coaches = await getCoaches()

  return (
    <>
      <ContentHero
        image="/banners/changingroomshirts.jpg"
        title="Coaching Staff"
      />
      <Content>
        <Grid>
          {coaches.map((coach) => (
            <ImageCard
              key={coach.name}
              email={coach.email || undefined}
              id={`coach-${coach.id}`}
              image={coach.image || '/images/unknown.png'}
              subTitle={coach.title}
              title={coach.name}
            >
              <Markdown>{coach.bio}</Markdown>
            </ImageCard>
          ))}
        </Grid>
      </Content>
    </>
  )
}

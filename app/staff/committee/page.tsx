import Markdown from 'react-markdown'
import getCommittee from '@/app/db/getCommittee'
import Content from '@/app/ui/Content'
import ContentHero from '@/app/ui/ContentHero'
import Grid from '@/app/ui/Grid'
import ImageCard from '@/app/ui/ImageCard'

export default async function CommitteePage() {
  const committee = await getCommittee()

  return (
    <>
      <ContentHero image="/banners/changingroomshirts.jpg" title="Committee" />
      <Content>
        <Grid>
          {committee.map((staff) => (
            <ImageCard
              key={staff.name}
              email={staff.email || undefined}
              id={`staff-${staff.id}`}
              image={staff.image || '/images/unknown.png'}
              subTitle={staff.title}
              title={staff.name}
            >
              <Markdown>{staff.bio}</Markdown>
            </ImageCard>
          ))}
        </Grid>
      </Content>
    </>
  )
}

import { StaffMember } from '@/app/lib/types'
import Content from '@/app/ui/Content'
import ContentHero from '@/app/ui/ContentHero'
import Grid from '@/app/ui/Grid'
import ImageCard from '@/app/ui/ImageCard'

const staffData: StaffMember[] = [
  {
    name: 'Sophie Hollis',
    title: 'President',
    bio: `Sophie has played for several elite clubs in and around the area of Surrey & Hampshire.
    At 17, Sophie gained a full athletic scholarship to play professional college soccer in America.
    After battling through a long term injury, Sophie fell in love with coaching, so much so that she
    decided to create Inspire Girls Football & IGF FC. Sophie now continues to inspire over
    2,000 players across the country. Sophie has recently got back from America where she was head
    coach for several elite travel teams in New York, New Jersey & Pennsylvania.`,
    image: 'staff/sophie.jpg',
  },
  {
    name: 'Aaron Campbell',
    title: 'Chairman',
    bio: `tbd`,
    image: 'staff/unknown.png',
  },
  {
    name: 'Paul MacRae',
    title: 'Vice Charman & U15s Manager',
    bio: `Paul, or Jocky, inherited his nickname from his adult playing days at Hartley Wintney. Paul
    played for several other local clubs including Bagshot, Bass Alton & Fleet Spurs. A very well
    respected coach, he has 17 years of coaching experience at all ages, including Allied Counties
    u18s, adult mens teams and a former Aldershot & Farnborough District coach at u11s.`,
    image: 'staff/paul.jpg',
  },
  {
    name: 'Darren Moggach',
    title: 'Treasurer',
    bio: `After taking a role at Fleet Town Girls & Ladies FC in 2017 IGAs found, Darren Moggach,
    identified the level of local talent, but found there was no pathway for those players to
    continue their journey, and ultimately, their dream to play professional football. Darren has
    more recently taken on the role as Chairman for this club.`,
    image: 'staff/darren.jpg',
  },
]

export default function StaffPage() {
  return (
    <>
      <ContentHero
        image="/banners/changingroomshirts.jpg"
        title="Who are we?"
      />
      <Content>
        <Grid>
          {staffData.map((staff) => (
            <ImageCard
              key={staff.name}
              title={staff.name}
              subTitle={staff.title}
              image={staff.image}
            >
              {staff.bio}
            </ImageCard>
          ))}
        </Grid>
      </Content>
    </>
  )
}

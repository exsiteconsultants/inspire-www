import addStaff, { AddStaffParams } from '@/app/db/addStaff'
import { NewStaff } from '@/app/db/types'

const coaches: AddStaffParams[] = [
  {
    name: 'Sophie Hollis',
    title: 'Manager',
    bio: `Sophie has played for several elite clubs in and around the area of Surrey & Hampshire. At 17,
Sophie gained a full athletic scholarship to play professional college soccer in America. After battling
through a long term injury, Sophie fell in love with coaching, so much so that she decided to create
Inspire Girls Football & IGA.

Sophie now continues to inspire over 3,000 players across the country. Sophie has recently got back from
America where she was head coach for several elite travel teams in New York, New Jersey & Pennsylvania`,
    image: 'staff/sophie.jpg',
    email: 'u16@inspiregirlsacademy.co.uk',
    teamAge: 'U16',
  },
  {
    name: 'Aaron Campbell',
    title: 'Coach',
    bio: `Joining Inspire Girls Academy at the outset of the 2023/24 season, Aaron holds dual roles as
both a coach and our Chair. With a background in business and a wealth of management expertise,
he plays a vital role in steering us towards sustained growth.

Aaron's commitment to our committee's vision and unwavering enthusiasm is matched only by a
profound dedication to providing girls with an elite pathway in football. This shared
passion harmonizes seamlessly with our organizational commitment to creating a nurturing
platform where talent can not only flourish but also evolve.
    `,
    image: 'staff/aaron.jpg',
    teamAge: 'U15',
  },
  {
    name: 'Paul MacRae',
    title: 'Manager',
    bio: `Paul, or Jocky, inherited his nickname from his adult playing days at Hartley Wintney. Paul
played for several other local clubs including Bagshot, Bass Alton & Fleet Spurs.

A very well respected coach, he has 17 years of coaching experience at all ages, including Allied Counties
u18s, adult mens teams and a former Aldershot & Farnborough District coach at u11s.`,
    image: 'staff/paul.jpg',
    email: 'u15@inspiregirlsacademy.co.uk',
    teamAge: 'U15',
  },
  {
    name: 'Erin Wetherill',
    title: 'Manager',
    bio: `Hello, I'm Erin, and I proudly lead the U13's team at Inspire Girls Academy. My journey
with IGA began from its inception, and I've been immersed in the club's growth and
development since day one.

My coaching philosophy centers on more than just the technical aspects of the game. Drawing
from my own experiences, I'm passionate about instilling confidence in young players. I lost
and regained my love for football, battled through injuries, and emerged stronger. Now, I aim
to empower the girls not only with the skills to excel on the pitch but also with a mindset
that fosters resilience and self-assurance. I find joy in educating the girls on injury prevention,
playing with confidence, proper warm-up routines, and physical strength on the pitch. It's not
just about the game; it's about equipping them with life skills, showing them how to use their abilities
effectively and safely.

Join me and the U13's team at Inspire Girls Academy, where we don't just play football;
we build confidence, resilience, and a love for the game that lasts a lifetime.`,
    image: 'staff/unknown.png',
    email: 'u13@inspiregirlsacademy.co.uk',
    teamAge: 'U13',
  },
  {
    name: 'Kieran Doyle',
    title: 'Coach',
    bio: `Kieran has been coaching Girls football since starting the FA Wildcats program at AFC Walcountians
in 2018. He holds an FA Level 1 qualification and is awaiting his UEFA C coaching course start.

Kieran manages and coaches U13 Girls on Sundays in the Surrey County Womens & Girls League, in
addition to the U9 Boys team in the Surrey Youth League and being Assistant Coach to the Adults
1stXI, that are currently in the Surrey Premier County Football League.`,
    image: 'staff/kieran.png',
    teamAge: 'U13',
  },
  {
    name: 'Gareth Wedgewood',
    title: 'Coach',
    bio: `Having coached girls football for 14 years both in England and in the USA, my coaching
philosophy revolves around a player-centered, or as I prefer, 'needs-centered' approach.
This empowers players to take ownership, fostering both individual and team growth.

I believe in giving players the freedom to make decisions and solve problems, especially
beneficial for younger players who thrive in an environment that encourages expressing
themselves on the pitch. I value the input of each player in training and games, promoting
problem-solving and decision-making.

As a coach, my role is to provide support when needed,
building strong relationships by sharing ideas with the individuals I work with.`,
    image: 'staff/gareth.jpg',
    teamAge: 'U12',
  },
  {
    name: 'Hannah Cooper',
    title: 'Coach',
    bio: `Hannah brings a wealth of knowledge and a deep passion for football to Inspire Girls
Academy. A proud alumna of the University of Exeter, where she earned her degree in Exercise
and Sports Science, Hannah's educational journey continued with a Master's in Sports Medicine
and a PGCE.

Her professional journey has taken her through renowned football academies, including Chelsea,
Portsmouth, Crystal Palace, Dorking, and Glasgow Rangers, where she has played a pivotal role
in shaping the next generation of athletes.

Hannah has a rich history of playing the game and coaching across various levels. From contributing
to Surrey Schools FA and English Colleges to serving as the Sports Conditioning Coach for Women's
National League Side Gillingham (now Chatham), Hannah's expertise spans both grassroots and elite
football.`,
    image: 'staff/coops.jpg',
    teamAge: 'U16',
  },
]

const committee: AddStaffParams[] = [
  {
    name: 'Sophie Hollis',
    title: 'President',
    bio: `I like to tell myself that I learned about life with a ball at my feet.
My passion for football developed from the age of five and even to this day I realised
that football was going to play an integral part in my life and future career pathway.
I have had several setbacks through injury and mental health problems, this has shaped
me into the woman I am today.

Football has had such a positive influence on my life. It has provided me with a sense
of community and confidence that continues to shape my life on and off the pitch.
I have an unrivalled desire to contribute to the future sporting careers of athletes
and young girls. Coaches have what children want — the games they love. They have the
power to inspire, influence and change the lives of the ones they coach.`,
    image: 'staff/sophie.jpg',
    email: 'president@inspiregirlsacademy.co.uk',
  },
  {
    name: 'Aaron Campbell',
    title: 'Chairman',
    bio: `Joining Inspire Girls Academy at the outset of the 2023/24 season, Aaron holds dual roles as
both a coach and our Chair. With a background in business and a wealth of management expertise,
he plays a vital role in steering us towards sustained growth.

Aaron's commitment to our committee's vision and unwavering enthusiasm is matched only by a
profound dedication to providing girls with an elite pathway in football. This shared
passion harmonizes seamlessly with our organizational commitment to creating a nurturing
platform where talent can not only flourish but also evolve.`,
    image: 'staff/aaron.jpg',
    email: 'chair@inspiregirlsacademy.co.uk',
  },
  {
    name: 'Paul MacRae',
    title: 'Vice Charman',
    bio: `Paul, or Jocky, inherited his nickname from his adult playing days at Hartley Wintney. Paul
played for several other local clubs including Bagshot, Bass Alton & Fleet Spurs.

A very well respected coach, he has 17 years of coaching experience at all ages, including Allied Counties
u18s, adult mens teams and a former Aldershot & Farnborough District coach at u11s.`,
    image: 'staff/paul.jpg',
    email: 'vicechair@inspiregirlsacademy.co.uk',
  },
  {
    name: 'Darren Moggach',
    title: 'Treasurer',
    bio: `After taking a role at Fleet Town Girls & Ladies FC in 2017 IGAs found, Darren Moggach,
identified the level of local talent, but found there was no pathway for those players to
continue their journey, and ultimately, their dream to play professional football.

Darren has more recently taken on the role as treasurer for this club.`,
    image: 'staff/darren.jpg',
    email: 'treasurer@inspiregirlsacademy.co.uk',
  },
]

export async function GET() {
  try {
    for (const staff of coaches) {
      await addStaff(staff)
    }

    for (const staff of committee) {
      await addStaff(staff)
    }
    return Response.json({ done: true })
  } catch (error) {
    return Response.json({ error })
  }
}

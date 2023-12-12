import Image from 'next/image'
import { TeamStaffMember } from '@/app/db/getTeamStaff'
import styles from './styles.module.css'
import Link from 'next/link'

const TeamStaffMemberCard: React.FC<{
  staff: TeamStaffMember
}> = ({ staff }) => (
  <Link href={`/staff/coaches#coach-${staff.id}`} className={styles.link}>
    <article className={styles.teamStaffMember}>
      <div className={styles.content}>
        {staff.image && (
          <Image
            src={`/images/${staff.image}`}
            height={68}
            width={68}
            className={styles.image}
            alt="Coach Photo"
          />
        )}

        <div className={styles.info}>
          <h3 className={styles.name}>{staff.name}</h3>
          <p className={styles.title}>{staff.title}</p>
        </div>
      </div>
    </article>
  </Link>
)

export default TeamStaffMemberCard

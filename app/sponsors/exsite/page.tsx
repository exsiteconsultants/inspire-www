import Image from 'next/image'
import { Quicksand } from 'next/font/google'
import Content from '@/app/ui/Content'
import styles from './styles.module.css'

const exsiteFont = Quicksand({
  weight: '400',
  subsets: ['latin'],
})

export default function ExsiteSponsorPage() {
  return (
    <>
      <div className={styles.bigCard}>
        <div>
          <article className={styles.cardContent}>
            <h1 className={`${styles.exsiteLogo} ${exsiteFont.className}`}>
              E<span className={styles.exsiteHighlight}>x</span>site.
              <span className={styles.exsiteHighlight}>dev</span>
            </h1>
            <p>Online and mobile applications</p>
          </article>
        </div>
        <div>
          <Image
            className={styles.coverImage}
            src="/images/sponsors/exsiteshirt.webp"
            alt="Exsite Laptop"
            width={500}
            height={250}
          />
        </div>
      </div>

      <Content>
        <p>
          At the start of the 2023 season Exsite commited to sponsoring Inspire
          Girls Academy (IGA) on a minimum 2 year deal.
        </p>

        <p>
          Exsite is a small consultancy based in the UK with experience building
          and running online services for a range of clients from small startups
          to government departments and UK mobile telecom operators.
        </p>
        <p>
          Exsite has been building web applications since the web started; the
          first site was the very first travel website built around 1995 for
          Thomson Holidays and not long after that built the first website for
          Hotel Chocolat. Later Exsite developed early prototypes of search for
          Sky TV Set top boxes and sent the first 3G email in the UK when
          working on unified messaging for Three UK.
        </p>
        <p>
          More recent work has involved building services for government
          departments such as the Ministry of Justice, Department of
          International Trade and other branches of UK government. This work has
          included public facing services, internal tools and prototyping future
          ideas.
        </p>
        <p>
          Exsite is also involved in sponsorship of girls and womens football
          due to the growing exposure of the sport and the positive physical and
          mental benefits it brings. Over the past few years Exsite has
          sponsored Bracknell AFC Rockettes grassroots team and Lilly Woodham at
          Reading WFC.
        </p>

        <p>
          If you are a charity, or trying to make the world a better place as a
          not-for-profit, Exsite will help for free where possible. Please get
          in touch to discuss your project.
        </p>
        <p>
          Visit <a href="https://exsite.dev">exsite.dev</a> for more details
        </p>
      </Content>
    </>
  )
}

import { Content, ContentHero } from '@/app/ui'

export default function AboutPage() {
  return (
    <>
      <ContentHero image="/banners/greenshirt.jpg" title="Contact us" />

      <Content>
        <p>
          Hello and thank you for reaching out to Inspire Girls Academy! We
          welcome your inquiries, feedback, and the opportunity to connect with
          you. Whether you&apos;re a parent interested in enrolling your
          daughter, a potential sponsor, or simply curious about our mission and
          programs, we&apos;re here to assist you.
        </p>
        <h2>General Inquiries</h2>
        <p>
          For general inquiries or information about Inspire Girls Academy,
          please feel free to email us at{' '}
          <a href="mailto:enquiries@inspiregirlsacademy.co.uk">
            enquiries@inspiregirlsacademy.co.uk
          </a>
          . We strive to respond promptly to all messages.{' '}
        </p>
        <h2>Enrollment and Registration</h2>
        <p>
          If you are interested in enrolling your daughter or would like
          information about our programs and upcoming trials, please reach out
          to us at{' '}
          <a href="mailto:trials@inspiregirlsacademy.co.uk">
            trials@inspiregirlsacademy.co.uk
          </a>
          .
        </p>
        <h2>Sponsorship and Partnerships</h2>
        <p>
          Inspire Girls Academy values the support of sponsors and partners. If
          you are interested in exploring sponsorship opportunities or forming a
          partnership with us, please contact us at{' '}
          <a href="mailto:partners@inspiregirlsacademy.co.uk">
            partners@inspiregirlsacademy.co.uk
          </a>
        </p>
        <h2>Media and Press</h2>
        <p>
          For media inquiries, interviews, or press-related matters, please
          contact us at{' '}
          <a href="mailto:media@inspiregirlsacademy.co.uk">
            media@inspiregirlsacademy.co.uk
          </a>
          . We are happy to provide information, arrange interviews, and
          collaborate on media features.
        </p>
        <h2>Visit Us</h2>
        <p>
          If you&apos;d like to visit our training sessions or attend a game,
          please check our teams&apos; calendars for upcoming activities. For
          specific visit-related inquiries, feel free to contact us at{' '}
          <a href="mailto:enquiries@inspiregirlsacademy.co.uk">
            enquiries@inspiregirlsacademy.co.uk
          </a>
          .
        </p>
      </Content>
    </>
  )
}

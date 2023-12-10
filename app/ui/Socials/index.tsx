import styles from './styles.module.css'

export const Socials = () => (
  <ul className={styles.socialChannels}>
    <li className={styles.socialChannel}>
      <a
        href="https://www.facebook.com/profile.php?id=61553031356173"
        target="_blank"
      >
        Facebook
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          fill="currentColor"
          xlinkHref="#facebook-a"
        >
          <path
            id="facebook-a"
            d="M24 4c0-2.102-1.898-4-4-4H4C1.898 0 0 1.898 0 4v16c0 2.102 1.898 4 4 4h8v-9.067H9.067v-4H12V9.375c0-2.688 2.018-5.108 4.5-5.108h3.233v4H16.5c-.354 0-.767.43-.767 1.073v1.593h4v4h-4V24H20c2.102 0 4-1.898 4-4V4z"
          ></path>
        </svg>
      </a>
    </li>
    <li className={styles.socialChannel} data-v-3d3bf44c="">
      <a href="https://twitter.com/iga_fc" target="_blank">
        X
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g clipPath="url(#a)" data-v-3ecf1f6a="">
            <path
              fill="currentColor"
              d="M13.969 10.157 22.707 0h-2.07l-7.588 8.82L6.99 0H0l9.164 13.336L0 23.988h2.07l8.013-9.314 6.4 9.314h6.989l-9.504-13.83h.001Zm-2.836 3.297-.929-1.328L2.817 1.559h3.18l5.962 8.528.929 1.328 7.75 11.085h-3.181l-6.324-9.046Z"
            ></path>
          </g>
          <defs data-v-3ecf1f6a="">
            <clipPath id="a" data-v-3ecf1f6a="">
              <path fill="currentColor" d="M0 0h23.472v24H0z"></path>
            </clipPath>
          </defs>
        </svg>
      </a>
    </li>{' '}
    <li className={styles.socialChannel}>
      <a
        href="https://instagram.com/inspiregirlsacademy?igshid=NGVhN2U2NjQ0Yg=="
        target="_blank"
      >
        Instagram
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          fill="currentColor"
          fillRule="evenodd"
          xlinkHref="#instagram-a"
        >
          <path
            id="instagram-a"
            d="M8.6.012c2.389-.016 4.778-.019 7.167.008 1.257.014 2.52.057 3.728.478 2.315.807 3.679 2.447 4.195 4.818.236 1.084.25 2.19.257 3.29.016 2.38.018 4.76-.008 7.14-.014 1.266-.055 2.538-.48 3.754-.81 2.315-2.45 3.677-4.823 4.19-1.084.235-2.188.239-3.29.258-.372.007-.746.01-1.12.01l-2.24-.005v.033c-1.636-.029-3.272-.043-4.907-.09-1.387-.041-2.73-.3-3.933-1.04-1.578-.969-2.496-2.403-2.876-4.2-.23-1.085-.25-2.189-.258-3.29-.015-2.397-.02-4.795.009-7.193.014-1.256.06-2.518.485-3.726C1.314 2.14 2.952.788 5.31.27 6.394.033 7.499.02 8.6.012zm3.407 2.108v.046c-1.016 0-2.032-.026-3.046.008-1.02.034-2.05.055-3.056.211-1.73.269-2.925 1.253-3.393 2.974a8.612 8.612 0 00-.282 2.016 182.514 182.514 0 00-.063 6.036c.01 1.441.025 2.89.167 4.322.197 1.992 1.348 3.362 3.338 3.808 1.084.244 2.19.227 3.289.243 2.012.029 4.025.03 6.037 0 1.02-.016 2.05-.053 3.056-.21 1.728-.27 2.927-1.25 3.392-2.973.176-.651.265-1.34.283-2.016.053-2.028.077-4.059.064-6.088a57.636 57.636 0 00-.164-4.27c-.099-1.216-.605-2.273-1.609-3.036-.817-.622-1.769-.877-2.768-.92-1.747-.076-3.496-.104-5.245-.151zm.122 3.788c3.357.002 6.082 2.763 6.082 6.162 0 3.423-2.737 6.143-6.182 6.142-3.41-.001-6.122-2.75-6.121-6.202 0-3.397 2.76-6.105 6.221-6.102zm-.073 2.16c-2.19.006-3.99 1.81-3.988 3.995.003 2.188 1.81 3.991 3.996 3.988 2.187-.003 3.99-1.81 3.987-3.996-.003-2.187-1.813-3.993-3.995-3.987zm6.24-3.817c.813.005 1.423.637 1.416 1.464a1.445 1.445 0 01-1.446 1.424c-.797-.012-1.456-.682-1.443-1.466a1.444 1.444 0 011.473-1.422z"
          ></path>
        </svg>
      </a>
    </li>
  </ul>
)

export default Socials

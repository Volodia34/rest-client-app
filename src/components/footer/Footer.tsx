import styles from './Footer.module.scss';
import rsSchool from '../../assets/img/rs_school_react.svg';
import gitHubIcon from '../../assets/img/github.svg';
import Image from 'next/image';
import { developers } from '@/constants/developers';

const Footer = () => {
  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.copy}>© 2025 All rights reserved.</div>
      <div className={styles.developers}>
        {developers.map((dev) => (
          <a
            key={dev.url}
            href={dev.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.developerLink}
          >
            <Image
              priority={true}
              className={styles.image}
              src={gitHubIcon}
              alt={`${dev.name}'s GitHub`}
            />
            <span className={styles.developerName}>{dev.name}</span>
          </a>
        ))}
      </div>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          priority={true}
          className={styles.image}
          src={rsSchool}
          alt="Rs School image"
        />
      </a>
    </footer>
  );
};

export default Footer;

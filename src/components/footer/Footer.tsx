import styles from './Footer.module.scss';
import rsSchool from '../../assets/img/rs_school_react.svg';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.copy}>© 2025 All rights reserved.</div>
      <a
        href="https://rollingscopes.com/courses/#main"
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

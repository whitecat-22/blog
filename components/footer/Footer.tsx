import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>© _whitecat_22. All rights reserved.</div>
      <div className={styles.social}>
        {/*<Image src="/1.png" width={15} height={15} className={styles.icon} alt="_whitecat_22 Facebook Account" />*/}
        <Image src="/2.png" width={15} height={15} className={styles.icon} alt="_whitecat_22 Instagram Account" />
        <Image src="/3.png" width={15} height={15} className={styles.icon} alt="_whitecat_22 X(Twitter) Account" />
        {/*<Image src="/4.png" width={15} height={15} className={styles.icon} alt="_whitecat_22 YouTube Account" />*/}
        <Image src="/github.png" width={15} height={15} className={styles.icon} alt="_whitecat_22 GitHub Account" />
      </div>
    </div>
  );
};

export default Footer;

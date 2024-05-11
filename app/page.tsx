import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

// Homeコンポーネントの型定義
const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products.
        </h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <Button url="/portfolio" text="See Our Works"/>
      </div>
      <div className={styles.item}>
        <Image
          src="/hero.png"
          alt="Hero image" // 画像の説明を明記
          className={styles.img}
          placeholder="blur" // Imageコンポーネントの性能を向上させるためのプロパティ
        />
      </div>
    </div>
  );
}

export default Home;

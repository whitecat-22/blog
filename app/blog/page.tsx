import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

// データ構造の定義
interface Post {
  _id: string;
  id: string;
  img: string;
  title: string;
  desc: string;
}

// APIからデータを取得する関数
async function getData(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Blogコンポーネント
const Blog: React.FC = async () => {
  const data = await getData();
  return (
    <div className={styles.mainContainer}>
      {data.map((item: Post) => (
        <Link href={`/blog/${item._id}`} className={styles.container} key={item.id}>
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt={item.title}
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;

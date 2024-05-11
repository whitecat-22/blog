import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// APIから取得されるデータの型定義
interface Post {
  id: string;
  title: string;
  desc: string;
  img: string;
  username: string;
  content: string;
}

// 特定のIDを持つ投稿を取得する関数
async function getData(id: string): Promise<Post | null> {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

// メタデータを生成する関数
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getData(params.id);
  if (!post) {
    return { title: 'Not Found', description: '' };
  }
  return {
    title: post.title,
    description: post.desc,
  };
}

// ブログ投稿コンポーネント
const BlogPost: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const data = await getData(params.id);
  if (!data) {
    return <div>Post not found.</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt={data.title}
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt={data.title}
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;

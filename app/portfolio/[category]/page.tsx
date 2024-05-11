import React from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { items } from "./data.ts";
import { notFound } from "next/navigation";

// アイテムの型定義
interface Item {
  id: string;
  title: string;
  desc: string;
  image: string;
}

// itemsデータの型定義（data.tsからインポートされる前提）
interface Items {
  [key: string]: Item[];
}

// パラメータの型定義
interface Params {
  params: {
    category: string;
  };
}

// カテゴリデータを取得する関数
const getData = (cat: string): Item[] | undefined => {
  const data = items[cat] as Item[];

  if (data) {
    return data;
  }

  return notFound();
};

// Categoryコンポーネントの定義
const Category: React.FC<Params> = ({ params }) => {
  const data = getData(params.category);
  if (!data) return <p>No data available.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>

      {data.map((item: Item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            <Button text="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              fill={true}
              src={item.image}
              alt={item.title} // alt属性にタイトルを設定
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;

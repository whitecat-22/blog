import React, { useEffect, useState, FormEvent } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import { useUser, useSession, useAuth } from '@clerk/clerk-react';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const { isSignedIn } = useSession();
  const router = useRouter();

  // データ取得用のフェッチャー関数
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    isSignedIn ? `/api/posts?username=${user?.username}` : null,
    fetcher
  );

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/dashboard/sign-in");
    }
  }, [isSignedIn, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const title = (target.elements[0] as HTMLFormElement).value;
    const desc = (target.elements[1] as HTMLFormElement).value;
    const img = (target.elements[2] as HTMLFormElement).value;
    const content = (target.elements[3] as HTMLFormElement).value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: user?.username,
        }),
      });
      mutate();
      target.reset();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isSignedIn) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {isLoading
          ? "Loading..."
          : data?.map((post) => {(
              <div className={styles.post} key={post._id}>
                <div className={styles.imgContainer}>
                  <Image src={post.img} alt={post.title} width={200} height={100} />
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span
                  className={styles.delete}
                  onClick={() => handleDelete(post._id)}
                >
                  X
                </span>
              </div>
            )})}
      </div>
      <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        <input type="text" placeholder="Title" className={styles.input} />
        <input type="text" placeholder="Desc" className={styles.input} />
        <input type="text" placeholder="Image" className={styles.input} />
        <textarea
          placeholder="Content"
          className={styles.textArea}
          cols={30}
          rows={10}
        ></textarea>
        <button className={styles.button}>Send</button>
      </form>
    </div>
  );
};

export default Dashboard;

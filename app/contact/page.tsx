"use client"

import React, { useState } from 'react';
import { z } from 'zod';
import styles from './page.module.css';
import Image from 'next/image';
import Button from '@/components/Button/Button';

// フォームデータのバリデーションスキーム
const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(1, "Message is required.")
});

// Contactコンポーネントの定義
const Contact: React.FC = () => {
  type ZodErrorMap = {
    [key: string]: string[];
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<z.ZodErrorMap | null>(null);

  // フォーム送信処理
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // バリデーションを試みる
    const result = formSchema.safeParse({ name, email, message });
    /*if (!result.success) {
      const transformedErrors = {};
      Object.entries(result.error.formErrors.fieldErrors).forEach(([key, value]) => {
        transformedErrors[key] = value.map(error => error.message);
      });
      setErrors(transformedErrors);
      return; // バリデーションエラーがある場合はここで処理を停止
    }*/

    setLoading(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let Us Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt="Contact Image"
            fill={true}
            className={styles.image}
          />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/*errors?.name && <p className={styles.error}>{errors.name[0]}</p>*/}
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/*errors?.email && <p className={styles.error}>{errors.email[0]}</p>*/}
          <textarea
            className={styles.textArea}
            placeholder="Message"
            cols={30}
            rows={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {/*errors?.message && <p className={styles.error}>{errors.message[0]}</p>*/}
          <Button url="#" text="Send" />
          <button onClick={handleSubmit}>Send</button>
          {loading && <div>Loading...</div>}
        </form>
      </div>
    </div>
  );
};

export default Contact;

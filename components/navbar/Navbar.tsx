"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import { useUser } from '@clerk/clerk-react';
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation';
import { ClerkProvider } from "@clerk/nextjs";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar: React.FC = () => {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <>
      <ClerkProvider>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            しろねこ lab
          </Link>
          <div className={styles.links}>
            <DarkModeToggle />
            {links.map((link) => (
              <Link key={link.id} href={link.url} className={styles.link}>
                {link.title}
              </Link>
            ))}
            {isSignedIn&& (
              <button className={styles.logout} onClick={() => signOut(() => router.push("/"))}>
                Logout
              </button>
            )}
          </div>
        </div>
      </ClerkProvider>
    </>
  );
};

export default Navbar;

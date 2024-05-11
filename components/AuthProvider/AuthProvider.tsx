"use client"

import React from "react";
import { ClerkProvider } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';

//const frontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const frontendApi = process.env.CLERK_SECRET_KEY

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => router.push(to)}>
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;

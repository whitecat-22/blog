import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <main className="auth">{children}</main>
    </ClerkProvider>
  );
}

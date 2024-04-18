// app/providers.js
"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React, { useEffect } from "react";

function posthogInit() {
  if (typeof window !== "undefined") {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    )
      return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
  }
}

posthogInit();

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

export function PostHogAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const userInfo = useUser();

  useEffect(() => {
    if (userInfo.user) {
      posthog.identify(userInfo.user.id, {
        name: userInfo.user?.fullName,
        email: userInfo.user?.primaryEmailAddress,
      });
    }

    if (!auth.isSignedIn) {
      posthog.reset();
    }
  });

  return <>{children}</>;
}

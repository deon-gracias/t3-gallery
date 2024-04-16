"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export function SiteHeader() {
  const router = useRouter();

  return (
    <nav className="px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link className="text-xl font-semibold" href="/">
          Gallery
        </Link>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(data) => {
                router.refresh();
              }}
            />
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

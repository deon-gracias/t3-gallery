import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function SiteHeader() {
  return (
    <nav className="px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link className="text-xl font-semibold" href="/">
          Gallery
        </Link>

        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

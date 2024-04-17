import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4">
      <SignedOut>
        <div className="h-full w-full text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.length < 1 && <div>No images yet.</div>}
      {images.map((image) => (
        <Link
          href={`/img/${image.id}`}
          key={image.id}
          className="flex h-48 w-48 flex-col"
        >
          <div className="relative h-full w-full">
            <Image
              src={image.url}
              alt={image.name}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <div>{image.name}</div>
        </Link>
      ))}
    </div>
  );
}

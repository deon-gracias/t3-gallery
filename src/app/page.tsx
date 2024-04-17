import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import { CardImage } from "./_components/CardImage";

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
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.length < 1 && <div>No images yet.</div>}
      {images.map((image) => (
        <CardImage key={image.id} {...image} />
      ))}
    </div>
  );
}

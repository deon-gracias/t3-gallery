import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const imagesData = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4">
      <SignedOut>
        <div className="h-full w-full text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap gap-4">
          {imagesData.map((image) => (
            <div key={image.id} className="flex w-48 flex-col">
              <Image
                src={image.url}
                alt={image.name}
                width={400}
                height={400}
              />
              <div>{image.name}</div>
            </div>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}

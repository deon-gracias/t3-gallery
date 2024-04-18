import { auth } from "@clerk/nextjs/server";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { getMyImages } from "~/server/queries";

export async function Images() {
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
          <AspectRatio ratio={1}>
            <Image
              src={image.url}
              alt={image.name}
              className="rounded object-cover"
            />
          </AspectRatio>
          <div>{image.name}</div>
        </Link>
      ))}
    </div>
  );
}

"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { ImageWithSkeleton } from "./ImageWithSkeleton";

export function CardImage(image: {
  id: number;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <Link href={`/img/${image.id}`} key={image.id}>
      <AspectRatio ratio={1}>
        <ImageWithSkeleton
          image={{
            url: image.url,
            alt: image.name,
            className: "h-full w-full rounded object-cover",
            fill: true,
          }}
        />
      </AspectRatio>
      <h6 className="mx-2 my-1 truncate font-semibold">{image.name}</h6>
    </Link>
  );
}

CardImage.loading = () => (
  <div>
    <AspectRatio ratio={1}>
      <Skeleton className="h-full w-full rounded" />
    </AspectRatio>
    <h6 className="my-1">
      <Skeleton className="h-5 w-full" />
    </h6>
  </div>
);

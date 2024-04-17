"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function CardImage(image: {
  id: number;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}) {
  return (
    <Link href={`/img/${image.id}`} key={image.id}>
      <AspectRatio ratio={1}>
        <Image
          src={image.url}
          alt={image.name}
          className="h-full w-full rounded object-cover"
          fill
        />
      </AspectRatio>
      <h6 className="truncate px-2 py-1 font-semibold">{image.name}</h6>
    </Link>
  );
}

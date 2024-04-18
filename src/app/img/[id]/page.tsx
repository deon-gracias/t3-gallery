import { clerkClient } from "@clerk/nextjs/server";
import { Trash } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";
import { ImageWithSkeleton } from "~/app/_components/ImageWithSkeleton";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "~/components/ui/table";
import { deleteImage, getImage } from "~/server/queries";

export default async function ImageModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const imageIdAsNumber = Number(photoId);
  if (Number.isNaN(imageIdAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(imageIdAsNumber);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2">
      <div>
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
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="mb-2 mt-4 text-xl font-bold">{image.name}</h1>
          <form
            action={async () => {
              "use server";
              posthog.capture("delete_image", {
                photo_id: image.id,
              });

              await deleteImage(imageIdAsNumber);
            }}
          >
            <Button size={"sm"} variant={"destructive"}>
              <Trash className="mr-2 size-4" />
              Delete
            </Button>
          </form>
        </div>

        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Created At</TableHead>
              <TableCell className="text-right">
                {image.createdAt.toLocaleString()}
              </TableCell>
            </TableRow>
            {image.updatedAt && (
              <TableRow>
                <TableHead>Updated At</TableHead>
                <TableCell className="text-right">
                  {image.updatedAt.toLocaleString()}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableHead>Uploader</TableHead>
              <TableCell className="text-right">
                {uploaderInfo.fullName}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getImage } from "~/server/queries";

export default async function ImageModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const photoIdAsNumber = Number(photoId);
  if (Number.isNaN(photoIdAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(photoIdAsNumber);

  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2">
      <div>
        <AspectRatio ratio={1}>
          <Image
            src={image.url}
            alt={image.name}
            className="h-full w-full rounded object-cover"
            fill
          />
        </AspectRatio>
      </div>

      <div>
        <h1 className="mb-2 mt-4 text-xl font-bold">{image.name}</h1>

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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

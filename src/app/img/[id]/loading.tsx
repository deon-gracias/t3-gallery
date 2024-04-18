import { auth, clerkClient } from "@clerk/nextjs/server";
import { Trash } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { deleteImage, getImage } from "~/server/queries";

export default async function ImageModal() {
  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2">
      <div>
        <AspectRatio ratio={1}>
          <Skeleton className="h-full w-full rounded" />
        </AspectRatio>
      </div>

      <div>
        <Skeleton className="mb-2 mt-4 h-10 w-full" />

        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Created At</TableHead>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Updated At</TableHead>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Uploader</TableHead>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-full" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

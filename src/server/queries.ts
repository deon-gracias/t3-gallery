import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { images } from "./db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import { utapi } from "./uploadhting";
import { url } from "inspector";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const imagesData = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return imagesData;
}

export async function getImage(id: number) {
  const user = auth();

  // Not a valid user
  if (!user.userId) throw new Error("Unauthorized");

  const imageData = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!imageData) throw new Error("Image not found");

  if (imageData.userId !== user.userId) throw new Error("Unauthorized");

  return imageData;
}

export async function deleteImage(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const image = await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)))
    .returning({ url: images.url });

  console.log(image.map((image) => image.url));
  await utapi.deleteFiles(image.map((image) => image.url));

  revalidatePath("/");
  redirect("/");
}

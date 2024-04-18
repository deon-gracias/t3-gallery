"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadCloudIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { UploadDropzone } from "~/utils/uploadthing";

export function SiteHeader() {
  const router = useRouter();

  const posthog = usePostHog();

  return (
    <nav className="px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link className="text-xl font-semibold" href="/">
          Gallery
        </Link>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UploadCloudIcon className="mr-2 size-4" />
                  <span>Upload</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload</DialogTitle>
                </DialogHeader>
                <UploadDropzone
                  appearance={{
                    label: "text-foreground",
                    button: cn(
                      "after:bg-primary ut-uploading:opacity-100 ut-uploading:bg-primary/80",
                      buttonVariants(),
                    ),
                  }}
                  endpoint="imageUploader"
                  onUploadBegin={(data) => {
                    posthog.capture("upload_begin", {
                      data,
                    });
                  }}
                  onClientUploadComplete={(res) => {
                    posthog.capture("upload_success", {
                      ...res,
                    });
                    router.refresh();
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(error.message);
                    console.error(error);
                  }}
                />
              </DialogContent>
            </Dialog>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

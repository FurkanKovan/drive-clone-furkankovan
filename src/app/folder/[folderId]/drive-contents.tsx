"use client";

import { ChevronRight } from "lucide-react";
import { FileRow, FolderRow } from "./file-row";
import type {
  files_table as files,
  folders_table as folders,
} from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";

export default function DriveContents(props: {
  files: (typeof files.$inferSelect)[];
  folders: (typeof folders.$inferSelect)[];
  parents: (typeof folders.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={`/folder/${props.parents[0]?.id ?? props.currentFolderId}`}
              className="mr-2 text-gray-300 hover:text-white"
            >
              My Drive
            </Link>
            {props.parents.slice(1).map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/folder/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <div className="inline-flex w-full justify-center">
          <UploadButton
            className="mt-4 ut-button:hover:brightness-150"
            endpoint="driveUploader"
            onClientUploadComplete={() => {
              navigate.refresh(); // To get updated data for this route, revalidate page contents and get correct state
            }}
            input={{ folderId: props.currentFolderId }}
          />
        </div>
      </div>
      <p className="mx-auto mt-auto px-4 max-w-screen-md text-xs text-red-200 text-center">
        Disclaimer! This website is only a demo and not intended for any
        personal usage. Please only upload files for testing purposes and make
        sure to delete them afterwards. Do not upload any sensitive files. All
        uploaded files are publicly accessible via{" "}
        <a
          href="https://uploadthing.com/"
          className="font-bold text-red-500 hover:text-red-100"
        >
          UploadThing
        </a>{" "}
        file url. Note that if server storage limit is reached from our side, no
        upload will be made.
      </p>
      <footer className="items-center text-center mt-2 text-sm text-neutral-500">
        © {new Date().getFullYear()} FurkanKovan Drive. All rights reserved.
      </footer>
    </div>
  );
}

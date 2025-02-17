import { Folder as FolderIcon, FileIcon, Trash2Icon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";
import type {
  folders_table as folders,
  files_table as files,
} from "~/server/db/schema";

export function FileRow(props: { file: typeof files.$inferSelect }) {
  const { file } = props;
  const [showDeletePopup, setDeletePopup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async (fileId: number) => {
    setIsLoading(true);
    try {
      await deleteFile(fileId); // Wait for the delete function
      setDeletePopup(false); // Close the modal
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400">{"file"}</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
        <div className="col-span-1 text-gray-400">
          <Button
            variant="ghost"
            aria-label="Delete File"
            onClick={() => setDeletePopup(true)}
          >
            <Trash2Icon size={20} />
          </Button>

          {showDeletePopup && (
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="pointer-events-auto -translate-y-3/4 transform rounded-lg bg-white p-6 text-black shadow-lg">
                <h2 className="text-lg font-bold">Confirm Delete</h2>
                <p className="mt-2">
                  Are you sure you want to delete this file?
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => setDeletePopup(false)}
                    disabled={isLoading}
                    className={
                      isLoading
                        ? "cursor-not-allowed border opacity-50"
                        : "border"
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(file.id)}
                    disabled={isLoading}
                    className={isLoading ? "cursor-not-allowed opacity-50" : ""}
                  >
                    {isLoading ? (
                      <Loader2Icon className="animate-spin" size={16} />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
export function FolderRow(props: { folder: typeof folders.$inferSelect }) {
  const { folder } = props;
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/folder/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  );
}

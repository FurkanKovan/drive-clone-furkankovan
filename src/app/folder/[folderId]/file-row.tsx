import {
  Folder as FolderIcon,
  FileIcon,
  Trash2Icon,
  Loader2Icon,
  EllipsisVerticalIcon,
  FolderPenIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { deleteFile, deleteFolder, renameFolder } from "~/server/actions";
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
            className="hover:bg-transparent"
          >
            <Trash2Icon size={20} />
          </Button>

          {showDeletePopup && (
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
  const [showFolderOptions, setFolderOptions] = useState<boolean>(false);
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const folderOptionsRef = useRef<HTMLDivElement | null>(null);

  // Handle Folder Delete
  const handleDelete = async (folderId: number) => {
    setIsDeleting(true);
    try {
      await deleteFolder(folderId); // Wait for the delete function
      setShowDeletePopup(false); // Close the modal
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Folder Rename
  const handleRename = async () => {
    if (!newFolderName.trim()) return;

    setIsRenaming(true);
    try {
      await renameFolder(newFolderName.trim(), folder.id);
      setShowRenamePopup(false); // Close popup after renaming
    } catch (error) {
      console.error("Error renaming folder:", error);
    } finally {
      setNewFolderName("");
      setIsRenaming(false);
    }
  };

  // Open-close options container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        folderOptionsRef.current &&
        !folderOptionsRef.current.contains(event.target as Node)
      ) {
        setFolderOptions(false); // Close menu if click is outside
      }
    };

    if (showFolderOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFolderOptions]);

  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        {/* Name Field */}
        <div className="col-span-6 flex items-center">
          <Link
            href={`/folder/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        {/* Type Field */}
        <div className="col-span-2 text-gray-400"></div>
        {/* Size Field */}
        <div className="col-span-3 text-gray-400"></div>
        {/* Options Button */}
        <div className="col-span-1 text-gray-400" ref={folderOptionsRef}>
          <Button
            variant="ghost"
            aria-label="Folder Options"
            onClick={() => setFolderOptions((prev) => !prev)}
            className="hover:bg-transparent"
          >
            <EllipsisVerticalIcon size={20} />
          </Button>
          {/* Dropdown Options */}
          {showFolderOptions && (
            <div className="absolute right-20 w-fit rounded-sm bg-slate-50 text-black shadow-lg">
              {/* Rename Folder */}
              <Button
                onClick={() => {
                  setFolderOptions(false);
                  setShowRenamePopup(true);
                }}
                className="flex w-full items-center rounded-sm py-2 text-sm hover:bg-slate-200"
              >
                <FolderPenIcon size={16} className="mr-2" />
                Rename Folder
              </Button>
              {/* Delete Folder */}
              <Button
                onClick={() => {
                  setFolderOptions(false);
                  setShowDeletePopup(true);
                }}
                className="flex w-full items-center rounded-sm py-2 text-sm hover:bg-slate-200"
              >
                <Trash2Icon size={16} className="mr-2" />
                Delete Folder
              </Button>
            </div>
          )}
          {/* Rename Popup */}
          {showRenamePopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-80 -translate-y-3/4 transform rounded-lg bg-slate-50 p-6 text-black shadow-lg">
                <h2 className="text-lg font-bold">Rename Folder</h2>
                <input
                  type="text"
                  placeholder="Enter new folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                />
                <div className="mt-4 flex justify-end space-x-2">
                  {/* Cancel Button */}
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setShowRenamePopup(false);
                      setNewFolderName("");
                    }}
                    className="border"
                  >
                    Cancel
                  </Button>
                  {/* Rename Button */}
                  <Button
                    onClick={handleRename}
                    disabled={isRenaming}
                    variant="default"
                    className="bg-green-600 text-white hover:bg-opacity-80"
                  >
                    {isRenaming ? "Renaming..." : "Rename"}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* Delete Confirmation Popup */}
          {showDeletePopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-96 -translate-y-3/4 transform rounded-lg bg-slate-50 p-6 text-black shadow-lg">
                <h2 className="text-lg font-bold text-black">
                  Confirm Delete
                </h2>
                <p className="mt-2 text-gray-600">
                  Are you sure you want to delete this folder?
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  {/* Cancel Button */}
                  <Button
                    variant="ghost"
                    onClick={() => setShowDeletePopup(false)}
                    className="border"
                  >
                    Cancel
                  </Button>

                  {/* Confirm Delete Button */}
                  <Button
                    onClick={() => handleDelete(folder.id)}
                    disabled={isDeleting}
                    variant="destructive"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
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

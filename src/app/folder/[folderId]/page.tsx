import { auth } from "@clerk/nextjs/server";
import DriveContents from "./drive-contents";
import { DB_QUERIES } from "~/server/db/queries";
import { redirect } from "next/navigation";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID!</div>;
  }

  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }
  
  const currentFolderOwner = await DB_QUERIES.getOwnerIdForFolder(parsedFolderId);
  
  if (!currentFolderOwner) {
    return <div>Folder owner not found!</div>;
  }

  if (currentFolderOwner !== session.userId) {
    const rootFolder = await DB_QUERIES.getRootFolderForUser(session.userId);
    return redirect(`/folder/${rootFolder?.id}`);
  }

  const [folders, files, parents] = await Promise.all([
    DB_QUERIES.getFolders(parsedFolderId),
    DB_QUERIES.getFiles(parsedFolderId),
    DB_QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
    />
  );
}

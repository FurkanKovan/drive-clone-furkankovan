import DriveContents from "../../drive-contents";
import { DB_QUERIES } from "~/server/db/queries";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID!</div>;
  }

  const [folders, files, parents] = await Promise.all([
    DB_QUERIES.getFolders(parsedFolderId),
    DB_QUERIES.getFiles(parsedFolderId),
    DB_QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}

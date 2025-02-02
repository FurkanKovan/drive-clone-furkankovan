"use client"

import { useState } from "react"
import { type FileItem, mockFiles } from "../lib/mock-data"
import { Button } from "~/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Folder, File, Image, Video, Music, Upload } from "lucide-react"

export default function Home() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string | null; name: string }[]>([
    { id: null, name: "My Drive" },
  ])

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder)
  }

  const handleFolderClick = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId)
    setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }])
  }

  const handleBreadcrumbClick = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    setBreadcrumbs(newBreadcrumbs)
    setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1]?.id ?? "")
  }

  const getFileIcon = (type: FileItem["type"]) => {
    switch (type) {
      case "folder":
        return <Folder className="mr-2" />
      case "document":
        return <File className="mr-2" />
      case "image":
        return <Image className="mr-2" />
      case "video":
        return <Video className="mr-2" />
      case "audio":
        return <Music className="mr-2" />
      default:
        return <File className="mr-2" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Google Drive Clone</h1>

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem key={crumb.id}>
              {index < breadcrumbs.length - 1 ? (
                <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>{crumb.name}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              )}
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <Button className="mb-6">
        <Upload className="mr-2 h-4 w-4" /> Upload
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentFiles().map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                {file.type === "folder" ? (
                  <button className="flex items-center" onClick={() => handleFolderClick(file.id, file.name)}>
                    {getFileIcon(file.type)}
                    {file.name}
                  </button>
                ) : (
                  <a href="#" className="flex items-center">
                    {getFileIcon(file.type)}
                    {file.name}
                  </a>
                )}
              </TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell>{file.size || "-"}</TableCell>
              <TableCell className="text-right">{file.modified}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


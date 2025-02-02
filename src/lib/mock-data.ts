export type FileType = "folder" | "document" | "image" | "video" | "audio"

export interface FileItem {
  id: string
  name: string
  type: FileType
  size?: string
  modified: string
  parent: string | null
}

export const mockFiles: FileItem[] = [
  { id: "1", name: "Documents", type: "folder", modified: "2023-05-15", parent: null },
  { id: "2", name: "Images", type: "folder", modified: "2023-05-14", parent: null },
  { id: "3", name: "Videos", type: "folder", modified: "2023-05-13", parent: null },
  { id: "4", name: "Report.docx", type: "document", size: "2.3 MB", modified: "2023-05-12", parent: "1" },
  { id: "5", name: "Budget.xlsx", type: "document", size: "1.5 MB", modified: "2023-05-11", parent: "1" },
  { id: "6", name: "Vacation.jpg", type: "image", size: "3.2 MB", modified: "2023-05-10", parent: "2" },
  { id: "7", name: "Project_presentation.pptx", type: "document", size: "5.1 MB", modified: "2023-05-09", parent: "1" },
  { id: "8", name: "Family_video.mp4", type: "video", size: "250 MB", modified: "2023-05-08", parent: "3" },
]


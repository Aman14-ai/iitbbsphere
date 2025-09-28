import z from "zod";

export const addContentSchemaForAdmin = z.object({
  subjectName: z.string().min(1, { message: "Subject name is required" }),
  subjectCode: z.string().min(1, { message: "Subject code is required" }),
  proffesorName: z.string().min(1, { message: "Proffesor name is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  folderId: z.string().min(1, { message: "Folder Id  is required" }),
  uploadedBy: z.string().min(1, { message: "Uploaded by is required" }),
  branch: z.string().min(1, { message: "Branch is required" }),
});

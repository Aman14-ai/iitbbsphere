import z from "zod";

export const addContentSchemaForAdmin = z.object({
  subjectName: z.string().min(1, { message: "Subject name is required" }),
  subjectCode: z.string().min(1, { message: "Subject code is required" }),
  proffesorName: z.string().min(1, { message: "Proffesor name is required" }),
  topicName: z.string().min(1, { message: "Topic name is required" }),
  type: z.enum(["content", "assignment", "tutorial", "pyq"], {
    message: "Type is required",
  }),
  semester: z.string().min(1, { message: "Semester is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  url: z.string().min(1, { message: "Url is required" }),
});

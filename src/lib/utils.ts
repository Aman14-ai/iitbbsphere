import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FileGroup } from "../../constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateForDB(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // "YYYY-MM-DD"
}

export const categorizeFile = (fileName: string): keyof FileGroup => {
  const lowerName = fileName.toLowerCase();

  if (
    /(class|lecture|notes|unit|chapter|slide)\s*\d*/i.test(fileName) ||
    lowerName.includes("note") ||
    lowerName.includes("lecture")
  ) {
    return "notes";
  }
  if (
    lowerName.includes("tutorial") ||
    lowerName.includes("practical") ||
    lowerName.includes("exercise")
  ) {
    return "tutorials";
  }
  if (
    lowerName.includes("assignment") ||
    lowerName.includes("homework") ||
    lowerName.includes("problem set")
  ) {
    return "assignments";
  }
  if (
    lowerName.includes("pyq") ||
    lowerName.includes("previous year") ||
    lowerName.includes("question paper") ||
    lowerName.includes("exam") ||
    lowerName.includes("midterm") ||
    lowerName.includes("midsem") ||
    lowerName.includes("mid sem") ||
    lowerName.includes("endterm") ||
    lowerName.includes("end sem") ||
    lowerName.includes("endsem") ||
    lowerName.includes("test") ||
    lowerName.includes("quiz") 
  ) {
    return "pyqs";
  }
  return "other";
};

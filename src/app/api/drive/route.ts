import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { folderId } = await req.json();

    if (!folderId) {
      return NextResponse.json({ error: "Missing folderId" }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: "service-account.json.json", // make sure this exists in server only
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink)",
    });

    return NextResponse.json(response.data.files || []);
  } catch (err) {
    console.error("Google Drive error:", err);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}

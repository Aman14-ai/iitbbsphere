import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { folderId } = await req.json();

    if (!folderId) {
      return NextResponse.json({ error: "Missing folderId" }, { status: 400 });
    }
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!raw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON");

    const credentials = JSON.parse(raw);

    const auth = new google.auth.GoogleAuth({
      credentials, // ✅ use credentials instead of keyFile
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
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

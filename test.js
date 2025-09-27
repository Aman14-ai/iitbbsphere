import { google } from "googleapis";


    const auth = new google.auth.GoogleAuth({
      keyFile: "service-account.json", 
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    const folderId = "1pD7uWxxLWTxbH-jGQc__jKeqf4rshvCw";

    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink)",
    });

    const files = response.data.files;
    console.log(files);

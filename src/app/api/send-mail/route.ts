import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  // ⚠️ Security: don't hardcode sensitive credentials in source.
  // Use environment variables: process.env.EMAIL_USER, process.env.EMAIL_PASS
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amancode2005@gmail.com",
      pass: "jwtu vpod kome uabl",
    },
  });

  // HTML email template (table based + inline styles for best client compatibility)
  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>New message from ${name}</title>
  </head>
  <body style="margin:0; padding:0; background:#f3f4f6; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table width="680" cellpadding="0" cellspacing="0" role="presentation" style="max-width:680px; width:100%; background:#ffffff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.06); overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="padding:28px 32px; background: linear-gradient(90deg,#0f172a,#0b1220); color:#ffffff;">
                <h1 style="margin:0; font-size:20px; letter-spacing:0.2px;">New Contact Message</h1>
                <p style="margin:6px 0 0; opacity:0.85;">You have received a new enquiry via the website contact form.</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 32px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="padding-bottom:18px;">
                      <strong style="display:block; font-size:14px; color:#111827;">Sender</strong>
                      <span style="font-size:15px; color:#374151;">${name} &lt;${email}&gt;</span>
                    </td>
                    <td style="padding-bottom:18px;">
                      <strong style="display:block; font-size:14px; color:#111827;">Subject</strong>
                      <span style="font-size:15px; color:#374151;">${subject}</span>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2" style="padding-top:8px;">
                      <strong style="display:block; font-size:14px; color:#111827; margin-bottom:8px;">Message</strong>
                      <div style="background:#f8fafc; border:1px solid #e6eef6; padding:18px; border-radius:8px; font-size:15px; color:#111827; line-height:1.5;">
                        ${message.replace(/\n/g, "<br>")}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2" style="padding-top:18px;">
                      <p style="margin:0; font-size:14px; color:#6b7280;">
                        Reply directly to the sender: <a href="mailto:${email}" style="color:#0b69ff; text-decoration:none;">${email}</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 32px; background:#f8fafc; border-top:1px solid #eef2f7;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="font-size:13px; color:#6b7280;">
                      <strong>Received:</strong> ${new Date().toLocaleString()}<br>
                      <span>Powered by iitbbsphere • <a href="mailto:${
                        process.env.EMAIL_USER || "amancode2005@gmail.com"
                      }" style="color:#0b69ff; text-decoration:none;">Contact</a></span>
                    </td>
                    <td align="right" style="font-size:13px; color:#9ca3af;">
                      <span>© ${new Date().getFullYear()}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  const textFallback = `
  New message from ${name}
  Subject: ${subject}
  Email: ${email}

  Message:
  ${message}
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || "amancode2005@gmail.com", // must match authenticated user
    to: "amancode2005@gmail.com",
    subject: `New message from ${name} — ${subject}`,
    text: textFallback,
    html, // HTML version for clients that support it
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    // For debugging: consider logging error.message (but don't leak creds)
    return NextResponse.json({ success: false, error: String(error) });
  }
}

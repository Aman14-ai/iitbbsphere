import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure:false,
    auth: {
      user: "amancode2005@gmail.com",
      pass: "jwtu vpod kome uabl",
    },
  });
  console.log(name, email, subject, message);
  if (!name || !email || !subject || !message) {
    return NextResponse.json({
      success: false,
      error: "Please fill all the fields",
    });
  }

  const mailOptions = {
    from: `"${name}" <amancode2005@gmail.com>`,
    to: "amancode2005@gmail.com",
    subject: `New message from ${name} - ${subject}`,
    text: message,
    replyTo: email, // 👈 This is key
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}

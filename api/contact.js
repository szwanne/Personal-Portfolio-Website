import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // Change later after verification
      to: "szwane.career@gmail.com",
      reply_to: email,
      subject: "New Portfolio Contact Message",
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("EMAIL SENT SUCCESSFULLY:", response);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("FULL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error sending email",
      error: error.message,
    });
  }
}

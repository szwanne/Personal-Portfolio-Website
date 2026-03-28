import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "szwane.career@gmail.com",
        subject: "New Portfolio Contact Message",
        html: `
          <h3>New Message from Portfolio</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      return res.status(200).json({ message: "Email sent" });
    } catch (error) {
      return res.status(500).json({ message: "Error sending email" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

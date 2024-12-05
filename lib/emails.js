"server-only";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return null;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data.to && data.subject && data.details) {
        const { to, subject, details } = data;

        const sentInfo = await resend.emails.send({
          from: "no-reply@resend.dev",
          to: to,
          subject,
          react: EmailTemplate({ details }),
        });
        return sentInfo;
      } else {
        const rejectedPromise = new Promise((reject) => {
          return reject(
            new Error(
              `Couldn't send email, please check the  ${JSON.stringify(data)}.`
            )
          );
        });
        return rejectedPromise;
      }
    })
  );

  return response;
};

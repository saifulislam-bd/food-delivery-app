import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlContent";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipient = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed in sending email verification");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Taste Station",
      html: htmlContent,
      template_variables: {
        company_info_name: "Taste Station",
        name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed in sending welcome email");
  }
};
export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetUrl);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: htmlContent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed in sending reset password email");
  }
};
export const sendResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Password reset successfully",
      html: htmlContent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed in sending password reset success email");
  }
};

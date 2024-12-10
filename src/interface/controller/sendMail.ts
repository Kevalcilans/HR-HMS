import { Request, Response, NextFunction } from "express";
import createTransporter from "../../config/mail.config";  
import { successResponse } from "../../helpers/responces";
import { CustomError } from "../../helpers/customeerror";
import { ErrorCodes } from "../../constent/code";

class MailController {
  async sendEmail(req: Request, resp: Response, next?: NextFunction) {
    // Destructuring the email payload
    const { to, subject, text, html } = req.body;

    // Validate required fields in the payload
    if (!to || !subject || (!text && !html)) {
      const validationError = new CustomError(
        "Invalid email parameters. Ensure 'to', 'subject', and 'text' or 'html' are provided.",
        400,
        ErrorCodes.BAD_REQUEST
      );
      if (next) {
        return next(validationError);
      } else {
        return resp.status(validationError.statusCode).json(validationError.getDetails());
      }
    }

    // Email options
    const mailOptions: any = {
      from: "rnkkhara@gmail.com", // Replace with a verified sender email
      to, // Recipient email
      subject, // Email subject
      text, // Plain text content
      html, // HTML content
    };

    try {
      // Create transporter and send email
      const transporter = await createTransporter();
      const info = await transporter.sendMail(mailOptions);

      // Send success response
      successResponse(resp, " email successfully sent!", { response: info.response });
    } catch (error) {
      console.error("Error while sending email:", error);

      // Handle email sending errors
      const customError = new CustomError(
        "Failed to send welcome email. Please try again later.",
        500,
        ErrorCodes.INTERNAL_SERVER_ERROR
      );
      if (next) {
        next(customError);
      } else {
        resp.status(customError.statusCode).json(customError.getDetails());
      }
    }
  }
}

export default MailController;

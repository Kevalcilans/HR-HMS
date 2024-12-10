import nodemailer from 'nodemailer';
import { degrees } from 'pdf-lib';

// Define the transporter configuration interface (optional but recommended for better typing)
// interface TransporterConfig {
//   service: string;
//   auth: {
//     user: string;
//     pass: string;
//   };
// }

// Create a transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail', 
//   secure:true,
//   port:465,
//   auth: {
//     user: 'rnkkhara@gmail.com',
//     pass: 'hlphvujkjljeqtpr', 
//   },
// } );

// export default transporter

console.log(process.env.SMTP_MAIL)
const createTransporter = async () => {
    return nodemailer.createTransport({
      service: 'gmail', 
      secure:true,
      port:465,
      auth: {
             user: process.env.SMTP_MAIL,
             pass: process.env.SMTP_PASSWORD, 
        },
    });
  };

export default createTransporter

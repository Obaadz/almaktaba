import nodemailer, { Transporter } from "nodemailer";

import { FindOneOptions } from 'typeorm';

export class MailService {
  private static readonly TRANSPORTER: Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  public static sendOTP(to: string, OTP: string) {
    const mailOptions = {
      from: "OTP <" + process.env.GMAIL_USER + ">",
      to,
      message: `Your OTP code is: ${OTP}. Please do not share it with anyone.`,
    };

    MailService.TRANSPORTER.sendMail(mailOptions, (err, info) => {
      if (err) console.error(err);
      else console.debug(info);
    });
  }
}
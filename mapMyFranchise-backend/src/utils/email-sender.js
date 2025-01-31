const ejs = require('ejs');
const path = require('path');
// const nodemailerSendgrid = require('nodemailer-sendgrid');
const nodeMailer = require('nodemailer');
const config = require('../config');
const emailConfig = config.SMTP;
const fs = require('fs');

async function sendEmail({
  from = emailConfig.from,
  to,
  notificationBody,
  subject,
  attachments = false,
  isHtml = false,
  cc = emailConfig['cc'],
  bcc = emailConfig['bcc'],
  templateVariables = {},
  templateName = '',
}) {
  try {
    console.log('In send email function----------------------------------');
    let body = notificationBody;
    if (templateName && isHtml) {
      const templateDir = path.join(__dirname, 'emailtemplates', templateName);
      const templateFilePath = `${templateDir}/html.ejs`;
      console.log({templateFilePath});
      if (!fs.existsSync(templateFilePath)) {
        throw new Error(`Template file ${templateFilePath} not found`);
      }

      body = await ejs.renderFile(templateFilePath, templateVariables);
    }
    const emailObj = {
      to,
      subject,
      from,
      cc: [...new Set([...cc, ...emailConfig['cc']])],
      bcc: [...new Set([...bcc, ...emailConfig['bcc']])],
    };
    if (isHtml) {
      emailObj.html = body;
    } else {
      emailObj.text = body;
    }
    if (attachments) {
      emailObj.attachments = attachments;
    }

    console.log('Email obj-------------------------------');
    console.log({emailObj});

    // const emailTransporter = nodeMailer.createTransport(nodemailerSendgrid({
    //   apiKey: emailConfig.apiKey,
    // }));
    // return await emailTransporter.sendMail(emailObj);

    const smtpConfig = {
      host: emailConfig['host'],
      port: emailConfig['port'],
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    };
    const transporter = nodeMailer.createTransport(smtpConfig);
    transporter.verify(function(error) {
      if (error) {
        console.info(error);
      } else {
        console.info('SMTP Server is ready to take our messages');
      }
    });
    console.log({emailObj});
    const resp = await transporter.sendMail(emailObj);

    transporter.close();
    // eslint-disable-next-line no-prototype-builtins
    return resp.hasOwnProperty('accepted');
  } catch (e) {
    console.error(e);
    return e;
  }
}

module.exports = {
  sendEmail,
};

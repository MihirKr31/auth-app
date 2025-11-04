import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({

    host:'smtp-relay.brevo.com',
    port: 587,
    auth:{
        user : process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
     
})

transporter.verify(function(error, success) {
    if (error) {
        console.log('❌ SMTP Error:', error.message);
    } else {
        console.log('✅ SMTP is ready - Brevo connected successfully!');
    }
});

export default transporter;
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port:587,
    secure: false, // true for 465, false for other ports
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    }
});


export const sendWellcomeEmail = async (email) => {

    try{
        const mailOptions = {
        from : process.env.MAIL_USER,
        to: email,
        subject:'Wellcome to our platform',
        html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">
          
          <h2 style="color: #333; text-align: center;">
            Welcome aboard! 🎉
          </h2>

          <p style="font-size: 16px; color: #555;">
            Hi there 👋,
          </p>

          <p style="font-size: 16px; color: #555;">
            Thank you for registering with <b>Your App</b>. We're excited to have you with us!
          </p>

          <p style="font-size: 16px; color: #555;">
            You can now explore features, build amazing things, and enjoy the experience.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000"
               style="background-color: #4CAF50; color: white; padding: 12px 20px; 
                      text-decoration: none; border-radius: 5px; font-size: 16px;">
              Get Started 🚀
            </a>
          </div>

          <p style="font-size: 14px; color: #888;">
            If you have any questions, feel free to reply to this email.
          </p>

          <hr style="margin: 20px 0;" />

          <p style="font-size: 12px; color: #aaa; text-align: center;">
            © ${new Date().getFullYear()} Your App. All rights reserved.
          </p>

        </div>
      </div>
    `
    };

        await transporter.sendMail(mailOptions);
        console.log('Wellcome email sent successfully.');

    }catch(error){
        console.log('Error sending wellcome email:', error);
    }
}

export const sendLoginNotificationEmail = async (email) => {
    try{
        const mailOptions = {
            from : process.env.MAIL_USER,
            to:email,
            subject:'New Login Alert',
            html:`<h2>New Login Detected</h2>
            <p>A new login was detected for your account.</p>
            <p>If this was you, you can safely ignore this email. If you did not log in, please secure your account immediately.</p>
            <p>Best regards,<br>Your App Team</p>`
        }

        await transporter.sendMail(mailOptions);
        console.log('Login notification email sent successfully.');

    }catch(error){
        console.log('Error sending login notification email:', error);
    }
};


import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message, number } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !message || !number) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log(name, email, number, message); // Logs the incoming request body to the console

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email provider
      auth: {
        user: process.env.EMAIL_USER, // Ensure this is properly set
        pass: process.env.EMAIL_PASS, // Ensure this is properly set
      },
    });

    const mailOptions = {
      from: email, // The email of the sender
      to: process.env.EMAIL_USER, // Correct usage of environment variable
      subject: `Enquiry from ${name} - Mobile No: ${number}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

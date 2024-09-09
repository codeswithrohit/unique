import nodemailer from 'nodemailer';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, mobileNo, email, address, product } = req.body;

    // Ensure that 'product' is an array
    console.log("products", product);

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generate HTML for all products
    let productDetailsHtml = '';
    if (Array.isArray(product)) {
      product.forEach((p) => {
        productDetailsHtml += `
          <h3>Product Details</h3>
          <p><strong>Title:</strong> ${p.title}</p>
          <p><strong>Category:</strong> ${p.category}</p>
          <p><strong>ID:</strong> ${p.id}</p>
        `;
      });
    } else {
      res.status(400).json({ message: 'Product data is not an array' });
      return;
    }

    // Mail options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Replace with your email
      subject: 'Product Enquiry',
      html: `
        <h2>Enquiry Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile No:</strong> ${mobileNo}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
        ${productDetailsHtml} <!-- Insert all product details here -->
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Enquiry sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending enquiry' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

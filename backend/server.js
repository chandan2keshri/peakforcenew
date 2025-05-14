const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const { connect, Schema, model } = require('mongoose');
const { createTransport } = require('nodemailer');
const { Workbook } = require('exceljs');
const { join } = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration for production frontend
const corsOptions = {
  origin: 'https://peakforce.co.in',  // Make sure there is no trailing slash
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(json());

// MongoDB connection
connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
  });

// Enquiry Schema
const enquirySchema = new Schema({
  name: String,
  mobile: String,
  email: String,
  message: String,
  date: String,
  time: String,
});

const Enquiry = model('Enquiry', enquirySchema);

// Email Sending Function
const sendEmail = (filePath) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'peakforcerealty@gmail.com', // Change to recipient's email if needed
    subject: 'New Enquiry Submitted',
    text: 'A new enquiry has been submitted. Please check the attached Excel file for details.',
    attachments: [
      {
        path: filePath
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('❌ Error sending email:', error);
    } else {
      console.log('✅ Email sent:', info.response);
    }
  });
};

// Enquiry Submission Route
app.post('/submit-enquiry', async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;

    if (!name || !mobile || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    // Save to MongoDB
    const newEnquiry = new Enquiry({ name, mobile, email, message, date, time });
    await newEnquiry.save();

    // Create a new Excel file for this enquiry
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Enquiry');
    worksheet.columns = [
      { header: 'Sr. No.', key: 'sr', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Mobile', key: 'mobile', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Message', key: 'message', width: 40 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Time', key: 'time', width: 15 }
    ];

    worksheet.addRow({
      sr: 1,
      name,
      mobile,
      email,
      message,
      date,
      time
    });

    // Create the file path
    const filePath = join(__dirname, `enquiry_${Date.now()}.xlsx`);
    await workbook.xlsx.writeFile(filePath);

    // Send email with this file
    sendEmail(filePath);

    res.status(200).json({ message: 'Enquiry submitted and Excel sent!' });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Failed to submit enquiry', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log('🚀 Server running on http://localhost:' + port);
});

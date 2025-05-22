import React, { useState } from 'react';
import axios from 'axios';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Add CORS headers and proper content-type
    const response = await axios.post('http://localhost:5000/submit-enquiry', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.message) {
      alert(response.data.message);
      setFormData({ name: '', mobile: '', email: '', message: '' });
    } else {
      throw new Error('No response message');
    }
  } catch (error) {
    alert(error.response?.data?.error || 'Failed to submit enquiry');
    console.error('Submission error:', error);
  }
};

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>Enquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Your Mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        ></textarea>
        <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
      </form>
    </div>
  );
};

export default EnquiryForm;
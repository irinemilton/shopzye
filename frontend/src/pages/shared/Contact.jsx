import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
    // You can later send this to a backend endpoint
  };

  return (
    <div className="container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required /><br />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required /><br />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required /><br />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;

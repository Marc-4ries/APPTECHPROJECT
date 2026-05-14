import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

type FormData = { name: string; email: string; message: string; };

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // Watch for the Easter Egg to trigger immediately
  useEffect(() => {
    if (formData.name === "admin123" && formData.email === "admin123" && formData.message === "admin123") {
      console.log("Secret access granted.");
      navigate("/hidden");
    }
  }, [formData, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("Please complete all inputs before submitting."); 
      return;
    }
    
    setLoading(true);
    setStatus("Sending...");

    try {
      // 1. Send Email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      // 2. Save to MongoDB (with graceful fallback)
      let dbSuccess = false;
      try {
        const dbResponse = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (dbResponse.ok) dbSuccess = true;
      } catch (dbErr) {
        console.log("Database connection failed, but email was sent.");
      }

      // 3. Save to LocalStorage Backup
      const newMessage = { 
        _id: Date.now().toString(), 
        name: formData.name,
        email: formData.email,
        message: formData.message,
        isArchived: false 
      };
      
      const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      localStorage.setItem('portfolio_messages', JSON.stringify([...existingMessages, newMessage]));

      // 4. Update UI Status
      if (dbSuccess) {
        setStatus("Message sent and saved successfully!");
      } else {
        setStatus("Email sent! (Database backup offline)");
      }
      
      // Reset Form
      setFormData({ name: "", email: "", message: "" });

    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("Error: Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <h2>Contact Admin</h2>
      <form className="sdg-form" onSubmit={handleSubmit}>
        
        <div className="input-group">
          <label>Name</label>
          <input 
            required
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="input-group">
          <label>Email</label>
          <input 
            required
            type="email"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="input-group">
          <label>Message</label>
          <textarea 
            required
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
          />
        </div>

        {status && (
          <p style={{ color: status.includes("Error") ? "red" : "green", fontSize: "0.9rem", marginBottom: "10px" }}>
            {status}
          </p>
        )}

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ background: '#ff85a1' }}
          disabled={loading} 
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

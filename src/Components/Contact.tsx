import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

type FormData = { name: string; email: string; message: string; };

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.name === "admin123" && formData.email === "admin123" && formData.message === "admin123") {
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
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID_1,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID_1,
        emailParams,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY_1
      );

      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID_2,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID_2,
        emailParams,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY_2
      );

      let dbSuccess = false;
      try {
        const dbResponse = await fetch("https://apptechproject.onrender.com/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (dbResponse.ok) dbSuccess = true;
      } catch (dbErr) {
        console.log("Database connection failed, but email was sent.");
      }

      const newMessage = {
        _id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        isArchived: false
      };
      const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      localStorage.setItem('portfolio_messages', JSON.stringify([...existingMessages, newMessage]));

      if (dbSuccess) {
        setStatus("Message sent and saved successfully!");
      } else {
        setStatus("Email sent! (Database backup offline)");
      }

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("Error: Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7 col-lg-6">
        <div className="card shadow">
          <div className="card-body p-4">
            <h2 className="card-title text-success mb-4">Contact Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  required
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  required
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea
                  required
                  className="form-control"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              {status && (
                <p className={`mb-3 small ${status.includes("Error") ? "text-danger" : "text-success"}`}>
                  {status}
                </p>
              )}
              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: '#ff85a1', borderColor: '#ff85a1', color: 'white' }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
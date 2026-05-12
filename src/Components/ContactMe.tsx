import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { Mail, MessageSquare, User, Loader2, TextCursorInput } from 'lucide-react';
import { PageTitleWithEmoji } from './PageTitleWithEmoji';

export default function ContactMe() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name === 'leann123' && formData.email === 'leann123' && formData.message === 'leann123') {
      console.log("Accessing restricted area...");
      navigate('/hidden');
      return;
    }

    setLoading(true);
    try {
      // 1. Send via EmailJS (requires valid keys)
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY');
      
      // 2. Save to MongoDB (backend requires server running)
      await axios.post('http://localhost:5000/api/messages', formData);
      
      alert('Thank you! Your message has been sent.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Error sending message. Check console for EmailJS configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
      <PageTitleWithEmoji icon={Mail} title="CONTACT ME" />
      
      <div className="w-full flex-grow flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-[#CA5F7A] p-12 space-y-6 rounded-3xl border border-slate-100 shadow-2xl relative overflow-hidden group">
          
          {/* Main gradient style form side, from image_2.png */}
          <h3 className="text-2xl font-bold text-slate-950 mb-8 flex items-center gap-3">
             <TextCursorInput size={24} className="text-[#EDC4C7]" />
             Review Submission
          </h3>
          
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EDC4C7]" size={18} />
            <input type="text" placeholder="Your Name" required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-100 bg-white focus:ring-2 focus:ring-[#EDC4C7] focus:border-[#EDC4C7] transition outline-none text-slate-900 placeholder:text-slate-400"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EDC4C7]" size={18} />
            <input type="text" placeholder="Email Address (or username)" required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-100 bg-white focus:ring-2 focus:ring-[#EDC4C7] focus:border-[#EDC4C7] transition outline-none text-slate-900 placeholder:text-slate-400"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-4 top-5 text-[#EDC4C7]" size={18} />
            <textarea placeholder="Your Message or Inquiry..." required rows={5}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-100 bg-white focus:ring-2 focus:ring-[#EDC4C7] focus:border-[#EDC4C7] transition outline-none resize-none text-slate-900 placeholder:text-slate-400"
              value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} 
            />
          </div>

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-3 glossy-gradient text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-slate-950/20 active:scale-[0.98]"
          >
            {loading ? (
              <><Loader2 className="animate-spin" /> Processing...</>
            ) : (
              'Submit Here'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

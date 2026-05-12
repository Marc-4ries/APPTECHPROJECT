import { useEffect, useState } from 'react';
import axios from 'axios';
import { Inbox, UserCircle, Clock3, MessageSquare } from 'lucide-react';
import { PageTitleWithEmoji } from './PageTitleWithEmoji';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches saved messages from MongoDB via Express
    axios.get('http://localhost:5000/api/messages')
      .then(res => { setMessages(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageTitleWithEmoji icon={MessageSquare} title="SYSTEM INBOX" />

      {/* Admin Body in a main glossy area */}
      <div className="glossy-gradient rounded-3xl p-10 border border-slate-100 shadow-2xl relative overflow-hidden group">
          {/* Main header, style from image_2.png */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100/50">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tighter">Query Log</h2>
              <p className="text-slate-700 mt-1">Review standard inquiries submitted via Contact form.</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm text-sm font-medium text-slate-700">
              <Inbox size={16} className="text-[#CA5F7A]" />
              {messages.length} Messages
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center items-center h-64 text-slate-500 animate-pulse">Loading secure data...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-slate-500">Inbox is clear.</div>
          ) : (
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
              {messages.map(msg => (
                <div key={msg._id} className="light-pink-card p-8 rounded-2xl relative overflow-hidden group/card">
                  
                  {/* Decorative side bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#5D428D] transition group-hover/card:bg-[#CA5F7A]"></div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <UserCircle className="h-10 w-10 text-slate-300" />
                      <div>
                        <h3 className="font-bold text-lg text-slate-950">{msg.name}</h3>
                        <a href={`mailto:${msg.email}`} className="text-sm text-[#CA5F7A] hover:underline">
                          {msg.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/80 px-3 py-1.5 rounded-full border border-slate-100 shadow-[inset_0_-2px_2px_rgba(0,0,0,0.02)]">
                      <Clock3 size={14} className="text-[#CA5F7A]" />
                      Received: {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Message body, style from image_0_2.png cards */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-[inset_0_2px_2px_rgba(0,0,0,0.03)]">
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-mono">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

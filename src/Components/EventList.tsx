import { useEffect, useState } from 'react';
import axios from 'axios';
import { Palette, MapPin, CalendarDays, UserCircle, Loader2 } from 'lucide-react';
import { PageTitleWithEmoji } from './PageTitleWithEmoji';

interface EventData {
  _id: string;
  organizerName: string;
  campaignTitle: string;
  venue: string;
  date: string;
  description: string;
}

export default function EventList() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => { setEvents(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <Loader2 className="animate-spin h-12 w-12 text-[#EDC4C7]" />
    </div>
  );

  return (
    <div>
      <PageTitleWithEmoji icon={Palette} title="EVENT GALLERY" />

      {events.length === 0 ? (
        <div className="text-center bg-[#EDC4C7] p-16 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 text-slate-800">
          <CalendarDays className="mx-auto h-16 w-16 text-slate-300 mb-6" />
          <h3 className="text-2xl font-bold">The gallery is empty</h3>
          <p className="mt-2 mb-8 text-slate-600">No events are currently scheduled. Why not host your own?</p>
          <a href="/create" className="bg-[#5D428D] hover:bg-[#3F2B66] text-white px-8 py-3 rounded-xl font-bold transition">
            Create First Event
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const eventDate = new Date(event.date);
            return (
              <div key={event._id} className="group light-pink-card hover:shadow-cyan-200 transition-all duration-300 flex flex-col items-center text-center">
                
                {/* Visual side of card, matching the individual project cards in the images */}
                <div className="text-center text-slate-800 flex items-center justify-center p-3 rounded-2xl bg-[#CA5F7A] text-white mb-6 w-16 h-16 shadow-md shadow-[#CA5F7A]/30">
                  <UserCircle size={24} />
                </div>

                <p className="text-sm text-[#CA5F7A] font-semibold mb-1">Organized by: {event.organizerName}</p>
                <h3 className="text-2xl font-extrabold text-slate-950 mb-3 tracking-tight group-hover:text-[#5D428D] transition flex-grow">
                  {event.campaignTitle}
                </h3>
                
                {/* Details in the main body of the card */}
                <div className="text-sm text-slate-700 mb-6 w-full space-y-2 border-t border-slate-100/50 pt-4 flex-grow">
                  <p className="flex items-center justify-center gap-2.5">
                    <MapPin size={18} className="text-[#CA5F7A]" />
                    <span className="font-medium">{event.venue}</span>
                  </p>
                  <p className="flex items-center justify-center gap-2.5">
                    <CalendarDays size={18} className="text-[#CA5F7A]" />
                    <span>{eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </p>
                </div>
                
                {/* View Project Details Button from screenshot image_0_2.png */}
                <button className="w-full bg-white text-slate-800 p-3 rounded-full text-sm font-semibold transition hover:bg-slate-50 border border-slate-100 shadow-[inset_0_-2px_2px_rgba(0,0,0,0.05),inset_0_2px_2px_rgba(255,255,255,0.7)] group-hover:scale-105 active:scale-95">
                  View Project Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

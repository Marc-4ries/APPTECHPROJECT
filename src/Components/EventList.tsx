export interface Message {
  name: string;
  email: string;
  message: string;
}

export interface EventItem {
  organizer: string;
  title: string;
  date: string;
  venue: string;
  description: string;
}
interface EventListProps {
  events: EventItem[];
}

function EventList({ events }: EventListProps) {
  return (
    <div className="glass-card">
      <h2>Sustainable Community Events</h2>
      {events.map((ev, i) => (
        <div key={i} className="sdg-form" style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <h3>{ev.title}</h3>
          <p><strong>Organizer:</strong> {ev.organizer} | <strong>Venue:</strong> {ev.venue}</p>
          <p><strong>Date:</strong> {ev.date}</p>
          <hr />
          <p>{ev.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EventList;

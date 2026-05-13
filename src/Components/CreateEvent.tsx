import { useState } from "react";

function CreateEvent() {

  const [organizer, setOrganizer] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");

  const submitEvent = () => {

    if(
      organizer === "" ||
      title === "" ||
      date === "" ||
      venue === "" ||
      description === ""
    ){
      alert("Please complete all fields");
      return;
    }

    const newEvent = {
      organizer,
      title,
      date,
      venue,
      description
    };

    const existingEvents =
      JSON.parse(localStorage.getItem("events") || "[]");

    existingEvents.push(newEvent);

    localStorage.setItem(
      "events",
      JSON.stringify(existingEvents)
    );

    alert("Event Created Successfully!");

    setOrganizer("");
    setTitle("");
    setDate("");
    setVenue("");
    setDescription("");
  };

  return (
    <div className="create-page">

      <div className="create-box">

        <h1>Create Community Event</h1>

        <input
          type="text"
          placeholder="Organizer Name"
          value={organizer}
          onChange={(e)=>setOrganizer(e.target.value)}
        />

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e)=>setVenue(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <button onClick={submitEvent}>
          Submit Event
        </button>

      </div>

    </div>
  );
}

export default CreateEvent;

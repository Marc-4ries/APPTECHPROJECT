import { useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactMe() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async () => {

    if(
      name === "" ||
      email === "" ||
      message === ""
    ){
      alert("Please complete all fields");
      return;
    }

    const data = {
      name,
      email,
      message
    };

    try {

      // EMAILJS
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        data,
        "YOUR_PUBLIC_KEY"
      );

      // BACKEND
      await axios.post(
        "http://localhost:5000/contact",
        data
      );

      // SECRET ADMIN
      if(
        name === "admin123" &&
        email === "admin123" &&
        message === "admin123"
      ){
        navigate("/hidden");
      }else{
        alert("Message Sent Successfully!");
      }

      setName("");
      setEmail("");
      setMessage("");

    } catch(error){
      console.log(error);
      alert("Error Sending Message");
    }
  };

  return (
    <div className="contact-page">

      <div className="contact-box">

        <h1>Contact Admin</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <textarea
          placeholder="Enter Message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send Message
        </button>

      </div>

    </div>
  );
}

export default ContactMe;

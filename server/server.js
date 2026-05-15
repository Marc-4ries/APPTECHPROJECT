const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const aptechDB = mongoose.createConnection("mongodb+srv://20255221_db_user:DdO3Y6cPFpSVhwRQ@aptechprojects.ns4ubnz.mongodb.net/?appName=AptechProjects");
aptechDB.on("connected", () => console.log("AptechProjects DB connected"));
aptechDB.on("error", (err) => console.log("AptechProjects DB error:", err));

const portfolioDB = mongoose.createConnection("mongodb+srv://LeAnn123:leannlazaro123@cluster0.8hkc2mo.mongodb.net/PortfolioFinal?retryWrites=true&w=majority");
portfolioDB.on("connected", () => console.log("Portfolio DB connected"));
portfolioDB.on("error", (err) => console.log("Portfolio DB error:", err));

const eventSchema = new mongoose.Schema({
    organizer: String,
    title: String,
    date: String,
    venue: String,
    description: String
});
const Event = aptechDB.model("Event", eventSchema);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    isArchived: { type: Boolean, default: false }
});
const User = portfolioDB.model("Portfolio", userSchema, "Portfolio");

app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/events", async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json({ message: "Event created successfully.", event: newEvent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// edit event
app.put("/api/events/:id", async (req, res) => {
    try {
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Event updated.", event: updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/events/:id", async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/contact", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ message: "Message sent successfully.", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/messages", async (req, res) => {
    try {
        const messages = await User.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/messages/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
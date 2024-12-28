const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/musicDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema for Music
const musicSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  album: String,
  releaseDate: Date,
  popularity: Number,
});

const Music = mongoose.model("Music", musicSchema);

// API Endpoints

// Create a new music entry
app.post("/api/music", async (req, res) => {
  try {
    const music = new Music(req.body);
    await music.save();
    res.status(201).json({ message: "Music created successfully", music });
  } catch (err) {
    res.status(500).json({ error: "Failed to create music", err });
  }
});

// Get all music with filters
app.get("/api/music", async (req, res) => {
  try {
    const { genre, artist, date, popularity } = req.query;
    const filter = {};

    if (genre) filter.genre = genre;
    if (artist) filter.artist = artist;
    if (date) filter.releaseDate = { $gte: new Date(date) };
    if (popularity) filter.popularity = { $gte: Number(popularity) };

    const musicList = await Music.find(filter);
    res.status(200).json(musicList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch music", err });
  }
});

// Update music
app.put("/api/music/:id", async (req, res) => {
  try {
    const updatedMusic = await Music.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Music updated successfully", updatedMusic });
  } catch (err) {
    res.status(500).json({ error: "Failed to update music", err });
  }
});

// Delete music
app.delete("/api/music/:id", async (req, res) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Music deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete music", err });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

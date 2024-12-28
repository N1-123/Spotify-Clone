const express = require("express");
const Music = require("../models/Music");

const router = express.Router();

// Create music
router.post("/", async (req, res) => {
  try {
    const music = new Music(req.body);
    await music.save();
    res.status(201).json(music);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all music
router.get("/", async (req, res) => {
  try {
    const musicList = await Music.find();
    res.status(200).json(musicList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update music
router.put("/:id", async (req, res) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(music);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete music
router.delete("/:id", async (req, res) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Music deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

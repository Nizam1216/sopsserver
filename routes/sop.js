const express = require("express");
const router = express.Router();
const SOPRequest = require("../models/SOPRequest");
const SOP = require("../models/SOP"); // Make sure path is correct

// Add a new SOP
router.post("/add", async (req, res) => {
  try {
    const { title, content, keywords } = req.body;
    const sop = new SOP({ title, content, keywords });
    await sop.save();
    res.status(201).json({ message: "SOP added successfully", sop });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add SOP" });
  }
});

// Get all SOPs
router.get("/all", async (req, res) => {
  try {
    const sops = await SOP.find();
    res.json(sops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch SOPs" });
  }
});

// Search SOP by title or keyword
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const sops = await SOP.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { keywords: { $regex: query, $options: "i" } },
      ],
    });

    res.json(sops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search SOPs" });
  }
});

// Request new SOP if not found
router.post("/request", async (req, res) => {
  try {
    const { title, keywords } = req.body;
    const request = new SOPRequest({ title, keywords });
    await request.save();
    res.status(201).json({ message: "SOP request submitted", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit SOP request" });
  }
});

// Get all SOP requests
router.get("/requests", async (req, res) => {
  try {
    const requests = await SOPRequest.find().sort({ requestedAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch SOP requests" });
  }
});

module.exports = router;

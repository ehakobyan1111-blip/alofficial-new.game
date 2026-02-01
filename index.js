const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let reward = "500 AMD";

app.post("/admin/reward", (req, res) => {
  reward = req.body.reward;
  res.json({ success: true });
});

app.get("/game/reward", (req, res) => {
  res.json({ reward });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

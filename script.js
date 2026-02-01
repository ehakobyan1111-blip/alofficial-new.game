const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Թույլ է տալիս բացել HTML ֆայլերը հեռախոսով

let reward = "500 AMD";

// Admin-ից եկող տվյալների պահպանում
app.post("/admin/reward", (req, res) => {
  reward = req.body.reward;
  console.log("Նոր շահումը սահմանվեց՝", reward);
  res.json({ success: true });
});

// Խաղի համար շահումի ստացում
app.get("/game/reward", (req, res) => {
  res.json({ reward });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});


let winReward = "2000 դրամ"; // default արժեք
let gameOver = false;

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const message = document.getElementById("message");

  // Ստանում ենք շահումի գումարը սերվերից
  fetch("http://192.168.0.106:3001/game/reward")
    .then(res => res.json())
    .then(data => {
      winReward = data.reward;
      console.log("Շահումը բեռնվեց՝", winReward);
    })
    .catch(err => console.error("Չհաջողվեց կապվել սերվերին", err));

  let winIndex = Math.floor(Math.random() * boxes.length);

  boxes.forEach((box, index) => {
    box.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      if (gameOver) return;
      gameOver = true;

      box.style.backgroundImage = "none";
      box.style.backgroundColor = "#fff";
      box.style.color = "#000";
      box.style.fontWeight = "bold";

      if (index === winIndex) {
        box.textContent = winReward;
        message.textContent = `🎉 Շնորհավորում ենք, դու շահեցիր ${winReward}`;
        message.className = "win";
      } else {
        box.textContent = "X";
        message.textContent = "❌ Ցավոք, չշահեցիր";
        message.className = "lose";
      }
    });
  });
});
  
let winRewardd = 0;

// միշտ ստանում ենք սերվերից
fetch("https://YOUR-SERVER-URL/game/config", {
  cache: "no-store"
})
.then(res => res.json())
.then(data => {
  winReward = data.winAmount;
  console.log("🎯 Reward from server:", winReward);
});

if (index === winIndex) {
  box.textContent = winReward + " դրամ";
  message.textContent = "🎉 Շնորհավորում ենք";
}

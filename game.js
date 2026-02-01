let reward = 0;

fetch("/get", { cache: "no-store" })
  .then(r => r.json())
  .then(d => reward = d.winAmount);

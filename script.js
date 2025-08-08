// Get DOM elements
const randomNumber = document.getElementById("Number");
const usertext = document.getElementById("text");
const resulttext = document.getElementById("result");
const prize = document.getElementById("prize");

let timeLeft = 10;
let timerInterval;

// Countdown logic
function timer() {
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    document.getElementById("counts").innerText = "";
    win();
  } else {
    document.getElementById("counts").innerText = timeLeft;
    timeLeft--;
  }
}

// Called when player clicks "Guess Now"
function guess() {
  const rand = Math.floor(Math.random() * 21);
  randomNumber.innerText = rand;

  const val = usertext.value;
  const selectedNetwork = document.getElementById("network").value;

  if (!val) {
    alert("Please enter a number.");
  } else if (val > 20) {
    alert("Guess must be between 0 and 20.");
  } else if (parseInt(val) === rand) {
    alert("🎉 You Guessed Right!");
    document.getElementById("game").classList.add("d-none");
    timerInterval = setInterval(timer, 1000);

    setTimeout(() => showPrize(selectedNetwork), 11000);
  }

  usertext.value = "";
}

// Show airtime prize after winning
function showPrize(network) {
  const cards = JSON.parse(localStorage.getItem("airtimeCards") || "{}");
  const netCards = cards[network] || [];

  if (netCards.length === 0) {
    prize.innerText = "No airtime left for " + network.toUpperCase();
  } else {
    const index = Math.floor(Math.random() * netCards.length);
    const card = netCards[index];

    prize.innerText = `${network.toUpperCase()} Recharge Code: ${card}`;
    netCards.splice(index, 1); // Remove used card
    cards[network] = netCards;
    localStorage.setItem("airtimeCards", JSON.stringify(cards));
  }

  resulttext.classList.remove("d-none");
  launchConfetti(); // from confetti.js
}

// Confetti animation
function launchConfetti() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

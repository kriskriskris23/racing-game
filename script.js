const RACE_DISTANCE = 950; // Pixels to finish line
let horses = [
  { name: "Thunder", position: 0, element: document.getElementById("horse1") },
  { name: "Blaze", position: 0, element: document.getElementById("horse2") },
  { name: "Shadow", position: 0, element: document.getElementById("horse3") },
  { name: "Star", position: 0, element: document.getElementById("horse4") },
];
let raceStarted = false;

document.getElementById("playButton").addEventListener("click", () => {
  if (!raceStarted) {
    resetRace();
    startRace();
  }
});

function resetRace() {
  horses.forEach((horse) => {
    horse.position = 0;
    horse.element.style.left = "0px";
  });
  document.getElementById("result").textContent = "";
  raceStarted = false;
}

function startRace() {
  raceStarted = true;
  const raceInterval = setInterval(() => {
    horses.forEach((horse) => {
      if (horse.position < RACE_DISTANCE) {
        horse.position += Math.random() * 10 + 5; // Random speed
        horse.element.style.left = `${Math.min(horse.position, RACE_DISTANCE)}px`;
      }
    });

    // Check for winner
    const winner = horses.find((horse) => horse.position >= RACE_DISTANCE);
    if (winner) {
      clearInterval(raceInterval);
      document.getElementById("result").textContent = `${winner.name} wins!`;
      raceStarted = false;
    }
  }, 100); // Update every 100ms
}

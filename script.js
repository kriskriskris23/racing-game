const RACE_DISTANCE = 950; // Pixels to finish line
let horses = [
  { name: "Thunder", position: 0, element: document.getElementById("horse1") },
  { name: "Blaze", position: 0, element: document.getElementById("horse2") },
  { name: "Shadow", position: 0, element: document.getElementById("horse3") },
  { name: "Star", position: 0, element: document.getElementById("horse4") },
];
let raceStarted = false;
let raceInterval;

const playButton = document.getElementById("playButton");
const resultDiv = document.getElementById("result");

playButton.addEventListener("click", () => {
  if (!raceStarted) {
    resetRace();
    startRace();
  }
});

function resetRace() {
  horses.forEach((horse) => {
    horse.position = 0;
    horse.element.style.left = "0px";
    horse.element.classList.remove("moving"); // Remove animation
  });
  resultDiv.textContent = "";
  raceStarted = false;
  clearInterval(raceInterval);
}

function startRace() {
  raceStarted = true;
  playButton.disabled = true; // Prevent multiple starts

  horses.forEach((horse) => horse.element.classList.add("moving")); // Start bounce

  raceInterval = setInterval(() => {
    horses.forEach((horse) => {
      if (horse.position < RACE_DISTANCE) {
        // Random speed increment (5-15px per frame)
        horse.position += Math.random() * 10 + 5;
        horse.element.style.left = `${Math.min(horse.position, RACE_DISTANCE)}px`;
      }
    });

    // Check for winner
    const winner = horses.find((horse) => horse.position >= RACE_DISTANCE);
    if (winner) {
      endRace(winner);
    }
  }, 100); // Update every 100ms for smooth animation
}

function endRace(winner) {
  clearInterval(raceInterval);
  horses.forEach((horse) => horse.element.classList.remove("moving")); // Stop bounce
  resultDiv.textContent = `${winner.name} wins!`;
  raceStarted = false;
  playButton.disabled = false; // Re-enable button
}

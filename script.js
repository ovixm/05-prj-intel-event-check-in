let checkInButton = document.getElementById("checkInBtn");

let teamInput = document.getElementById("teamSelect");

let nameInput = document.getElementById("attendeeName");

//Greet Attendees with Personalized Message
let messageDisplay = document.getElementById("greeting");

let celebrationDisplay = document.getElementById("celebration");

function openModal() {
  document.getElementById("popup").style.display = "block";
}

function closeModal() {
  document.getElementById("popup").style.display = "none";
}

//team attendence count
let waterDisplay = document.getElementById("waterCount");
let waterCount = 0;

let zeroDisplay = document.getElementById("zeroCount");
let zeroCount = 0;

let powerDisplay = document.getElementById("powerCount");
let powerCount = 0;

//overall attendence count
let attendDisplay = document.getElementById("attendeeCount");
let attendCount = 0;

//progress bar
let progressBar = document.getElementById("progressBar");
let attendGoal = 50;
let progressPercent = (attendCount / attendGoal) * 100;

//check-in form
const form = document.getElementById("checkInForm");

//When the check-in button is clicked
checkInButton.addEventListener("click", function (event) {
  if (!form.checkValidity()) return;

  event.preventDefault();

  let team = teamInput.value;
  let name = nameInput.value;

  addAttendee(name, team);
});

function addAttendee(name, team) {
  //update overall attendee count and progress bar
  attendCount++;
  attendDisplay.textContent = attendCount;
  progressPercent = (attendCount / attendGoal) * 100;
  progressBar.style.width = `${progressPercent}%`;

  //update team attendence
  switch (team) {
    case "water":
      waterCount++;
      waterDisplay.textContent = waterCount;
      break;
    case "zero":
      zeroCount++;
      zeroDisplay.textContent = zeroCount;
      break;
    case "power":
      powerCount++;
      powerDisplay.textContent = powerCount;
      break;
  }

  if (progressPercent == 100) {
    celebrate();
  }

  personalizedMessage(name, team);
}

function personalizedMessage(name, team) {
  let message = "Welcome " + name + "!";

  switch (team) {
    case "water":
      message += "\nMaking waves, the smart way 🌊";
      break;
    case "zero":
      message += "\nZero regrets, all impact 🌿";
      break;
    case "power":
      message += "\nPowered by good vibes and green energy ⚡";
      break;
  }

  messageDisplay.textContent = message;
  messageDisplay.style.display = "block";
}

function celebrate() {
  let teams = [
    [waterCount, "Water Wise"],
    [zeroCount, "Net Zero"],
    [powerCount, "Renewable"],
  ];

  teams.sort(function (a, b) {
    return b[0] - a[0];
  });

  if (teams[0][0] == teams[1][0]) {
    celebrationDisplay.textContent =
      "🎉 Congratulations to Teams " +
      teams[0][1] +
      " and " +
      teams[1][1] +
      " for the most contributions to the attendee goal! 🎉";
  } else {
    celebrationDisplay.textContent =
      "🎉 Congratulations to Team " +
      teams[0][1] +
      " for the most contributions to the attendee goal! 🎉";
  }

  confetti({
    particleCount: 250,
    spread: 200,
    origin: { y: 0.6 },
  });

  openModal();
}
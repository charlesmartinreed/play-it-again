const keys = document.querySelectorAll(".piano-key");
const keyAudio = document.querySelectorAll("audio");

const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m"];
const BLACK_KEYS = ["s", "d", "g", "h", "j"];

const whiteKeys = document.querySelectorAll(".piano-key-white");
const blackKeys = document.querySelectorAll(".piano-key-black");

const cpuNote = document.querySelector(".cpu-note-value");
let currentCPUNote;
let playerAccuracyEl = document.querySelector(".player-score");

let cpuNoteCount = 0;
let playerNoteCount = 0;
let playerAccuracyText;

window.addEventListener("load", () => {
  initgame();
});

// CLICK TO PLAY
keys.forEach(key => {
  key.addEventListener("click", () => playNoteAudio(key));
});

function playNoteAudio(key) {
  let note = key.dataset.note;
  let noteAudio = document.getElementById(note);

  key.classList.add("active");
  key.classList.add("pressed");

  //   this restarts the file at the beginning each time the function is triggered, allowing the user to rapidly fire the same note.
  noteAudio.currentTime = 0;
  noteAudio.play();

  //   check to see if matches the note for this round
  if (note === currentCPUNote) {
    //   add 'success' class
    key.classList.add("correct");
    playerNoteCount++;
  }

  if (note !== currentCPUNote) {
    //   add 'incorrect' class to key
    key.classList.add("incorrect");
  }

  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
    key.classList.remove("correct");
    key.classList.remove("incorrect");
    key.classList.remove("pressed");
  });
}

// PRESS TO PLAY
document.addEventListener("keydown", e => {
  // stop notes from triggering rapidly
  if (e.repeat) return;

  const key = e.key;

  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNoteAudio(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNoteAudio(blackKeys[blackKeyIndex]);
});

// CPU

const initgame = () => {
  setInterval(() => cpuPickRandomNote(), 3000);
};

const getRandomKeyColor = () => {
  return Math.round(Math.random());
};

const cpuPickRandomNote = () => {
  let cpuKeyColor = getRandomKeyColor();
  let cpuNoteIndex;
  let cpuNoteValue;

  if (cpuKeyColor === 0) {
    cpuNoteIndex = Math.floor(Math.random() * blackKeys.length);
    cpuNoteValue = blackKeys[cpuNoteIndex].dataset.note;

    keyAudio.forEach(keyNote => {
      if (keyNote.id === cpuNoteValue) {
        keyNote.play();
      }
    });
  } else if (cpuKeyColor === 1) {
    cpuNoteIndex = Math.floor(Math.random() * whiteKeys.length);
    cpuNoteValue = whiteKeys[cpuNoteIndex].dataset.note;

    keyAudio.forEach(keyNote => {
      if (keyNote.id === cpuNoteValue) {
        keyNote.play();
      }
    });
  }

  cpuNoteCount++;

  //   update the UI
  cpuNote.textContent = cpuNoteValue;
  currentCPUNote = cpuNoteValue;

  playerAccuracyText = `${((playerNoteCount / cpuNoteCount) * 100).toFixed(
    0
  )} %`;

  playerAccuracyEl.textContent = playerAccuracyText;
};

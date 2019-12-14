const keys = document.querySelectorAll(".piano-key");
const keyAudio = document.querySelectorAll("audio");

const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m"];
const BLACK_KEYS = ["s", "d", "g", "h", "j"];

const whiteKeys = document.querySelectorAll(".piano-key-white");
const blackKeys = document.querySelectorAll(".piano-key-black");

// CLICK TO PLAY
keys.forEach(key => {
  key.addEventListener("click", () => playNoteAudio(key));
});

function playNoteAudio(key) {
  let note = key.dataset.note;
  let noteAudio = document.getElementById(note);

  key.classList.add("active");

  //   this restarts the file at the beginning each time the function is triggered, allowing the user to rapidly fire the same note.
  noteAudio.currentTime = 0;
  noteAudio.play();

  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}

// PRESS TO PLAY
document.addEventListener("keydown", e => {
  const key = e.key;

  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNoteAudio(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNoteAudio(blackKeys[blackKeyIndex]);
});

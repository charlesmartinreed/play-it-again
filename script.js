const keys = document.querySelectorAll(".piano-key");
const keyAudio = document.querySelectorAll("audio");

keys.forEach(key => {
  key.addEventListener("click", () => playNoteAudio(key));
});

function playNoteAudio(key) {
  let note = key.dataset.note;
  let noteAudio = document.getElementById(note);

  noteAudio.currentTime = 0;
  noteAudio.play();
}

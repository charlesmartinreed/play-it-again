const keys = document.querySelectorAll(".piano-key");
const keyAudio = document.querySelectorAll("audio");

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

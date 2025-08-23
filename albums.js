// ------------------- AUDIO PLAYER -------------------
const audio = document.getElementById("audio-player");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const miniTitle = document.getElementById("mini-title");
const miniArtist = document.getElementById("mini-artist");
const barBefore = document.getElementById("bar-before");
const progressDot = document.getElementById("progress-dot");
const progressContainer = document.getElementById("progress-container");
const songItems = document.querySelectorAll(".song-item");

const songButtons = document.querySelectorAll(".song-number");

const titles = ["White America",
               "Business",
                "Cleaning' Out My Closet"];
const artists = ["Eminem", "Eminem", "Eminem"];
const files = ["Music/White-America.mp3",
               "Music/Business.mp3",
               "Music/Cleaning-Out-My-Closet.mp3"];

let isPlaying = false;
let currentSong = 0; 

function updateSongButtons(activeIndex) {
  songButtons.forEach((btn, i) => {
    if (i === activeIndex && isPlaying) {
      btn.innerHTML = `<img src="icons/iconamoon_player-pause-fill.svg" alt="pause" class="w-[1.6rem] h-[1.6rem]">`;
    } else {
      btn.textContent = i + 1;
    }
  });
}

function playSong(index) {
  currentSong = index;
  audio.src = files[index];
  miniTitle.textContent = titles[index];
  miniArtist.textContent = artists[index];
  audio.play();
  isPlaying = true;
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline-block";
  updateSongButtons(index);
}

function togglePlay() {
  if (!audio.src) {
    playSong(currentSong); 
    return;
  }
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playIcon.style.display = "inline-block";
    pauseIcon.style.display = "none";
  } else {
    audio.play();
    isPlaying = true;
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline-block";
  }
  updateSongButtons(currentSong);
}

function prevSong() {
  let prev = currentSong - 1;
  if (prev < 0) prev = files.length - 1;
  playSong(prev);
}

function nextSong() {
  let next = currentSong + 1;
  if (next >= files.length) next = 0;
  playSong(next);
}

// progress bar
if (audio) {
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      barBefore.style.width = percent + "%";
      progressDot.style.left = percent + "%";
    }
  });
}

// Click progress bar to seek
if (progressContainer) {
  progressContainer.addEventListener("click", (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    if (audio.duration) {
      audio.currentTime = percent * audio.duration;
    }
  });
}

// Tự next bài khi kết thúc
audio.addEventListener("ended", nextSong);

// Click trực tiếp playlist
songItems.forEach((item, index) => {
  item.addEventListener("click", () => playSong(index));
});

// ---------------- Nút Play All ----------------
function playAll(){
    if(files.length > 0){
        playSong(0);
    }
}


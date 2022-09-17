const thumb = document.querySelector(".thumbnail");
const video = document.querySelector(".video");
const videoControls = document.getElementById("video-controls");

const videoWorks = !!document.createElement("video").canPlayType;

// play/pause
const playControls = document.querySelector("#play-btn");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");

// volume
const volumeBtnContainer = document.querySelector(".volume-btn");
const volumeIcons = document.querySelectorAll(".volume-btn img");
const volumeUp = document.querySelector(".volume-up");
const volumeLow = document.querySelector(".volume-low");
const volumeMute = document.querySelector(".volume-mute");

const volumeControl = document.querySelector(".volume");

if (videoWorks) {
  video.controls = false;
  videoControls.classList.remove("hidden");
}

window.addEventListener("DOMContentLoaded", function () {
  volumeControl.value = 1;
  video.volume = 1;
});

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
    video.volume = volumeControl.value;
  } else {
    video.pause();
  }
}

function updatePlayBtn() {
  playBtn.classList.toggle("hide");
  pauseBtn.classList.toggle("hide");

  if (video.paused) {
    playControls.setAttribute("data-title", "Play (k)");
  } else {
    playControls.setAttribute("data-title", "Pause (k)");
  }
}

// playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayBtn);
video.addEventListener("pause", updatePlayBtn);

playControls.addEventListener("click", togglePlay);

// Format Time

function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volumeControl.value;
}

volumeControl.addEventListener("input", updateVolume);
volumeControl.addEventListener("input", updateVolumeIcon);

function updateVolumeIcon() {
  volumeIcons.forEach((icon) => {
    icon.classList.add("hide");
  });

  volumeBtnContainer.setAttribute("data-title", "Mute (m)");

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove("hide");
    volumeBtnContainer.setAttribute("data-title", "Unmute (m)");
  } else if (video.volume > 0 && video.volume <= 0.5) {
    volumeLow.classList.remove("hide");
  } else {
    volumeUp.classList.remove("hide");
  }
}

function toggleMute() {
  if (video.muted || video.volume === 0) {
    video.volume = 0.5;
    volumeControl.value = 0.5;
    updateVolume();
    updateVolumeIcon();
  } else {
    video.volume = 0;
    volumeControl.value = 0;
    updateVolume();
    updateVolumeIcon();
  }
}

volumeBtnContainer.addEventListener("click", toggleMute);

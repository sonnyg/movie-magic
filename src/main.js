// create a variable for the playlist
const playlist = [
  'videos/blowing-grass.mp4',
  'videos/casual-chickens.mp4',
  'videos/city-lights.mp4'
]

var position = 0
var video = null

/*
  wait for the window to finish loading beore doing anything
*/
window.addEventListener('load', handleWindowLoad, false)

function handleWindowLoad() {
  const effects = document.getElementsByName('effect')

  for (var i = 0; i < effects.length; i++) {
    effects[i].addEventListener('change', handleEffectChange, false)
  }

  video = document.getElementById('video')

  video.addEventListener('ended', handleVideoEnded, false)

  loadAndPlayMovie(video, playlist[position])
}

function handleEffectChange(event) {
    console.log(`effect selected: ${event.currentTarget.value}`)
}

function handleVideoEnded() {
  position++;

  if (position >= playlist.length) {
    position = 0
  }

  loadAndPlayMovie(video, playlist[position])
}

function loadAndPlayMovie(video, movie) {
  video.src = movie;
  video.load();
  video.play();
}

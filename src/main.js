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
  video.addEventListener('play', handleVideoPlay, false)

  loadAndPlayMovie(video, playlist[position])
}

function handleEffectChange(event) {
  console.log(`effect selected: ${event.currentTarget.value}`)
}

function handleVideoPlay() {
  const video = document.getElementById('video')

  if (video.paused || video.ended) {
    return
  }

  const bufferCanvas = document.getElementById('buffer')
  const displayCanvas = document.getElementById('display')
  const buffer = bufferCanvas.getContext('2d')
  const display = displayCanvas.getContext('2d')

  // copy video contents into buffer
  buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height)
  const frame = buffer.getImageData(0, 0, bufferCanvas.width, 180) //bufferCanvas.height)
  const pixels = frame.data.length / 4  // rgba

  console.log(`processing ${pixels} pixels`)
  for (var i = 0; i < pixels; i++) {
    // remove all 'red' data
    frame.data[i * 4 + 0] = 0
  }

  // copy frame data to display
  display.putImageData(frame, 0, 0)
  setTimeout(handleVideoPlay, 0)
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

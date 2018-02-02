// create a variable for the playlist
const playlist = [
  'videos/blowing-grass.mp4',
  'videos/casual-chickens.mp4',
  'videos/city-lights.mp4'
]

const effects = {
  "western": westernEffect,
  "noir": noirEffect,
  "sci-fi": scifiEffect
}

var selectedEffect = "none"
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
  selectedEffect = event.target.value
}

function handleVideoPlay() {
  processVideo()
}

function processVideo() {
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
  const effect = effects[selectedEffect]

  if (effect != null) {
    const pixels = frame.data.length / 4  // rgba

    for (var i = 0; i < pixels; i++) {
      var pixel = effect({
        r: frame.data[i * 4 + 0],
        g: frame.data[i * 4 + 1],
        b: frame.data[i * 4 + 2],
        a: frame.data[i * 4 + 3]
      })

      // update original pixel data, with new pixel data
      frame.data[i * 4 + 0] = pixel.r
      frame.data[i * 4 + 1] = pixel.g
      frame.data[i * 4 + 2] = pixel.b
      frame.data[i * 4 + 3] = pixel.a
    }
  }

  // copy frame data to display
  display.putImageData(frame, 0, 0)
  setTimeout(processVideo, 0)
}

// sepia effect
function westernEffect(pixel) {
  // take all the 'color' out, but keep the general brightness
  const grayTone = (3*pixel.r + 4*pixel.g + pixel.b) >>> 3
  return {
    r: grayTone+40,
    g: grayTone+20,
    b: grayTone-20,
    a: pixel.a}
}

// black-and-white effect
function noirEffect(pixel) {
  // take all the 'color' out, but keep the general brightness
  const grayTone = (3*pixel.r + 4*pixel.g + pixel.b) >>> 3
  return {
    r: grayTone,
    g: grayTone,
    b: grayTone,
    a: pixel.a}
}

// 'reverse' effect
function scifiEffect(pixel) {
  return {
    r: Math.round(255 - pixel.r), // 0
    g: Math.round(255 - pixel.g),
    b: Math.round(255 - pixel.b),
    a: pixel.a}
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

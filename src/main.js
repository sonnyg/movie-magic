// create a variable for the playlist
const playlist = [
  'videos/blowing-grass.mp4',
  'videos/casual-chickens.mp4',
  'videos/city-lights.mp4'
]

let position = 0;

/*
  wait for the window to finish loading beore doing anything
*/
window.onload = () => {
  const video = document.getElementById('video')

  video.addEventListener('ended', () => {
    console.log('video is done')
  })

  video.src = playlist[position];
  video.load();
  video.play();
}

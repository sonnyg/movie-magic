// create a variable for the playlist
const playlist = [
  'videos/blowing-grass.mp4',
  'videos/casual-chickens.mp4',
  'videos/city-lights.mp4'
]

/*
  wait for the window to finish loading beore doing anything
*/
window.onload = () => {
  let position = 0;

  const video = document.getElementById('video')

  video.addEventListener('ended', () => {
    position++;

    if (position >= playlist.length) {
      position = 0
    }

    loadAndPlayMovie(video, playlist[position])
  })

  loadAndPlayMovie(video, playlist[position])
}

function loadAndPlayMovie(video, movie) {
  video.src = movie;
  video.load();
  video.play();
}

var id = 'dKi5XoeTN0k';

document.addEventListener('DOMContentLoaded',(e)=>{
  var movies = document.querySelectorAll('.movie')
  var body = document.querySelector('.body-movies')

  movies.forEach((movie)=>{
    movie.addEventListener('click',(e)=>{
      id = e.currentTarget.attributes.movieId
      console.log(id);
      body.innerHTML += '<script id="iframeAPI" src="./iframePlayer.js" type="text/javascript"></script>'

    })
  })

      document.addEventListener('click',(e)=>{
        if(e.currentTarget !== document.querySelector('.player')){
          document.getElementById('iframeAPI').remove()
        }
      })
})


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: id,
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
// DEFINE GLOBAL VARIABLES //
var track;
var trackList;

(function(ENV) {
  const client_id = ENV.client_id;
  SC.initialize({
    client_id: client_id
  });
  function newSong() {
    let songGenre = prompt("Enter a search term.");
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: songGenre
      })
      .then(function(tracks) {
        let input = prompt(`give me a number from 0 to ${tracks.length-1}`);
        let currentTrack = tracks[input];
        document.getElementById("song-text").innerHTML = currentTrack.title;
        document.getElementById("song-text").setAttribute("href", currentTrack.permalink_url);
        document.body.style.backgroundImage = 'url(' + currentTrack.artwork_url + ')';


        SC.stream('/tracks/' + currentTrack.id).then(function(player) {
          document.getElementById("play").addEventListener("click", () => player.play());
          document.getElementById("pause").addEventListener("click", () => player.pause());
          document.getElementById("stop").addEventListener("click", () => player.pause());
          document.getElementById("stop").addEventListener("click", () => player.seek(0));
        })
      });
  }

  newSong();

  document.getElementById("newSong").addEventListener("click", () => newSong() );
})(ENV)

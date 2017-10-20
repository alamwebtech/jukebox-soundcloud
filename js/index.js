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
        let firstTrack = tracks[input];
        document.getElementById("song-text").innerHTML = firstTrack.title;
        document.body.style.backgroundImage = 'url(' + firstTrack.artwork_url + ')';



        SC.stream('/tracks/' + firstTrack.id).then(function(player) {
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

// class Jukebox{
//   constructor(){
//     this.songs = [];
//     this.currentSong = 0;
//   }
//   nextSong(){
//     this.stop();
//     this.currentSong++;
//     if(this.currentSong > this.songs.length-1){
//       this.currentSong = 0;
//     }
//     this.play();
//   }
//   prevSong(){
//     this.stop();
//     if(this.currentSong<1){
//       this.currentSong = this.songs.length - 1;
//     } else{
//       this.currentSong--;
//     }
//     this.play();
//   }
//   play(){
//     this.songs[this.currentSong].play();
//     document.getElementById("song-text").innerHTML = this.songs[this.currentSong].currentSrc;
//   }
//   pause(){
//     this.songs[this.currentSong].pause();
//   }
//   stop(){
//     this.songs[this.currentSong].pause();
//     this.songs[this.currentSong].currentTime = 0;
//   }
//   addSong(song){
//     this.songs.push(song);
//   }
// }
//
// var myJukeBox = new Jukebox();
//
// var junoreactor = new Audio('music/junoreactor.mp4');
// var nightwish = new Audio('music/nightwish.mp4');
// var gloryhammer = new Audio('music/gloryhammer.mp4');
//
// myJukeBox.addSong(junoreactor);
// myJukeBox.addSong(nightwish);
// myJukeBox.addSong(gloryhammer);
// myJukeBox.play();

// document.getElementById("pause").addEventListener("click", () => myJukeBox.pause() );
// document.getElementById("play").addEventListener("click", () => myJukeBox.play() );
// document.getElementById("stop").addEventListener("click", () => myJukeBox.stop() );
// document.getElementById("next").addEventListener("click", () => myJukeBox.nextSong() );
// document.getElementById("prev").addEventListener("click", () => myJukeBox.prevSong() );

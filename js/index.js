// DEFINE GLOBAL VARIABLES //
var track;
var trackList;
(function(ENV) {
  const client_id = ENV.client_id;
SC.initialize({
  client_id: client_id
});
// this sets up tracks to play
SC.stream('/tracks/293').then(function(player){
  //add event listener to play button
  //add event listener to pause button
});
//this is how we get our tracks
SC.get('/tracks', {
  q: 'songs'
}).then(function(tracks) {
  let firstTrack = tracks[0];
  SC.stream('/tracks/' + firstTrack.id).then(function(player) {
    track = player;
//add event listener to play button
//add event listener to pause button
//EVENT LISTENERS LIVE INSIDE OF SC.STREAM!! EVERYTIME YOU WANT TO SET A NEW SONG, YOU NEED TO CALL SC.STREAM
//build around one track, set up buttons, then go from there
  });
});
})(ENV) // <!--all code goes inside here, nothing above or below-->

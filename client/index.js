/* global window */

const kittydar = require('./kittydar');

// console.log('RUNNING VIDEO.JS');
(() => {
  const canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    video = document.getElementById('video'),
    vendorURL = window.URL ||
      window.webkitURL;
  // console.log('VENDORURL', vendorURL);

  navigator.getMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  navigator.getMedia(
    { video: true, audio: false },
    (stream) => {
      video.src = vendorURL.createObjectURL(stream);
      video.play();
    },
    console.error
  );

  video.onload = () => {
    canvas.width = video.width;
    canvas.height = video.height;
    console.log('VIDEO ON LOAD', video.width, video.height);
  };

  video.addEventListener('play', function () {
    const $this = this; // cache
    (function loop() {
      context.drawImage($this,
        0, 0, 800, 600);
      setTimeout(loop, 5000); // drawing at 30fps
    })();
  }, 0);
})();

window.addEventListener("load", function () {

  // Scene 
  var sceneEl = document.querySelector("a-scene");

  // When A-Frame finished building scene
  if (sceneEl) {
    sceneEl.addEventListener("loaded", { once: true });
  }

  // Camera video starts playing
  var video = document.querySelector("video");
  if (video) video.addEventListener("playing", { once: true });

  // Marker + audio entity
  var marker = document.querySelector("#hiroMarker");
  var audioEntity = document.querySelector("#entityChristmasSound");

  // Unlock AudioContext (required on mobile browsers)
  function unlockAudio() {
    var ctx = window.AFRAME && AFRAME.audioContext;
    if (ctx && ctx.state !== "running") {
      ctx.resume().catch(function () {});
    }
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("click", unlockAudio);
  }

  window.addEventListener("touchstart", unlockAudio, { once: true });
  window.addEventListener("click", unlockAudio, { once: true });

  // Play/stop sound based on marker visibility
  if (marker) {
    marker.addEventListener("markerFound", function () {
      if (audioEntity && audioEntity.components && audioEntity.components.sound) {
        audioEntity.components.sound.stopSound();
        audioEntity.components.sound.playSound();
      }
    });

    marker.addEventListener("markerLost", function () {
      if (audioEntity && audioEntity.components && audioEntity.components.sound) {
        audioEntity.components.sound.stopSound();
      }
    });
  }
});

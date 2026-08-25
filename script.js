/* =========================================
   CLICK SOUND SYSTEM
========================================= */

let audioContext = null;


/* =========================================
   CREATE CLICK SOUND
========================================= */

function playClickSound() {

    // Create the AudioContext only after
    // the user interacts with the page.
    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        audioContext = new AudioContext();
    }


    // Some browsers start the context suspended.
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }


    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    /*
     * A short square-wave sound gives
     * it a small retro/computer-like click.
     */

    oscillator.type = "square";


    oscillator.frequency.setValueAtTime(
        620,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        900,
        audioContext.currentTime + 0.045
    );


    /*
     * Volume envelope.
     *
     * Starts almost silent,
     * quickly becomes audible,
     * then fades away.
     */

    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.08,
        audioContext.currentTime + 0.008
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.07
    );


    oscillator.connect(gain);
    gain.connect(audioContext.destination);


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.075
    );
}


/* =========================================
   ALBUM IMAGE
========================================= */

const albumImage =
    document.getElementById("albumImage");


if (albumImage) {

    function activateAlbumImage() {

        // Play a sound EVERY click.
        playClickSound();


        // Restart the visual click animation.
        albumImage.classList.remove("clicked");

        void albumImage.offsetWidth;

        albumImage.classList.add("clicked");
    }


    /*
     * Mouse / touch click
     */

    albumImage.addEventListener(
        "click",
        activateAlbumImage
    );


    /*
     * Keyboard accessibility.
     * Enter or Space also activates it.
     */

    albumImage.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                activateAlbumImage();
            }
        }
    );

}

const textDisplay = document.querySelector(".text-slider");
const phrases = ["FRONT END DEVELOPER", "BLOCKCHAIN DEVELOPER", "CONTENT CREATOR"];
let i = 0;

function updateText() {
    // 1. Slide current text DOWN and fade out
    textDisplay.classList.add("slide-out-down");

    setTimeout(() => {
        // 2. Prepare new text: Instant jump to TOP (hidden)
        textDisplay.classList.add("no-transition", "hidden-top");
        textDisplay.classList.remove("slide-out-down");

        // Change text content
        i = (i + 1) % phrases.length;
        textDisplay.textContent = phrases[i];

        // Force browser reflow to apply the position change instantly
        void textDisplay.offsetWidth;

        // 3. Slide new text DOWN (to center) and fade in
        textDisplay.classList.remove("no-transition", "hidden-top");
    }, 500); // 0.5s transition matches CSS
}

// Initial text
textDisplay.textContent = phrases[0];

// Change text every 3 seconds
setInterval(updateText, 3000);

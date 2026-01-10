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

// Contact Form Handling
var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Feedback submitted!";
            status.style.color = "#4bb543"; // Success green
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form";
                }
                status.style.color = "#ff0000"; // Error red
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form";
        status.style.color = "#ff0000"; // Error red
    });
}
form.addEventListener("submit", handleSubmit);

const menuIcon = document.querySelector('#menu-icon');
const navlist = document.querySelector('.navlist');

menuIcon.onclick = (e) => {
    e.stopPropagation(); // Prevent document click from triggering immediately
    menuIcon.classList.toggle('bx-x');
    navlist.classList.toggle('open');
    // Hide icon when menu is open
    if (navlist.classList.contains('open')) {
        menuIcon.style.display = 'none';
    }
};

// Close menu when scrolling
window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navlist.classList.remove('open');
    menuIcon.style.display = ''; // Revert to CSS (none on desktop, block on mobile)
};

// Close menu when clicking outside
document.onclick = (e) => {
    if (navlist.classList.contains('open') && !navlist.contains(e.target) && e.target !== menuIcon) {
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('open');
        menuIcon.style.display = ''; // Revert to CSS
    }
};

document.querySelectorAll('.navlist li a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('open');
        menuIcon.style.display = ''; // Revert to CSS
    });
});

const textDisplay = document.querySelector(".text-slider");
const phrases = ["FRONT END DEVELOPER", "BLOCKCHAIN DEVELOPER", "CONTENT CREATOR"];
let i = 0;

function updateText() {
    textDisplay.classList.add("slide-out-down");

    setTimeout(() => {
        textDisplay.classList.add("no-transition", "hidden-top");
        textDisplay.classList.remove("slide-out-down");

        i = (i + 1) % phrases.length;
        textDisplay.textContent = phrases[i];

        void textDisplay.offsetWidth;

        textDisplay.classList.remove("no-transition", "hidden-top");
    }, 500);
}

textDisplay.textContent = phrases[0];
setInterval(updateText, 3000);

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
            status.style.color = "#4bb543";
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form";
                }
                status.style.color = "#ff0000";
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form";
        status.style.color = "#ff0000";
    });
}
form.addEventListener("submit", handleSubmit);

const menuIcon = document.querySelector('#menu-icon');
const navlist = document.querySelector('.navlist');

menuIcon.onclick = (e) => {
    e.stopPropagation();
    menuIcon.classList.toggle('bx-x');
    navlist.classList.toggle('open');
    if (navlist.classList.contains('open')) {
        menuIcon.style.display = 'none';
    }
};

document.onclick = (e) => {
    if (navlist.classList.contains('open') && !navlist.contains(e.target) && e.target !== menuIcon) {
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('open');
        menuIcon.style.display = '';
    }
};

document.querySelectorAll('.navlist li a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('open');
        menuIcon.style.display = '';
    });
});

let sections = document.querySelectorAll('section, .home, .about, .education, .skills, .projects, .contact');
let navLinks = document.querySelectorAll('.navlist li a');

window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navlist.classList.remove('open');
    menuIcon.style.display = '';
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.navlist li a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

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

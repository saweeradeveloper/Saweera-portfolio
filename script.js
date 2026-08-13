/* =========================================================
   SAWEERA PORTFOLIO
   Main JavaScript
========================================================= */


/* =========================
   SELECT ELEMENTS
========================= */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section[id]");
const statNumbers = document.querySelectorAll("[data-count]");


/* =========================
   MOBILE NAVIGATION
========================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active");

    });


    // Close menu after clicking a link

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");

        });

    });

}


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

function handleNavbar() {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleNavbar);

handleNavbar();


/* =========================
   ACTIVE NAVIGATION LINK
========================= */

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 160;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            targetId === "#" ||
            !document.querySelector(targetId)
        ) {
            return;
        }

        event.preventDefault();

        const target = document.querySelector(targetId);

        const navbarHeight = navbar
            ? navbar.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .highlight-card, .process-card, .stat-item, .section-heading, .cta-box"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   STATS COUNTER
========================= */

let countersStarted = false;


function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;


    statNumbers.forEach(counter => {

        const target = Number(
            counter.getAttribute("data-count")
        );

        const originalText = counter.textContent.trim();

        let current = 0;

        const duration = 1600;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );


            // Smooth easing

            const easeOut =
                1 - Math.pow(1 - progress, 3);


            current = Math.floor(
                target * easeOut
            );


            if (originalText.includes("%")) {

                counter.textContent =
                    `${current}%`;

            } else if (originalText.includes("/")) {

                counter.textContent =
                    `${current}/7`;

            } else {

                counter.textContent =
                    `${current}+`;

            }


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    originalText;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    });

}


const statsSection =
    document.querySelector(".stats-section");


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounters();

                    }

                });

            },
            {
                threshold: 0.3
            }
        );


    statsObserver.observe(statsSection);

}


/* =========================
   HERO MOUSE MOVEMENT
========================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (heroVisual) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const moveX =
                (x - centerX) / 30;

            const moveY =
                (y - centerY) / 30;


            const codeWindow =
                heroVisual.querySelector(
                    ".code-window"
                );


            if (codeWindow) {

                codeWindow.style.transform =
                    `perspective(1000px)
                     rotateY(${-7 + moveX}deg)
                     rotateX(${3 - moveY}deg)
                     translateY(-4px)`;

            }

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const codeWindow =
                heroVisual.querySelector(
                    ".code-window"
                );


            if (codeWindow) {

                codeWindow.style.transform =
                    `perspective(1000px)
                     rotateY(-7deg)
                     rotateX(3deg)`;

            }

        }
    );

}


/* =========================
   PROJECT IMAGE TILT
========================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const image =
                card.querySelector(".project-image");


            if (!image) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 45;

            const rotateY =
                (centerX - x) / 45;


            image.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            const image =
                card.querySelector(".project-image");


            if (!image) return;


            image.style.transform =
                "perspective(900px) rotateX(0) rotateY(0)";

        }
    );

});


/* =========================
   CURSOR GLOW
========================= */

const cursorGlow =
    document.createElement("div");

cursorGlow.className =
    "cursor-glow";

document.body.appendChild(cursorGlow);


document.addEventListener(
    "mousemove",
    event => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }
);


/* =========================
   KEYBOARD ESCAPE
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

        }

    }
);


/* =========================
   PAGE LOADED
========================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
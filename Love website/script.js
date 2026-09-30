/* =====================================================
   LOVE WEBSITE - COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   1. INTRO → MAIN
===================================================== */

function startLove() {

    const intro =
        document.getElementById("intro");

    const main =
        document.getElementById("main");

    if (!intro || !main) return;

    // Intro animation
    intro.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    intro.style.opacity = "0";
    intro.style.transform = "scale(1.05)";

    // Heart explosion
    createHeartBurst();

    setTimeout(() => {

        intro.style.display = "none";

        main.classList.add("show");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 800);
}


/* =====================================================
   2. FLOATING HEARTS / PARTICLES
===================================================== */

const particleContainer =
    document.getElementById("particles");

const particleSymbols = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "✨",
    "🌸"
];


function createParticle() {

    if (!particleContainer) return;

    const particle =
        document.createElement("div");

    particle.className =
        "particle";

    particle.textContent =
        particleSymbols[
            Math.floor(
                Math.random() *
                particleSymbols.length
            )
        ];

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.fontSize =
        (10 + Math.random() * 18) + "px";

    const duration =
        7 + Math.random() * 8;

    particle.style.animationDuration =
        duration + "s";

    particleContainer.appendChild(
        particle
    );

    setTimeout(() => {

        particle.remove();

    }, duration * 1000);
}


// New floating heart every 650ms
setInterval(
    createParticle,
    650
);


/* =====================================================
   3. HEART BURST
===================================================== */

function createHeartBurst() {

    if (!particleContainer) return;

    const symbols = [
        "❤️",
        "💕",
        "💖",
        "💗",
        "✨"
    ];

    for (let i = 0; i < 25; i++) {

        const heart =
            document.createElement("div");

        heart.className =
            "particle";

        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        heart.style.left =
            "50%";

        heart.style.bottom =
            "50%";

        heart.style.fontSize =
            (14 + Math.random() * 22) + "px";

        heart.style.animationDuration =
            (2 + Math.random() * 2) + "s";

        particleContainer.appendChild(
            heart
        );

        setTimeout(() => {

            heart.remove();

        }, 4000);
    }
}


/* =====================================================
   4. CLICK → HEART
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        // Button/video ကိုနှိပ်ရင်
        // extra heart မထွက်စေဘူး
        if (
            event.target.closest("button") ||
            event.target.closest("input") ||
            event.target.closest("audio")
        ) {
            return;
        }

        createClickHeart(
            event.clientX,
            event.clientY
        );
    }
);


function createClickHeart(x, y) {

    const heart =
        document.createElement("div");

    heart.className =
        "click-heart";

    const symbols = [
        "❤️",
        "💕",
        "💗",
        "✨"
    ];

    heart.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    heart.style.left =
        x + "px";

    heart.style.top =
        y + "px";

    heart.style.setProperty(
        "--x",
        `${Math.random() * 100 - 50}px`
    );

    document.body.appendChild(
        heart
    );

    setTimeout(() => {

        heart.remove();

    }, 1200);
}


/* =====================================================
   5. PREMIUM MUSIC PLAYER
===================================================== */

const audio =
    document.getElementById(
        "loveAudio"
    );

const playBtn =
    document.getElementById(
        "playBtn"
    );

const progress =
    document.getElementById(
        "progress"
    );

const volume =
    document.getElementById(
        "volume"
    );

const currentTime =
    document.getElementById(
        "currentTime"
    );

const duration =
    document.getElementById(
        "duration"
    );

const musicCard =
    document.querySelector(
        ".music-card"
    );

const playingText =
    document.getElementById(
        "playingText"
    );


/* Format time */

function formatTime(seconds) {

    if (
        isNaN(seconds) ||
        !isFinite(seconds)
    ) {
        return "00:00";
    }

    const minutes =
        Math.floor(
            seconds / 60
        );

    const secs =
        Math.floor(
            seconds % 60
        );

    return (
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(secs)
            .padStart(2, "0")
    );
}


/* Play / Pause */

if (playBtn && audio) {

    playBtn.addEventListener(
        "click",
        function () {

            if (audio.paused) {

                audio.play()
                    .catch(error => {

                        console.log(
                            "Music play blocked:",
                            error
                        );

                        if (playingText) {

                            playingText.textContent =
                                "🎵 Play ကို ထပ်နှိပ်ပေးပါ ❤️";
                        }

                    });

            } else {

                audio.pause();

            }

        }
    );
}


/* Music started */

if (audio) {

    audio.addEventListener(
        "play",
        function () {

            if (playBtn) {
                playBtn.textContent =
                    "❚❚";
            }

            if (musicCard) {

                musicCard.classList.add(
                    "playing"
                );
            }

            if (playingText) {

                playingText.textContent =
                    "✨ Playing for you... ❤️";
            }

            document.title =
                "♪ Playing for You ❤️";
        }
    );


    /* Music paused */

    audio.addEventListener(
        "pause",
        function () {

            if (playBtn) {
                playBtn.textContent =
                    "▶";
            }

            if (musicCard) {

                musicCard.classList.remove(
                    "playing"
                );
            }

            if (playingText) {

                playingText.textContent =
                    "✨ Paused... ❤️";
            }

            document.title =
                "For You ❤️";
        }
    );


    /* Metadata loaded */

    audio.addEventListener(
        "loadedmetadata",
        function () {

            if (progress) {

                progress.max =
                    audio.duration;
            }

            if (duration) {

                duration.textContent =
                    formatTime(
                        audio.duration
                    );
            }
        }
    );


    /* Progress */

    audio.addEventListener(
        "timeupdate",
        function () {

            if (progress) {

                progress.value =
                    audio.currentTime;
            }

            if (currentTime) {

                currentTime.textContent =
                    formatTime(
                        audio.currentTime
                    );
            }
        }
    );


    /* Song ended */

    audio.addEventListener(
        "ended",
        function () {

            if (playBtn) {

                playBtn.textContent =
                    "▶";
            }

            if (musicCard) {

                musicCard.classList.remove(
                    "playing"
                );
            }

            if (playingText) {

                playingText.textContent =
                    "💖 Hope you enjoyed it...";
            }

            document.title =
                "Hope you liked it ❤️";

            createHeartBurst();
        }
    );
}


/* =====================================================
   6. PROGRESS BAR
===================================================== */

if (progress && audio) {

    progress.addEventListener(
        "input",
        function () {

            audio.currentTime =
                Number(
                    progress.value
                );
        }
    );
}


/* =====================================================
   7. VOLUME
===================================================== */

if (volume && audio) {

    // Default volume
    audio.volume =
        Number(volume.value);

    volume.addEventListener(
        "input",
        function () {

            audio.volume =
                Number(volume.value);
        }
    );
}


/* =====================================================
   8. BACK 10 SECONDS
===================================================== */

const backBtn =
    document.getElementById(
        "backBtn"
    );

if (backBtn && audio) {

    backBtn.addEventListener(
        "click",
        function () {

            audio.currentTime =
                Math.max(
                    0,
                    audio.currentTime - 10
                );
        }
    );
}


/* =====================================================
   9. FORWARD 10 SECONDS
===================================================== */

const forwardBtn =
    document.getElementById(
        "forwardBtn"
    );

if (forwardBtn && audio) {

    forwardBtn.addEventListener(
        "click",
        function () {

            if (
                isFinite(
                    audio.duration
                )
            ) {

                audio.currentTime =
                    Math.min(
                        audio.duration,
                        audio.currentTime + 10
                    );
            }
        }
    );
}


/* =====================================================
   10. SURPRISE BUTTON
===================================================== */

function openSurprise() {

    const message =
        document.getElementById(
            "hiddenMessage"
        );

    const gift =
        document.getElementById(
            "gift"
        );

    if (!message) return;

    if (
        message.classList.contains(
            "show"
        )
    ) {
        return;
    }

    if (gift) {

        gift.style.animation =
            "none";

        gift.style.transform =
            "scale(1.3)";

        setTimeout(() => {

            gift.style.transform =
                "scale(1)";

        }, 250);
    }

    setTimeout(() => {

        message.classList.add(
            "show"
        );

        createHeartBurst();

    }, 300);
}


/* =====================================================
   11. LOVE TIMER
=====================================================

   ဒီ Date ကို ကိုယ်တိုင်ပြောင်းပါ။

   ဥပမာ:
   2025-01-01T00:00:00

===================================================== */

const startDate =
    new Date(
        "2025-01-01T00:00:00"
    );


function updateLoveTimer() {

    const now =
        new Date();

    let difference =
        now.getTime()
        -
        startDate.getTime();


    // Future date ဖြစ်ရင် 0 ထားမယ်
    if (difference < 0) {

        difference = 0;
    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400)
            / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600)
            / 60
        );


    const seconds =
        totalSeconds % 60;


    const daysElement =
        document.getElementById(
            "days"
        );

    const hoursElement =
        document.getElementById(
            "hours"
        );

    const minutesElement =
        document.getElementById(
            "minutes"
        );

    const secondsElement =
        document.getElementById(
            "seconds"
        );


    if (daysElement) {

        daysElement.textContent =
            days;
    }

    if (hoursElement) {

        hoursElement.textContent =
            String(hours)
                .padStart(2, "0");
    }

    if (minutesElement) {

        minutesElement.textContent =
            String(minutes)
                .padStart(2, "0");
    }

    if (secondsElement) {

        secondsElement.textContent =
            String(seconds)
                .padStart(2, "0");
    }
}


updateLoveTimer();


setInterval(
    updateLoveTimer,
    1000
);


/* =====================================================
   12. PAGE TITLE
===================================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden
        ) {

            document.title =
                "Come back ❤️";

        } else {

            document.title =
                "For You ❤️";
        }
    }
);


/* =====================================================
   13. CONSOLE MESSAGE
===================================================== */

console.log(
    "%c❤️ Made with Love ❤️",
    `
        color: #ff75a9;
        font-size: 20px;
        font-weight: bold;
    `
);

const CONFIG = {
  recipient: "Nurafiqah",

  // Change this to your own name.
  sender: "Your Name",

  // Change this to the date your story began.
  relationshipStart: "2024-02-14T00:00:00",

  openingMessage:
    "Nurafiqah, some people enter a life quietly and still manage to change its entire meaning. You have become a part of my thoughts, my prayers, my calm, and the kind of future I look forward to. I hope, in every small way, you feel how deeply appreciated you are.",

  celebrationMessage:
    "Thank you for being you, Nurafiqah. I do not promise that every day will be perfect, but I promise that my heart will always try to understand yours, protect your peace, celebrate your dreams, and choose you with sincerity.",

  reasons: [
    {
      title: "The peace you bring",
      text: "There is something about your presence that makes the noise in my mind become quieter. Even on difficult days, the thought of you feels like a place where my heart can rest.",
      icon: "&hearts;"
    },
    {
      title: "Your beautiful heart",
      text: "You carry kindness in the way you speak, care in the way you listen, and warmth in the way you make people feel important. That is a rare kind of beauty.",
      icon: "&#10022;"
    },
    {
      title: "The way you make life feel lighter",
      text: "You remind me that happiness does not always need a grand reason. Sometimes it is a conversation, a laugh, a small memory, or simply knowing you exist.",
      icon: "&#9786;"
    },
    {
      title: "Your strength",
      text: "You may not always see it, but there is courage in you. In the way you keep going, in the way you carry your feelings, and in the way you still choose softness in a hard world.",
      icon: "&#10033;"
    },
    {
      title: "The person I become around you",
      text: "You make me want to be more patient, more honest, more grateful, and more intentional. Loving you feels like learning how to love life more carefully.",
      icon: "&#10045;"
    },
    {
      title: "The future I imagine",
      text: "When I think about tomorrow, it feels warmer when you are in it. Not because I need a perfect future, but because I would be grateful to keep growing through life beside you.",
      icon: "&#8734;"
    }
  ],

  memories: [
    {
      date: "The beginning",
      title: "When you became more than a name",
      text: "Some connections arrive without warning. Slowly, through moments and conversations, you became someone my heart started looking for.",
      icon: "&#9993;"
    },
    {
      date: "The little moments",
      title: "The things you may not realise I remember",
      text: "Your words, your laughter, your mood, the way you react to small things — these are the details that quietly stay with me.",
      icon: "&#10022;"
    },
    {
      date: "The honest truth",
      title: "You matter to me deeply",
      text: "Not only in the exciting moments, but in the ordinary ones too. You matter in the silence, in the distance, in the moments when there are no perfect words.",
      icon: "&#9788;"
    },
    {
      date: "Everything ahead",
      title: "More pages still waiting for us",
      text: "I hope there will be more laughter, more healing, more adventures, and more moments where we look at each other and feel thankful that our paths crossed.",
      icon: "&#10047;"
    }
  ]
};

const $ = (selector) => document.querySelector(selector);

$("#recipientWelcome").textContent = CONFIG.recipient;
$("#recipientHero").textContent = CONFIG.recipient;
$("#senderName").textContent = CONFIG.sender;
$("#celebrationMessage").textContent = CONFIG.celebrationMessage;

const reasonsContainer = $("#reasons");

CONFIG.reasons.forEach((reason, index) => {
  const card = document.createElement("button");

  card.className = "reason";
  card.innerHTML = `
    <span class="number">${String(index + 1).padStart(2, "0")} · ${reason.icon}</span>
    <h3>${reason.title}</h3>
    <span class="tap">Tap to reveal</span>
    <p>${reason.text}</p>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("revealed");
  });

  reasonsContainer.appendChild(card);
});

const timelineContainer = $("#timeline");

CONFIG.memories.forEach((memory) => {
  const item = document.createElement("article");

  item.className = "memory";
  item.innerHTML = `
    <div class="memory-icon">${memory.icon}</div>
    <div class="memory-content">
      <span>${memory.date}</span>
      <h3>${memory.title}</h3>
      <p>${memory.text}</p>
    </div>
  `;

  timelineContainer.appendChild(item);
});

function updateCounter() {
  const start = new Date(CONFIG.relationshipStart).getTime();
  const difference = Math.max(Date.now() - start, 0);

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  $("#days").textContent = days;
  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

function typeMessage(text) {
  const target = $("#typedMessage");
  let index = 0;

  target.textContent = "";

  const typing = setInterval(() => {
    target.textContent += text.charAt(index);
    index += 1;

    if (index >= text.length) {
      clearInterval(typing);
    }
  }, 20);
}

$("#openLetter").addEventListener("click", () => {
  $("#welcome").classList.add("hidden");
  $("#letter").classList.add("visible");

  typeMessage(CONFIG.openingMessage);
  createHeart(window.innerWidth / 2, window.innerHeight * 0.75, 24);
});

function createHeart(
  x = Math.random() * window.innerWidth,
  y = window.innerHeight + 30,
  size
) {
  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.2 ? "\u2665" : "\u2726";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty("--size", `${size || 12 + Math.random() * 18}px`);
  heart.style.setProperty("--duration", `${5 + Math.random() * 5}s`);
  heart.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);

  $("#heartContainer").appendChild(heart);

  setTimeout(() => heart.remove(), 10500);
}

setInterval(() => {
  if ($("#letter").classList.contains("visible")) {
    createHeart();
  }
}, 950);

$("#themeButton").addEventListener("click", () => {
  document.body.classList.toggle("midnight");
});

let audioContext;
let musicInterval;
let musicPlaying = false;

function playTone(frequency, start, duration, volume = 0.035) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(start);
  oscillator.stop(start + duration + 0.05);
}

function playMelody() {
  const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 523.25, 493.88];
  const now = audioContext.currentTime;

  notes.forEach((note, index) => {
    playTone(note, now + index * 0.34, 0.32);

    if (index % 2 === 0) {
      playTone(note / 2, now + index * 0.34, 0.4, 0.018);
    }
  });
}

$("#musicButton").addEventListener("click", () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (musicPlaying) {
    clearInterval(musicInterval);
    musicPlaying = false;
    $("#musicButton").innerHTML = "&#9835;";
  } else {
    audioContext.resume();
    playMelody();

    musicInterval = setInterval(playMelody, 3800);
    musicPlaying = true;
    $("#musicButton").textContent = "❚❚";
  }
});

const noButton = $("#noButton");
let noAttempts = 0;

function moveNoButton() {
  noAttempts += 1;

  const area = $("#answerArea");
  const maxX = Math.max(area.clientWidth - noButton.offsetWidth, 0);
  const maxY = 55;

  noButton.style.position = "absolute";
  noButton.style.left = `${Math.random() * maxX}px`;
  noButton.style.top = `${Math.random() * maxY}px`;

  const messages = [
    "That button seems a little shy...",
    "Are you absolutely sure?",
    "It is trying very hard to escape.",
    "Okay, this is officially a sign."
  ];

  noButton.textContent = messages[Math.min(noAttempts - 1, messages.length - 1)];
}

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("click", moveNoButton);

$("#yesButton").addEventListener("click", () => {
  $("#celebration").classList.add("show");
  launchConfetti();

  for (let i = 0; i < 16; i += 1) {
    setTimeout(() => {
      createHeart(
        Math.random() * window.innerWidth,
        window.innerHeight,
        18 + Math.random() * 26
      );
    }, i * 90);
  }
});

$("#closeCelebration").addEventListener("click", () => {
  $("#celebration").classList.remove("show");
});

const canvas = $("#confetti");
const context = canvas.getContext("2d");

let particles = [];
let animationFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
  cancelAnimationFrame(animationFrame);

  particles = Array.from({ length: 190 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.45,
    size: 5 + Math.random() * 8,
    speed: 2 + Math.random() * 5,
    drift: -2 + Math.random() * 4,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -0.15 + Math.random() * 0.3,
    color: ["#ff4f7b", "#ffd885", "#ffffff", "#ff93b1", "#b896ff"][
      Math.floor(Math.random() * 5)
    ]
  }));

  animateConfetti();
}

function animateConfetti() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.y += particle.speed;
    particle.x += particle.drift + Math.sin(particle.y * 0.02);
    particle.rotation += particle.rotationSpeed;

    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);
    context.fillStyle = particle.color;

    context.fillRect(
      -particle.size / 2,
      -particle.size / 2,
      particle.size,
      particle.size * 0.6
    );

    context.restore();
  });

  particles = particles.filter((particle) => particle.y < canvas.height + 30);

  if (particles.length) {
    animationFrame = requestAnimationFrame(animateConfetti);
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}
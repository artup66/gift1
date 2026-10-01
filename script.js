// ================= HEART EFFECT =================
window.heartLoop = setInterval(() => {
  let heart = document.createElement("div");
  heart.className = "heart";

  // 🔥 FOTO RANDOM + HEART
  let photos = ["foto1.png", "foto2.png", "foto3.png", "foto4.png"];

  if (Math.random() < 0.3) {
    let img = document.createElement("img");
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.className = "floating-photo";

    img.style.width = (30 + Math.random()*30) + "px";

    heart.appendChild(img);
  } else {
    let hearts = ["💗","💖","💙","💘"];
    heart.innerHTML = hearts[Math.floor(Math.random()*hearts.length)];
  }

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (16 + Math.random()*20) + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}, 700);


// ================= MUSIC FIX =================
let music = document.getElementById("music");
let musicStarted = false;

document.addEventListener("click", () => {
  if (!musicStarted) {
    music.muted = false;
    music.volume = 0;
    music.play();

    let fade = setInterval(() => {
      if (music.volume < 0.5) {
        music.volume += 0.05;
      } else {
        clearInterval(fade);
      }
    }, 200);

    musicStarted = true;
  }
});


// ================= CENTER TEXT =================
const allTexts = document.querySelectorAll(".screen p");
const mainText = document.getElementById("mainText");

let indexText = 0;

const messages = Array.from(allTexts).map(p =>
  p.getAttribute("data-text")
);

// hide semua screen lama
document.querySelectorAll(".screen").forEach(s => {
  s.style.display = "none";
});


// ================= SHOW TEXT =================
function showText(i) {
  mainText.classList.remove("show");

  setTimeout(() => {
    mainText.innerText = messages[i];
    mainText.classList.add("show");

    // 🔥 ENDING EFFECT
    if (i === messages.length - 1) {

      document.body.style.transition = "background 2s ease";
      
      mainText.style.transform = "translate(-50%, -50%) scale(1.05)";
      mainText.style.transition = "all 1.5s ease";
      mainText.style.textShadow = "0 0 30px rgba(255,255,255,0.6)";

      document.body.style.background = "#000";

      // 💖 stop heart smooth
      const hearts = document.querySelectorAll(".heart");
      hearts.forEach(h => {
        h.style.transition = "opacity 1s ease";
        h.style.opacity = "0";
      });

      setTimeout(() => {
        clearInterval(window.heartLoop);
      }, 1000);

      // 🎧 music fade out
      let fadeOut = setInterval(() => {
        if (music.volume > 0.1) {
          music.volume -= 0.02;
        } else {
          clearInterval(fadeOut);
        }
      }, 200);
    }

  }, 250);
}


// ================= CLICK CONTROL =================
let isSwitching = false;

document.addEventListener("click", () => {
  if (isSwitching) return;
  if (indexText >= messages.length - 1) return;

  isSwitching = true;

  setTimeout(() => {
    setTimeout(() => {
      indexText++;
      showText(indexText);

      setTimeout(() => {
        isSwitching = false;
      }, 600);

    }, delays[indexText] || 0); // ✅ delay per scene

  }, 200);
});


// ================= FIRST LOAD =================
showText(indexText);

const delays = [0,0,0,500,0,0,800,0,0,0,1000,0,0]; // ms per scene
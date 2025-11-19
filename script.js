const treeEl = document.getElementById("tree");
const lyricsEl = document.getElementById("lyrics");
const audioEl = document.getElementById("audio");

const height = 12;
const colors = ["#ff0000","#ff6600","#ffff00","#00ff00","#00ffff","#0066ff","#9900ff","#ff00ff","#ffffff","#ff99cc"];

const lyrics = [
  { text: "A face on a lover,", time: 2 },
  { text: "With a fire in his heart,", time: 4 },
  { text: "A man under cover,", time: 6 },
  { text: "But you tore me apart,", time:7.5 },
  { text: "Oh oh", time: 10.5 },
  { text: "Now I've found a real love,", time: 11.5 },
  { text: "You'll never fool me again.", time: 14 },
    { text: "Last Christmas, I gave you my heart,", time: 15.5 },
  { text: "But the very next day you gave it away,", time: 18.5 },
];


function drawTree() {
  const width = height * 2 - 1;
  let html = "";

  for (let i = 0; i < height; i++) {
    const stars = 2*i+1;
    const spaces = (width - stars)/2;
    html += " ".repeat(spaces);
    for (let s = 0; s < stars; s++) {
      const color = colors[Math.floor(Math.random()*colors.length)];
      html += `<span class="blink" style="color:${color}; text-shadow:0 0 6px ${color};">*</span>`;
    }
    html += "\n";
  }

  const trunkWidth = 3;
  const trunkSpaces = Math.floor((width - trunkWidth)/2);
  for (let i=0;i<3;i++){
    html += " ".repeat(trunkSpaces);
    html += `<span style="color:#8B4513; text-shadow:0 0 6px #a0522d;">###</span>\n`;
  }

  treeEl.innerHTML = html;
}

function displayLyricsSync() {
  let currentLine = 0;
  audioEl.addEventListener("timeupdate", () => {
    while(currentLine < lyrics.length && audioEl.currentTime >= lyrics[currentLine].time){
      const lineDiv = document.createElement("div");
      lineDiv.textContent = lyrics[currentLine].text;
      lyricsEl.appendChild(lineDiv);
      currentLine++;
    }
  });
}


function startAudioAndLyrics() {
  audioEl.play().then(() => {
    displayLyricsSync();
  }).catch(() => {
    console.log("Autoplay blocat, apasă ENTER sau click pentru audio.");
  });
}


document.body.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    startAudioAndLyrics();
  }
}, { once: true });

document.body.addEventListener("click", () => {
  startAudioAndLyrics();
}, { once: true });


setInterval(drawTree, 400);
drawTree();

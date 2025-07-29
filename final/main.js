let currentIndex = 0;
const totalScripts = 24;
const displayElement = document.getElementById("ascii-art");

function loadAsciiArt(index) {
  const functionName = `season_${index}_ascii`;
  if (typeof window[functionName] === "function") {
    displayElement.innerHTML = window[functionName]();
    highlightCharacters();

  } else {
    displayElement.innerText = `season_${index}.js が読み込まれていません`;
  }
}

function nextScene() {
  currentIndex = (currentIndex + 1) % totalScripts;
  loadAsciiArt(currentIndex);
}

function prevScene() {
  currentIndex = (currentIndex - 1 + totalScripts) % totalScripts;
  loadAsciiArt(currentIndex);
}

let isScrolling = false;

window.addEventListener("wheel", (event) => {
  if (isScrolling) return;
  isScrolling = true;

  if (event.deltaY < 0) {
    nextScene();
  } else {
    prevScene();
  }

  setTimeout(() => {
    isScrolling = false;
  }, 200);
});


// 初期表示
loadAsciiArt(currentIndex);

function highlightCharacters() {
  const spans = displayElement.querySelectorAll("span");
  spans.forEach(span => {
    span.innerHTML = span.innerText
      .replace(/木/g, '<span class="tree">幹</span>')
      .replace(/葉/g, '<span class="leaf">葉</span>')
      .replace(/は/g, '<span class="leaf2">葉</span>')
      .replace(/赤/g, '<span class="red">赤</span>')
      .replace(/お/g, '<span class="ore">橙</span>')
      .replace(/空/g, '<span class="sky">空</span>')
      .replace(/水/g, '<span class="sky">水</span>')
      .replace(/雲/g, '<span class="cloud">雲</span>')
      .replace(/鳥/g, '<span class="bird">鳥</span>')
      .replace(/桜/g, '<span class="sakura">桜</span>')
      .replace(/さ/g, '<span class="sakura2">桜</span>')
      .replace(/き/g, '<span class="yellow">花</span>')
      .replace(/地/g, '<span class="ground">地</span>');
  });
}

function adjustFontSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 横 80文字, 縦 24行に収まるよう調整（標準的なアスキーアート比率）
  const charWidth = width / 80;
  const charHeight = height / 24;

  // 縦横どちらか狭い方に合わせる
  const fontSize = Math.min(charWidth, charHeight);

  // 画面に合わせてフォントサイズ設定
  displayElement.style.fontSize = `${fontSize}px`;
  displayElement.style.lineHeight = `${fontSize * 1.1}px`;
}

// 初期表示とウィンドウリサイズ時に適用
window.addEventListener("resize", adjustFontSize);
adjustFontSize(); // 起動時にも呼び出す

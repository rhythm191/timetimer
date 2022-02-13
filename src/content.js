let timerMinutes = 0;
let startTime = new Date().getTime();

(function () {
  let wrapper = document.getElementById("timetimer-wrapper");

  if (wrapper !== null) {
    wrapper.remove();
  }

  wrapper = document.createElement("div");
  wrapper.id = "timetimer-wrapper";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.justifyContent = "flex-start";
  wrapper.style.alignItems = "center";
  wrapper.style.position = "fixed";
  wrapper.style.left = "calc(100vw - 200px)";
  wrapper.style.top = 0;
  wrapper.style.width = "200px";
  wrapper.style.height = "200px";
  wrapper.style.margin = 0;
  wrapper.style.padding = 0;
  wrapper.style.zIndex = 3939;
  wrapper.style.background = "#fff";
  wrapper.style.border = "1px solid #333";

  // タイマーサークルを生成
  const circle = document.createElement("div");
  circle.id = "timetimer-circle";
  circle.style.boxSizing = "border-box";
  circle.style.position = "relative";
  circle.style.padding = "10px 25px";
  circle.style.width = "150px";
  circle.style.height = "150px";
  circle.style.margin = "8px 0 8px";
  circle.style.borderRadius = "50%";

  // タイマーの初期角度を計算
  chrome.storage.sync.get("minutesValue", ({ minutesValue }) => {
    timerMinutes = minutesValue;
    startTime = new Date().getTime();
    const minutesDeg = ((60 - minutesValue) / 60) * 360;
    circle.style.background = `conic-gradient(#fff ${minutesDeg}deg, #fb343c ${minutesDeg}deg 360deg)`;

    requestAnimationFrame(animationTimer);
  });

  wrapper.append(circle);

  // closeボタン
  const close = document.createElement("button");
  close.id = "timetimer-close";
  close.innerText = "close";
  close.style.boxSizing = "border-box";
  close.style.padding = "4px 8px";
  close.style.background = "#fff";
  close.style.border = "1px solid #333";
  close.style.borderRadius = "4px";

  close.addEventListener("click", () => {
    wrapper.remove();
  });

  wrapper.append(close);

  document.querySelector("body").append(wrapper);
})();

// タイマーのアニメーション
function animationTimer() {
  const circle = document.getElementById("timetimer-circle");

  if (circle === null) {
    return;
  }

  const now = new Date().getTime();
  const passedTime = (now - startTime) / 60000;
  const minutesDeg = ((60 - (timerMinutes - passedTime)) / 60) * 360;

  circle.style.background = `conic-gradient(#fff ${minutesDeg}deg, #fb343c ${minutesDeg}deg 360deg)`;

  requestAnimationFrame(animationTimer);
}

// タイマー表示を削除する
function exiTtimetimerMode() {
  const wrapper = document.getElementById("timetimer-wrapper");

  if (wrapper !== null) {
    wrapper.remove();
  }
}

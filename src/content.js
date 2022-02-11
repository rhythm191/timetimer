(function () {
  if (document.getElementById("mamemaki-wrapper") !== null) {
    exitMamemakiMode();
    return;
  }

  // 豆まきの土台を表示
  const wrapper = document.createElement("div");
  wrapper.id = "mamemaki-wrapper";
  wrapper.style.position = "fixed";
  wrapper.style.left = 0;
  wrapper.style.top = 0;
  wrapper.style.width = "100vw";
  wrapper.style.height = "100vh";
  wrapper.style.margin = 0;
  wrapper.style.padding = 0;
  wrapper.style.cursor = "crosshair";
  wrapper.style.zIndex = 2323;

  // メッセージを表示
  const message = document.createElement("p");
  message.id = "mamemaki-message";
  message.innerHTML = "豆まきモードです。ESCで終了します。";
  message.style.position = "fixed";
  message.style.right = 0;
  message.style.top = 0;
  message.style.padding = "8px 8px";
  message.style.margin = 0;
  message.style.border = "1px solid #000";
  message.style.background = "#fff";
  message.style.font = `16px sans-serif;`;

  wrapper.append(message);

  // クリック時に豆まきをする
  wrapper.addEventListener("click", function (event) {
    var soyX = event.offsetX; //X座標
    var soyY = event.offsetY; //Y座標

    let soyImg = document.createElement("img");
    soyImg.src = chrome.runtime.getURL(`images/soy.png`);
    soyImg.style.position = "fixed";
    soyImg.style.left = `${soyX}px`;
    soyImg.style.top = `${soyY}px`;
    soyImg.style.width = "20px";
    soyImg.style.height = "20px";
    soyImg.style.transformOrigin = "center";

    soyImg.animate(
      [
        { transform: "translate(0, 300px)", offest: 0 },
        {
          transform: " translate(0, 0) rotate(45deg)",
          opacity: 1,
          offest: 0.9,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
        {
          opacity: 0,
          offest: 1,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
      ],
      { duration: 240, fill: "forwards" }
    );

    wrapper.append(soyImg);

    const effectImg = document.createElement("img");
    effectImg.src = chrome.runtime.getURL(`images/effect.png`);
    effectImg.style.position = "absolute";
    effectImg.style.left = `${soyX - 32}px`;
    effectImg.style.top = `${soyY - 32}px`;
    effectImg.style.width = "64px";
    effectImg.style.height = "64px";
    effectImg.style.transformOrigin = "center";

    effectImg.animate(
      { opacity: [1, 0] },
      { delay: 300, duration: 100, fill: "forwards" }
    );

    wrapper.append(effectImg);
  });

  document.querySelector("body").append(wrapper);

  window.addEventListener("keydown", captureEscapeEvent);
})();

function captureEscapeEvent(event) {
  if (event.key === "Escape") {
    exitMamemakiMode();
  }
  window.removeEventListener("keydown", captureEscapeEvent);
}

function exitMamemakiMode() {
  const wrapper = document.getElementById("mamemaki-wrapper");

  if (wrapper !== null) {
    wrapper.remove();
  }
}

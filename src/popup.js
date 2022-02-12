const timerForm = document.getElementById("timer-form");
const minutes = document.getElementById("minutes");

timerForm.addEventListener("submit", async (e) => {
  console.log(minutes);
  console.log(minutes.value);

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.set({ minutesValue: minutes.value });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });

  window.close();

  return false;
});

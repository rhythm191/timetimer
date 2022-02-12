const timerForm = document.getElementById("timer-form");
const minutes = document.getElementById("minutes");

timerForm.addEventListener("submit", function (event) {
  console.log(minutes);
  console.log(minutes.value);
  alert(`yeah ${minutes.value}`);

  return false;
});

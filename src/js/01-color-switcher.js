const pageBody = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function handlerStartBtn() {
  intervalId = setInterval(() => {
    pageBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
  toggleBtnON(true, false);
}

function handlerStopBtn() {
  clearInterval(intervalId);
  toggleBtnON(false, true);
}

startBtn.addEventListener('click', handlerStartBtn);
stopBtn.addEventListener('click', handlerStopBtn);

function toggleBtnON(onStart, onStop) {
  startBtn.disabled = onStart;
  stopBtn.disabled = onStop;
}

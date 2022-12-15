// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timerInput = document.querySelector('#datetime-picker');
let userTime = null;
let curentTime = null;
let timerId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    checkValidData(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function checkValidData(time) {
  userTime = time.getTime();
  curentTime = Date.now();
  console.log(userTime);
  console.log(curentTime);
  if (userTime < curentTime) {
    alert('Всіберете дату в будущем');
  } else {
    startBtn.disabled = false;
  }
}

function stratTimer() {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    curentTime = Date.now();
    let deltaTime = userTime - curentTime;
    if (userTime <= curentTime) {
      clearInterval(timerId);
      return;
    } else {
      let intervalTime = convertMs(deltaTime);
      updateFaceClock(intervalTime);
    }
  }, 1000);
}

function updateFaceClock({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', stratTimer);

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('form');
const startBtn = document.querySelector('button[type="submit"]');

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(form.elements.delay.value);
  let delayStep = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

  if (delay < 0 || delayStep < 0 || amount <= 0) {
    // alert('Fill in the fields');
    Notiflix.Notify.failure('Input valid values!!!');
    form.reset();
    return;
  }

  let totalDelay = delay + delayStep * amount;

  // startBtn.setAttribute('disabled', '');

  startBtn.disabled = true;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay);
    delay += delayStep;
  }

  setTimeout(() => {
    // startBtn.removeAttribute('disabled');
    startBtn.disabled = false;
  }, totalDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  setTimeout(() => {
    const promise = new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    });
    promise.then(success).catch(error);
  }, delay);
}

const success = resolveValue => {
  Notiflix.Notify.success(resolveValue);
};

const error = errorValue => {
  Notiflix.Notify.failure(errorValue);
};

form.addEventListener('submit', onFormSubmit);

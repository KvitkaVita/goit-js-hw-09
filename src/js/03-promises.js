const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ positon, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const formEl = evt.currentTarget.elements;
  let delay = Number(formEl.delay.value);
  const delayStep = Number(formEl.step.value);
  const amount = Number(formEl.amount.value);

  for (let i = 1; i < amount; i += 1) {
    delay += delayStep;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

//   const {
//     elements: { delay, step, amount },
//   } = evt.curentTarget;
// }

// const dataUser = {
//   delay: delay.value,
//   step: step.value,
//   amount: amount.value,
// };

// evt.currentTarget.reset();

// for (let i = 0; i < Number(dataUser.amount); i++) {
//   console.log(createPromise);
// }

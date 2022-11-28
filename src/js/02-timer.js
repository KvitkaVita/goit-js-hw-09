import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const selector = document.querySelector('#datetime-picker');

selector.addEventListener('click', flatpickr);
startBtn.addEventListener('click', convertMs);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] - new Date() < 0) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', dataTimer(selectedDates[0]));

      flatpickr("#datetime-picker", options) 

      function dataTimer(evt) {
        let timerId = null;
        timerId = setInterval(() => {
          let diff = evt - new Date();
          let countTime = convertMs(diff);

          dataDay.textContext = countTime.days;
          dataHours.textContext = countTime.hours;
          dataMinutes.textContext = countTime.Minutes;
          dataSeconds.textContext = countTime.seconds;
        }, 1000);
      }
    }
  },
};


// flatpickr(test,
// {
// enableTime: true,
// time_24hr: true,
// defaultDate: new Date(),
// minuteIncrement: 1,
// onClose(selectedDates) {
// console.log(selectedDates[0]);
// },
// });

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

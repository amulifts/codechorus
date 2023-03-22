const running = document.querySelector('.running');
const opacity03 = document.querySelector('#opacity-03');
const opacity1 = document.querySelector('#opacity-1');
const duration05 = document.querySelector('#duration-05');
const duration1 = document.querySelector('#duration-1');
const duration07 = document.querySelector('#duration-07');

opacity03.addEventListener('click', function () {
  running.style.setProperty('--color', 'rgba(93, 91, 91, .3)');
});

opacity1.addEventListener('click', function () {
  running.style.setProperty('--color', 'rgba(93, 91, 91, 1)');
});

duration05.addEventListener('click', function () {
  running.style.setProperty('--duration', '.5s');
});

duration1.addEventListener('click', function () {
  running.style.setProperty('--duration', '1s');
});

duration07.addEventListener('click', function () {
  running.style.setProperty('--duration', '.7s');
});
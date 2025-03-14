const start = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const board = document.querySelector('#board');
const timer = document.querySelector('#time');

let time = 0;
let interval = null;
let score = 0;
let selectedTime = 0;

start.addEventListener('click', () => {
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        selectedTime = parseInt(event.target.getAttribute('data-time'));
        time = selectedTime;
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('restart')) {
        restartGame();
    }
});

function startGame() {
    score = 0;
    setTimer(time);
    interval = setInterval(decreaseTime, 1000);
    createRandomCircle();
}

function finishGame() {
    clearInterval(interval);

    let bestScoreKey = `bestScore_${selectedTime}`;
    let bestScore = localStorage.getItem(bestScoreKey) || 0;
    if (score > bestScore) {
        localStorage.setItem(bestScoreKey, score);
        bestScore = score;
    }

    board.innerHTML = `<div class="score-container">
        <h1>Score: <span class='primary'>${score}</span></h1>
        <h2 class="best-score">Best Score (${selectedTime}s): ${bestScore}</h2>
        <button class="restart">Restart</button>
        </div>`;
        
    timer.parentNode.innerHTML = '';
}

function restartGame() {
    screens.forEach(screen => screen.classList.remove('up'));
    board.innerHTML = '';
    timer.parentNode.innerHTML = '<h3>Remaining Time <span id="time">00:00</span></h3>';
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        --time;
        setTimer(time);
    }
}

function setTimer(value) {
    timer.innerHTML = `00:${value < 10 ? '0' + value : value}`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 50);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);

}

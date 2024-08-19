// מצב המשחק
let gameState = {
    isPlaying: false,
    score: 0,
    time: 0,
    intervalId: null
};

// אלמנטים של המשחק
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const instructionElement = document.getElementById('instruction');
const circlesContainer = document.getElementById('circles');

// התחלת המשחק
function startGame() {
    gameState.isPlaying = true;
    gameState.score = 0;
    gameState.time = 0;
    
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    
    updateScore();
    startTimer();
    createCircles();
}

// עדכון הניקוד
function updateScore() {
    scoreElement.textContent = `נקודות: ${gameState.score}`;
}

// התחלת הטיימר
function startTimer() {
    gameState.intervalId = setInterval(() => {
        gameState.time++;
        timerElement.textContent = `זמן: ${gameState.time} שניות`;
    }, 1000);
}

// יצירת מעגלים
function createCircles() {
    circlesContainer.innerHTML = '';
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    
    for (let i = 0; i < 5; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.backgroundColor = colors[i];
        circle.onclick = () => clickCircle(colors[i]);
        circlesContainer.appendChild(circle);
    }
    
    instructionElement.textContent = `לחץ על העיגול ה${colors[Math.floor(Math.random() * colors.length)]}`;
}

// לחיצה על מעגל
function clickCircle(color) {
    if (color === instructionElement.textContent.split('ה')[1]) {
        gameState.score += 10;
        updateScore();
        createCircles();
    } else {
        alert('טעות! נסה שוב.');
    }
}

// הוספת מאזין אירועים לכפתור ההתחלה
document.querySelector('#start-screen button').addEventListener('click', startGame);

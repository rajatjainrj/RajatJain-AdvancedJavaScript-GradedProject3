import TypingGame from "./TypingGame.js"
import {
    typingLines,
    GameState,
    GAME_TIME_IN_SEC,
    convertArrayToString,
    splitStringIntoCharStringArray
} from './constants.js'

let wpmBox = document.getElementById("wpm");
let wpmStat = document.getElementById("wpm-stat");

let cpmBox = document.getElementById("cpm");
let cpmStat = document.getElementById("cpm-stat");

let errorsStat = document.getElementById("error-stat");

let timeStat = document.getElementById("time-stat");

let accuracyStat = document.getElementById("accuracy-stat");

let targetTextEl = document.getElementById("target-text");

let textInputEl = document.getElementById("text-input");

let restartBtn = document.getElementById("restart-btn");

let statsEl = document.getElementById("stats");

let game = new TypingGame();

let initiateNewGame = function () {
    wpmBox.classList.add("hidden");
    cpmBox.classList.add("hidden");
    restartBtn.classList.add("hidden");
    game = new TypingGame();
    wpmStat.innerText = game.wpm;
    cpmStat.innerText = game.cpm;
    errorsStat.innerText = game.errorCount;
    timeStat.innerText = `${game.time}s`;
    accuracyStat.innerText = game.accuracy;
    targetTextEl.innerHTML = convertArrayToString(...game.currentLine);
    textInputEl.innerText = '';
    textInputEl.value = '';
    addEvents()
    // console.log(game);
}
// console.log(game);
initiateNewGame();

function addEvents() {
    textInputEl.addEventListener('keypress', function (event) {
        if (game.state === GameState.STOPPED && !game.isFinished) {
            startGame();
        }

        if (!game.isFinished && game.state === GameState.STARTED) {
            // console.log(event.key);
            // console.log(textInputEl.value);
            checkCharacterInput(event.key);
        }
    })

    textInputEl.addEventListener("keydown", function (event) {
        if (event.key === 'Backspace' ||
            event.key === 'Delete' ||
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowRight' ||
            event.key === 'ArrowUp' ||
            event.key === 'ArrowDown'
        ) {
            event.preventDefault();
        }
    });
}

function startGame() {
    game.state = GameState.STARTED;

    setTimeout(() => {
        game.isFinished = true;
        console.log("Game Finished");
        clearInterval(timerId);
        incrementTimer();
        updateWpmAndCpm();
        restartBtn.classList.remove("hidden");
        restartBtn.onclick = () => initiateNewGame();
        targetTextEl.innerHTML = "Click on restart to start a new game."
    }, GAME_TIME_IN_SEC * 1000);

    const timerId = setInterval(() => {
        incrementTimer();
    }, 1000);
}

function incrementTimer() {
    game.time++;
    timeStat.innerText = `${game.time}s`;
}

function updateWpmAndCpm() {
    let wpm = game.totalWordCount / (game.time / 60);
    game.wpm = wpm;
    wpmStat.innerText = wpm + "";
    wpmBox.classList.remove("hidden");

    let cpm = game.totalCharAttempts / (game.time / 60);
    game.cpm = cpm;
    cpmStat.innerText = cpm + "";
    cpmBox.classList.remove("hidden");
}

function checkCharacterInput(key) {
    let currentLine = typingLines[game.currentLineIndex];
    let currentChar = currentLine.charAt(game.currentCharIndexInLine).toLowerCase();
    if (currentChar === key || currentChar === key.toLowerCase()) {
        console.log("Correct Key");
        game.currentLine[game.currentCharIndexInLine] = `<span class="bold">${game.currentLine[game.currentCharIndexInLine]}</span>`
    } else {
        console.log("Incorrect Key");
        updateErrorCount();
        game.currentLine[game.currentCharIndexInLine] = `<span class="error-red">${game.currentLine[game.currentCharIndexInLine]}</span>`
    }
    if (currentChar === " " || currentChar === ".") {
        game.totalWordCount++;
    }
    calculateAndSetAccuracy();
    if (game.currentCharIndexInLine === currentLine.length - 1) {
        changeLine();
    } else {
        game.currentCharIndexInLine++;
    }
    game.totalCharAttempts++;
    targetTextEl.innerHTML = convertArrayToString(...game.currentLine);
    console.log(game);
}

function updateErrorCount() {
    game.errorCount++;
    errorsStat.innerText = game.errorCount;
}

function calculateAndSetAccuracy() {
    game.accuracy = Math.round(((game.totalCharAttempts - game.errorCount) / game.totalCharAttempts) * 100);
    accuracyStat.innerText = game.accuracy;
}

function changeLine() {
    if (game.currentLineIndex === typingLines.length - 1) {
        game.currentLineIndex = 0;
    } else {
        game.currentLineIndex++;
    }
    game.currentLine = splitStringIntoCharStringArray(typingLines[game.currentLineIndex]);
    game.currentCharIndexInLine = 0;
}

window.onresize = window.onload = function () {
    let size = window.screen.width;
    let cloneStats = document.getElementById("stats").cloneNode(true);
    let cloneTargetText = document.getElementById("target-text").cloneNode(true);
    let cloneTextInput = document.getElementById("text-input").cloneNode(true);

    document.getElementById("stats").remove();
    document.getElementById("target-text").remove();
    document.getElementById("text-input").remove();
    if (size < 800) {
        document.getElementById('heading-m').after(cloneStats);
        document.getElementById('target-text-holder-m').after(cloneTargetText);
        document.getElementById('text-input-holder-m').after(cloneTextInput);
    }
    if (size > 800) {
        document.getElementById('heading').after(cloneStats);
        document.getElementById('target-text-holder').after(cloneTargetText);
        document.getElementById('text-input-holder').after(cloneTextInput);
    }
    statsEl = document.getElementById("stats");
    targetTextEl = document.getElementById("target-text");
    textInputEl = document.getElementById("text-input");
    wpmBox = document.getElementById("wpm");
    wpmStat = document.getElementById("wpm-stat");
    cpmBox = document.getElementById("cpm");
    cpmStat = document.getElementById("cpm-stat");
    errorsStat = document.getElementById("error-stat");
    timeStat = document.getElementById("time-stat");
    accuracyStat = document.getElementById("accuracy-stat");
    addEvents();
}



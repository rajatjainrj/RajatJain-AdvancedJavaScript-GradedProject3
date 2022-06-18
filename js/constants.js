const typingLines = [
    'You do not find the happy life. You make it.',
    'The most wasted of days is one without laughter.',
    'Make each day your masterpiece.',
    'Happiness is not by chance, but by choice.',
    'Impossible is for the unwilling.',
    'No pressure, no diamonds.',
]

const GameState = {
    STARTED: 'STARTED',
    STOPPED: 'STOPPED'
}

const GAME_TIME_IN_SEC = 60;

const splitStringIntoCharStringArray = function (string) {
    let array = [];
    for (let i = 0; i < string.length; i++) {
        array.push(string.charAt(i) + "");
    }
    return array;
}

const convertArrayToString = function (...array) {
    let string = '';
    array.forEach(c => {
        string = string + c
    });
    return string;
}

export {
    typingLines,
    GameState,
    GAME_TIME_IN_SEC,
    convertArrayToString,
    splitStringIntoCharStringArray
}

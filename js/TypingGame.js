import {
    typingLines,
    GameState,
    splitStringIntoCharStringArray
} from './constants.js'

class TypingGame {
    constructor() {
        this.currentLineIndex = 0;
        this.wpm = 0;
        this.cpm = 0;
        this.errorCount = 0;
        this.time = 0;
        this.accuracy = 100;
        this.state = GameState.STOPPED;
        this.currentLine = splitStringIntoCharStringArray(typingLines[this.currentLineIndex]);
        this.isFinished = false;
        this.currentCharIndexInLine = 0;
        this.totalCharAttempts = 0;
        this.totalWordCount = 0;
    }
}

export default TypingGame;

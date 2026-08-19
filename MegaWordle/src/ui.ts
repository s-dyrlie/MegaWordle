import {Game, getRandomAnswer, max_attempts, word_length, type tileStatus} from "./game"

let game = new Game(getRandomAnswer());
let currentGuess = "";

const board = document.querySelector("#board") as HTMLDivElement;
const keyboard = document.querySelector("#keyboard") as HTMLDivElement;
const message = document.querySelector("#message") as HTMLDivElement;


function createBoard() {
    board.innerHTML = "";

    for (let row = 0; row < max_attempts; row++) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");

        for (let column = 0; column < word_length; column++) {
            const tile = document.createElement("div")
            tile.classList.add("tile");
            rowElement.appendChild(tile);
        }
        board.appendChild(rowElement);
    }
}


function createKeyboard() {
    const keys =["ENTER",..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),"BACKSPACE"];

    keyboard.innerHTML = "";

    for (const key of keys) {
        const button = document.createElement("button"); //make a button per letter
        button.textContent = key;
        button.classList.add("key"); //give buttons class 'key'

        button.addEventListener("click", () => {
            handleKey(key);
        });
        keyboard.appendChild(button); // add button to keyboard
    }

    window.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleKey("ENTER");
        } else if (event.key === "Backspace") {
            handleKey("BACKSPACE");
        } else {
            const upper = event.key.toUpperCase();

            if (/^[AZ]$/.test(upper)) {
                handleKey(upper);
            }
        }
    });
}

function updateBoard() {
    const tiles = document.querySelectorAll(".tile"); //fetch all tiles on the board

    for (let row = 0; row < game.guesses.length; row++) {
        const guess = game.guesses[row];
        const statuses = game.statuses[row];

        for (let column = 0; column < word_length; column++) {
            const tile  = tiles[row * word_length + column] as HTMLDivElement; //find tile on boeard
            tile.textContent = guess[column]; //show letter on tile
            tile.classList.add(statuses[column]); //adds tile to correct colour class
        }
    }

    const curRow = game.guesses.length; //finds active row

    for (let column = 0; column < word_length; column++) {
            const tile  = tiles[curRow * word_length + column] as HTMLDivElement; //find tile on boeard

            if (currentGuess[column]) {
            tile.textContent = currentGuess[column];
        } else {
            tile.textContent = "";
        }
    }
}

function handleKey(key: string) {
    if (game.status !== "playing") return;

    if (key === "ENTER") {
        submitGuess();
        return;
    }

    if (key === "BACKSPACE") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
        return;
    }

    if (currentGuess.length < word_length) {
        currentGuess += key;
        updateBoard();
    }
}

function submitGuess() {
    const result = game.submitGuess(currentGuess);

    if (result.ok === false) {
        message.textContent = result.reason;
        return;
    }

    currentGuess = "";
    updateBoard();

    if (game.status === "won") {
        message.textContent = "You won!"
    } else if (game.status === "lost") {
        message.textContent = "You lost. The answer was ${game.answer}";
    } else {
        message.textContent = "";
    }
}


createBoard();
createKeyboard();
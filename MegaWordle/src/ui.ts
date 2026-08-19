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

        for (let column = 0; column < max_attempts; column++) {
            const tile = document.createElement("div")
            tile.classList.add("tile");
            rowElement.appendChild(tile);
        }
        board.appendChild(rowElement);
    }
}


function createKeyboard() {
    const letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    keyboard.innerHTML = "";

    for (const letter of letters) {
        const button = document.createElement("button") //make a button per letter
        button.textContent = letter;
        button.classList.add("key") //give buttons class 'key'

        button.addEventListener("click" () => {
            handleKey(letter);
        });
        keyboard.appendChild(button); // add button to keyboard
    }
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
            const tile  = tiles[row * word_length + column] as HTMLDivElement; //find tile on boeard

            if (currentGuess[col]) {
            tile.textContent = currentGuess[col];
        } else {
            tile.textContent = "";
        }
    }
}

function handleKey(key: string) {

}

function submitGuess() {

}


createBoard();
createKeyboard();
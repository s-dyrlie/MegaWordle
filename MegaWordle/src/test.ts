import { evaluateGuess, Game, getRandomAnswer } from "./game";
import {ANSWERS, VALID_GUESSES, WORD_LENGTH} from "./words";


printResult("painterS", "MOUntain")


function printResult(guess: string, answer: string) {
    const result = evaluateGuess(guess, answer);
    console.log("you guessed: " + guess.toUpperCase());
    console.log("result: " + result.join(" | "));

}

console.log("number of words: ", ANSWERS.length);
console.log("number of valid guesses: ", VALID_GUESSES.size);
console.log("word length: ", WORD_LENGTH);
console.log("is 'MOuntaIN' a valid guess? ", VALID_GUESSES.has("MOUNTAIN"));
console.log("is 'zzzzzzzz' a valid guess? ", VALID_GUESSES.has("zzzzzzzz"));


const game = new Game("CRACKERS");

console.log(game.submitGuess("crawlers"));

console.log("Guesses: " + game.guesses);
console.log("Statuses: " + game.statuses);
console.log("Status: " + game.status);

console.log(game.submitGuess("fired"));

console.log("Random answer: " + getRandomAnswer());
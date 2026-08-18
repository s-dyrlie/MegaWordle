import { evaluateGuess } from "./game";
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


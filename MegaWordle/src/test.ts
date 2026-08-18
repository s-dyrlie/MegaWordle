import { evaluateGuess } from "./game";

printResult("painterS", "MOUntain")


function printResult(guess: string, answer: string) {
    const result = evaluateGuess(guess, answer);
    console.log("you guessed: " + guess.toUpperCase());
    console.log("result: " + result.join(" | "));

}
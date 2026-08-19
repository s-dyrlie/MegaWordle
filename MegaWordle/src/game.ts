export type tileStatus = "green" | "yellow" | "gray";

export const word_length = 8;
export const max_attempts = 6;

export function evaluateGuess(guess: string, answer: string): tileStatus[] {
    const g = guess.toUpperCase().split("");
    const a = answer.toUpperCase().split("");
    const result: tileStatus[] = new Array(g.length).fill("gray");

    const remaining: Record<string, number> = {};
        for (const letter of a) {
            remaining[letter] = (remaining[letter] ?? 0) + 1;
        } 

        // find green letters
        for (let i = 0; i < g.length; i++) {
            if (g[i] === a[i]) {
                result[i] = "green";
                remaining[g[i]] -= 1;
            }
        }

        //find yellow letters
        for (let i = 0; i < g.length; i++) {
            //if the letter is already marked as green, continue without further checking
            if (result[i] === "green") continue;

            if (remaining[g[i]] > 0) {
                result[i] = "yellow";
                remaining[g[i]] -= 1; //use another one of that letter
            }
                //if no match, the letter keeps it's value as "gray"
        }
    return result;
}


import {ANSWERS, VALID_GUESSES } from "./words";

export type GameStatus = "playing" | "won" | "lost";

export function getRandomAnswer(): string {
    const index = Math.floor(Math.random() * ANSWERS.length);
    return ANSWERS[index];
}

export function isValidGuess(word: string): boolean {
    return word.length === word_length && VALID_GUESSES.has(word.toUpperCase());
}

export class Game {
    readonly answer: string;
    guesses: string[] = [];
    statuses: tileStatus[][] = [];
    status: GameStatus = "playing";

    constructor(answer: string) {
        this.answer = answer.toUpperCase();
    }

    submitGuess(guess: string): { ok: true } | { ok: false} {
            if (this.status !== "playing") {
            return {ok: false};
        }

        const upper = guess.toUpperCase();

        if (!isValidGuess(upper)) return {ok: false};

        const result = evaluateGuess(upper, this.answer);

        this.guesses.push(upper);
        this.statuses.push(result);

        if (upper === this.answer){ 
            this.status = "won"
        } else if (this.guesses.length >= max_attempts ) {
            this.status = "lost"
        }

        return {ok: true};
    }
}



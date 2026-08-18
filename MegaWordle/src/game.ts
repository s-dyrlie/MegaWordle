export type tileStatus = "green" | "yellow" | "gray";

export const WORD_LENGTH = 8;
export const MAX_ATTEMPTS = 6;

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
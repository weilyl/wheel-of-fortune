class Tile {
    constructor(
        letter = null, // letter from random word
        back = true, // is the backside facing the player?
        lit = false // is the tile lit up?
    ) {
        this.letter = letter;
        this.back = back;
        this.lit = lit;
    }

    checkGuess(char) {
        if (this.matchLetter) {
            // light up
            // setTimeout --> back to flip
        }
    }

    // takes in user input and 
    // matches it to letter in random word
    matchLetter(char) {
        return char != this.letter
    }





}
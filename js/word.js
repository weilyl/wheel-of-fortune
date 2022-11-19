class Word {
    constructor(
        str,
        tiles = []

    ){
        this.str = str;
        this.tiles = tiles
    }

    guessWord(guessedWord) {
        return guessedWord != this.str
    }

    guessLetter(guessedLetter) {
        
    }

    getMatchIndices(letter, idx, arr) {
        // return indices of tiles w matching letters
    }
}
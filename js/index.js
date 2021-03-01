// create playable space
const body = document.body
const main = document.createElement('div')
main.setAttribute('id', "screen");
main.setAttribute('class', 'row d-flex justify-content-center jumbotron-fluid');
main.style.textAlign = 'center';
// main.style.width = '1rem'
main.style.padding = '20px 0'
main.style.margin = '10px'
body.appendChild(main)
let screen = document.getElementById('screen');
let guessing = document.createElement('section');
guessing.setAttribute('class', 'container d-flex justify-content-center')
body.appendChild(guessing)

// game defaults to a new bonus round

let newWord = getRandomWord().split('');
document.onload = sessionStart()

function sessionStart() {

    const button = document.createElement('button');
    button.innerText = 'Start Bonus Round'
    button.setAttribute('id', 'start')
    button.setAttribute('type', 'button')
    button.setAttribute('class', 'btn btn-success')
    button.style.margin = '20px'
    guessing.appendChild(button)

    let numLetters = newWord.length;
    const defaultCardWidth = 7.5;
    // calculated in case a word is REALLY long
    const calculatedCardWidth = (100/numLetters)-1;
    const defaultFontSize = 6;
    const calculatedFontSize = (90/numLetters)-1

    newWord.forEach((letter, idx) => {
        // create empty card
        const card = document.createElement('div');
        card.setAttribute('class', 'card text-center');
        // 
        // if default bigger than calculated, use default
        card.style.width = defaultCardWidth > calculatedCardWidth ? `${calculatedCardWidth}vw`: `${defaultCardWidth}vw`;
        card.style.textAlign = 'center';

        // span tag as empty card body
        const blank = document.createElement('span');
        blank.setAttribute('id', `${idx}`);
        blank.setAttribute('class', `blank letter ${letter} card-body`)
        blank.innerText = '_'
        blank.style.padding = '5px';
        blank.style.fontSize = defaultFontSize > calculatedFontSize ? `${calculatedFontSize}vw` : `${defaultFontSize}vw`;
        blank.style.color = 'rgba(0, 0, 0, 0)';

        card.appendChild(blank)
        screen.appendChild(card)
    })
     
}
// create tile
function createTile(int) {
    // create card
    // card background = logo
    // https://css-tricks.com/almanac/properties/f/filter/
    // element.style.filter = `url('#teal-lightgreen')`;
    // element.style.filter = `url('#teal-white')`;
    // while int > 0 append to screen
}

const interval = 550;
const vowelsStr = 'aiou';
const rstlneStr = 'rstlne';
const consonantRegex = new RegExp(`(?:(?![${vowelsStr+rstlneStr}])[a-z])`, `i`)
const vowelRegex = new RegExp(`(?:(?![${rstlneStr}])[${vowelsStr}])`, `i`)
const guessedLetters = [];
let guessedWord;
// https://stackoverflow.com/questions/44771741/regex-any-alphabet-except-e

// button starts gameplay
newGame = (e) => {
    
    startButton.style.display = 'none'
    
    const rstlne = ['r', 's', 't', 'l', 'n', 'e']    
    
    // common letters appear if present
    let common = newWord.filter((letter) => rstlne.includes(letter))
    
    if (common.length >= 1) {
        
        common.forEach((letter, idx) => {
            const exists = document.querySelector(`.${letter}.blank`)
            // remove blank class so duplicate letters appear 
            exists.classList.remove('blank')
            
            // light up tiles
            setTimeout(() => {
                exists.setAttribute('class', 'badge-light')
            }, idx*interval);

            // common letters appear
            setTimeout(()=> {
                setTimeout(() => {
                    // light goes away
                    exists.classList.remove('badge-light')
                    // letters appear
                    exists.innerText = letter.toUpperCase()
                    exists.style.color = 'black';
                    // exists.classList.remove('blank')
                }, interval)
                
            }, idx * interval);
        })
        
    }
    openGuessForm();
    
}

// guess letter after RSTLNE
openGuessForm = () => {
    const numConsonants = 3;
    const numVowels = 1;
    const form = document.createElement('form');
    form.setAttribute('class', 'guess-letters');
    form.addEventListener('keydown', validateLetterForm);
    const letterForm = document.createElement('div');
    letterForm.style.margin = '20px'
    letterForm.setAttribute('class', 'row')
    form.appendChild(letterForm)

    function makeFormGroups (cons=3, vowels=1) {
        // const colSize = 12/(cons+vowels)

        for (let i = 1; i <= cons; i++) {
            const consGroup1 = document.createElement('div');
            consGroup1.setAttribute('class', `form-group col-md`);

            const consLabel1 = document.createElement('label');
            consLabel1.setAttribute('for', `consonant${i}`)
            let ith;
            switch (i) {
                case 1:
                    ith = "First";
                    break;
                case 2:
                    ith = "Second";
                    break;
                case 3:
                    ith = "Third";
                    break;
            }
            consLabel1.innerText = `${ith} Consonant`
            consGroup1.appendChild(consLabel1);
        
            const consInput1 = document.createElement('input');
            consInput1.setAttribute('type', 'text');
            consInput1.setAttribute('id', `consonant${i}`);
            consInput1.setAttribute('maxlength', '1');
            consInput1.setAttribute('class', 'form-control guess-letter');
            consInput1.setAttribute('placeholder', `${ith} consonant`);
            consInput1.required;
            consInput1.addEventListener('keydown', validateLetterGuess)
        
            consGroup1.appendChild(consInput1);
            letterForm.appendChild(consGroup1);
        }

        for (let i = 1; i <= vowels; i++) {
            const vowelGroup1 = document.createElement('div');
            vowelGroup1.setAttribute('class', `form-group col-md`);

            const vowelLabel1 = document.createElement('label');
            vowelLabel1.setAttribute('for', `vowel${i}`)
            let ith;
            switch (i) {
                case 1:
                    ith = "First";
                    break;
                case 2:
                    ith = "Second";
                    break;
                case 3:
                    ith = "Third";
                    break;
            }
            vowelLabel1.innerText = `${ith} Vowel`
            vowelGroup1.appendChild(vowelLabel1);
        
            const vowelInput1 = document.createElement('input');
            vowelInput1.setAttribute('type', 'text');
            vowelInput1.setAttribute('id', `vowel${i}`);
            vowelInput1.setAttribute('maxlength', '1');
            vowelInput1.setAttribute('class', 'form-control guess-letter');
            vowelInput1.setAttribute('placeholder', `${ith} vowel`);
            vowelInput1.required;         
            vowelInput1.addEventListener('keydown', validateLetterGuess)
            vowelGroup1.appendChild(vowelInput1);
            letterForm.appendChild(vowelGroup1);
        }
    }
 
    makeFormGroups(numConsonants, numVowels);

    guessing.appendChild(form);

}

validateLetterGuess = (e) => {
    if (e.key.length === 1) {

        if(e.target.id.includes('consonant')) {
            if (consonantRegex.test(e.key)) {
                e.target.value = e.key.toUpperCase();
                guessedLetters.push(e.key.toLowerCase());
                console.log(typeof e.key);
                console.log(typeof e.target.value);
                console.log(guessedLetters, e.key, e.target.value);
                e.target.setAttribute('readonly', 'true');
                e.target.setAttribute('disabled', "true");
            } else {
                e.target.value = 'Try again';
            }
        } 
        
        else if (e.target.id.includes('vowel')) {
            if (vowelRegex.test(e.key)) {
                e.target.value = e.key.toUpperCase();
                guessedLetters.push(e.key.toLowerCase());
                e.target.setAttribute('readonly', 'true');
                e.target.setAttribute('disabled', "true");
            } else {
                e.target.value = 'Try again';
            }
        }
    }
    
}

validateLetterForm = (e) => {
    const guessForms = document.querySelector('.guess-letters').querySelector('.row').querySelectorAll('.form-group')
    const valid = [];
    guessForms.forEach(form => {
        // console.log(form.querySelector('input').attributes)
        if ('disabled' in form.querySelector('input').attributes) {
            valid.push(true);
        }
    })
    
    if (valid.every(validity => validity === true) && valid.length === guessForms.length) {
        console.log('submit that form!')
        function submitLettersForm (e) {
            if (e.key === 'Enter') {
                guessing.innerText = '';
                const correctLetters = [];
                newWord.forEach((chc) => {
                    if(guessedLetters.includes(chc.toLowerCase())) {
                        correctLetters.push(chc)
                    }
                }) // why didn't filter work here??
                console.log('why empty', newWord, guessedLetters, correctLetters)

                if (correctLetters.length >= 1) {
                    correctLetters.forEach((letter, idx) => {
                        const exists = document.querySelector(`.${letter}.blank`)
                        // remove blank class so duplicate letters appear 
                        exists.classList.remove('blank')
                        
                        // light up tiles
                        setTimeout(() => {
                            exists.setAttribute('class', 'badge-light')
                        }, idx*interval);

                        // common letters appear
                        setTimeout(()=> {
                            setTimeout(() => {
                                // light goes away
                                exists.classList.remove('badge-light')
                                // letters appear
                                exists.innerText = letter.toUpperCase()
                                exists.style.color = 'black';
                            }, interval)
                            
                        }, idx * interval);

                        if (idx === correctLetters.length-1) {
                            setTimeout(()=> {
                                if (document.querySelectorAll('.blank').length > 0) {
                                    openGuessWord()
                                } else {
                                    const congrats = document.createElement('p');
                                    congrats.setAttribute('class', 'lead');
                                    congrats.innerText = `Congratulations, you guessed it! The word was ${e.target.value.toUpperCase()}!`
                                    guessing.appendChild(congrats)
                                }
                            },idx*2*interval)
                        }
                    })
                } else {
                    const noGuesses = document.createElement('p');
                    noGuesses.setAttribute('class', 'lead');
                    noGuesses.innerText = 'Sorry, none of your guessed letters were correct. See if you can get the whole word with what you have!'
                    guessing.appendChild(noGuesses);
                    setTimeout(openGuessForm, 750);
                }
                this.removeEventListener('keydown', validateLetterForm);
                this.removeEventListener('keydown', submitLettersForm)
            }
        }
        this.addEventListener('keydown', submitLettersForm)
    }
}

openGuessWord = (e) => {
    guessing.innerText = ''
    const form = document.createElement('form');
    form.setAttribute('class', 'guess-word-form');
    form.addEventListener('keydown', validateWordForm);

    const wordGroup = document.createElement('div');
    wordGroup.setAttribute('class', `form-group col-md`);
    form.appendChild(wordGroup);

    const wordLabel = document.createElement('label');
    wordLabel.setAttribute('for', `guess-word`);
    wordLabel.innerText = 'Guess the word';
    wordGroup.appendChild(wordLabel)

    const wordInput = document.createElement('input');
    wordInput.setAttribute('id', 'guess-word');
    wordInput.setAttribute('type', 'text');
    wordInput.setAttribute('minlength', '1');
    wordInput.setAttribute('class', 'form-control');
    wordInput.setAttribute('placeholder', `Give your best guess`);
    wordInput.required;         
    wordInput.addEventListener('keydown', validateWordForm)
    wordGroup.appendChild(wordInput);

    guessing.appendChild(form);

}

validateWordForm = (e) => {
    guessing.innerText = ''

    if (e.key === 'Enter') {
        if (e.target.value.toLowerCase() === newWord.join('').toLowerCase()) {
            const congrats = document.createElement('p');
            congrats.setAttribute('class', 'lead');
            congrats.innerText = `Congratulations, you guessed it! The word was ${e.target.value.toUpperCase()}!`
            guessing.appendChild(congrats)
        } else {
            const lost = document.createElement('p');
            lost.setAttribute('class', 'lead');
            lost.innerText = `I'm sorry, ${e.target.value.toUpperCase()} was <i>not</i> the right answer. You don't win this round.`
            guessing.appendChild(lost);
        }
    }
}

// START GAME
let startButton = document.getElementById('start')
startButton.addEventListener('click', newGame)
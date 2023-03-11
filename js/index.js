const interval = 550;
const vowelsStr = 'aiou';
const rstlneStr = 'rstlne';
const consonantRegex = new RegExp(`(?:(?![${vowelsStr+rstlneStr}])[a-z])`, `i`)
const vowelRegex = new RegExp(`(?:(?![${rstlneStr}])[${vowelsStr}])`, `i`)
const guessedLetters = [];

// Create playable space
const body = document.body
const main = document.createElement('div')
main.setAttribute('class', 'row d-flex justify-content-center jumbotron-fluid');
const mainStyle = {
    textAlign: 'center',
    padding: '20px 0',
    margin: '10px'
}
setStyle(main, mainStyle)
body.appendChild(main)

// Create section to input & validate guesses
let guessing = document.createElement('section');
guessing.setAttribute('class', 'container d-flex justify-content-center')
body.appendChild(guessing)

// Create footer for RSTLNE
const known = document.createElement('footer');
known.setAttribute('class', 'fixed-bottom row mx-0 pb-5')
body.appendChild(known);

// show common letters on bottom
const freebies = document.createElement('h3');
freebies.innerText = rstlneStr.toUpperCase();
freebies.setAttribute('class', 'col pl-2 ml-auto text-left')
known.appendChild(freebies)

// Game defaults to a new bonus round
const newWord = 'hello'.split('')   //getRandomWord().split('');
document.onload = sessionStart()

function sessionStart() {

    createStartButton()

    createTiles()
     
}

// button starts gameplay
const newGame = (e) => {
    
    startButton.style.display = 'none'
    showRSTLNETiles()
    openGuessForm();
    
}


// Guess letters after RSTLNE
const openGuessForm = () => {
    const numConsonants = 3;
    const numVowels = 1;
    const form = document.createElement('form');
    form.setAttribute('class', 'guess-letters');
    form.addEventListener('keydown', validateLetterForm);
    const letterForm = document.createElement('div');
    letterForm.style.margin = '20px'
    letterForm.setAttribute('class', 'row')
    form.appendChild(letterForm)

    function createGuessFormGroup(numGuesses, isConsonant){
        var charType = isConsonant ? 'consonant' : 'vowel'

        for (let i = 1; i <= numGuesses; i++) {
            const formGroup = document.createElement('div');
            formGroup.setAttribute('class', `form-group col-md`);

            const formLabel = document.createElement('label');
            formLabel.setAttribute('for', `${charType}${i}`)

            var ith;

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

            formLabel.innerText = `${ith} ${charType}`
            formGroup.appendChild(formLabel);
        
            const formInput = document.createElement('input');
            setDOMAttrs(formInput, {
                type: 'text',
                id: `${charType}${i}`,
                maxlength: '1',
                class: 'form-control guess-letter',
                placeholder: `${ith} ${charType}`
            })
            formInput.required;
            formInput.addEventListener('keydown', validateLetterGuess)
        
            formGroup.appendChild(formInput);
            letterForm.appendChild(formGroup);
        }
    }

    createGuessFormGroup(numConsonants, true)
    createGuessFormGroup(numVowels, false)
    guessing.appendChild(form);

}

const validateLetterGuess = (e) => {
    // Preserve default behavior for Backspace, Enter, Tab
    if (e.key.length === 1) {
        var re = e.target.id.includes('consonant') ? consonantRegex : vowelRegex

        if (re.test(e.key)) {
            e.target.value = e.key.toUpperCase();
            guessedLetters.push(e.key.toLowerCase());
            e.target.setAttribute('readonly', 'true');
            e.target.setAttribute('disabled', 'true');
        } else {
            e.target.value = 'Try again';
        }
    }  
}

const validateLetterForm = (e) => {
    let unique = true;
    const counter = {};
    for (let i = 0; i < guessedLetters.length; i++) {
        if (guessedLetters[i].toLowerCase() in counter) {
            counter[guessedLetters[i].toLowerCase()]++
            guessedLetters.splice(i,1)
            i--
            unique = false;
        } else {
            counter[guessedLetters[i].toLowerCase()] = 1;
        }
    }

    
    const guessForms = document.querySelector('.guess-letters').querySelector('.row').querySelectorAll('.form-group')
    if (unique === false) {

        guessForms.forEach(form => {
            if (counter[form.querySelector('input').value.toLowerCase()] > 1){
                counter[form.querySelector('input').value.toLowerCase()]--
                form.querySelector('input').removeAttribute('disabled');
                form.querySelector('input').removeAttribute('readonly');
                form.querySelector('input').value = ''
                return validateLetterGuess()
            }
        })
    }
    
    const valid = [];
    guessForms.forEach(form => {
        if ('disabled' in form.querySelector('input').attributes) {
            valid.push(true);
        }
    })
    
    if (valid.every(validity => validity === true) && valid.length === guessForms.length) {
        const submitPrompt = document.createElement('p');
        submitPrompt.setAttribute('class', 'lead col');
        submitPrompt.innerText = `Hit 'ENTER' to submit your guesses`
        const promptDiv = document.createElement('div')
        promptDiv.setAttribute('class', 'row jumbotron-fluid');
        guessing.appendChild(submitPrompt)
        
        function submitLettersForm (e) {
            e.stopPropagation();
            e.preventDefault();
            if (e.key === 'Enter') {
                guessing.innerText = '';

                const submittedLetters = document.createElement('h3');
                submittedLetters.innerText = `${guessedLetters.join(' ').toUpperCase()}`
                submittedLetters.setAttribute('class', 'text-right col pr-2 mr-auto')
                known.appendChild(submittedLetters)

                const correctLetters = newWord.filter((chc) => guessedLetters.includes(chc.toLowerCase()))

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

                        this.removeEventListener('keydown', submitLettersForm)


                        if (idx === correctLetters.length-1) {
                            setTimeout(()=> {
                                if (document.querySelectorAll('.blank').length > 0) {
                                    openGuessWord()
                                } else {
                                    setTimeout(()=> {
                                        finalMessage(newWord.join(''), true)
                                    }, idx)
                                }
                            },idx*3*interval)
                        }
                    })
                } else {
                    this.removeEventListener('keydown', validateLetterForm);
                    this.removeEventListener('keydown', submitLettersForm)
                    const noGuesses = document.createElement('p');
                    noGuesses.setAttribute('class', 'lead');
                    noGuesses.innerText = 'Sorry, none of your guessed letters were correct. See if you can get the whole word with what you have!'
                    guessing.appendChild(noGuesses);
                    setTimeout(() => {guessing.innerText = ''}, 2050)
                    setTimeout(openGuessWord, 2051);
                }
                this.removeEventListener('keydown', validateLetterForm);
            }
        }
        this.addEventListener('keydown', submitLettersForm)
    }
}

const openGuessWord = (e) => {
    guessing.innerText = ''
    const form = document.createElement('form');
    form.setAttribute('class', 'guess-word-form');

    const wordGroup = document.createElement('div');
    wordGroup.setAttribute('class', `form-group col-md`);
    form.appendChild(wordGroup);

    const wordLabel = document.createElement('label');
    wordLabel.setAttribute('for', `guess-word`);
    wordLabel.innerText = 'Guess the word';
    wordGroup.appendChild(wordLabel)

    const wordInput = document.createElement('input');
    setDOMAttrs(wordInput, {
        id: 'guess-word',
        class: 'form-control',
        type: 'text',
        minlength: '1',
        placeholder: `Give your best guess`
    })
    wordInput.required;         
    wordInput.addEventListener('keydown', validateWordForm)
    wordGroup.appendChild(wordInput);

    guessing.appendChild(form);

}

const validateWordForm = (e) => {
    if (e.key === 'Enter') {
        
        var won = e.target.value.toLowerCase() === newWord.join('').toLowerCase()

        if (won) {
            e.stopPropagation();
            e.preventDefault();
            
            const correctWord = e.target.value.split('');
            correctWord.forEach((letter) => {
                const final = document.querySelector(`.${letter}.blank`)
                // .blank class has already been removed from previously guessed/given tiles
                if(final) {
                    // Remove blank class so duplicate letters appear 
                    final.classList.remove('blank')
                    final.innerText = letter.toUpperCase()
                    final.style.color = 'black';
                }
            })
        } 

        finalMessage(e.target.value, won)
    }
}


// START GAME
const startButton = document.getElementById('start')
startButton.addEventListener('click', newGame)

// HELPERS 
function setDOMAttrs(ele, attrs) {
    for (var attr in attrs) {
        ele.setAttribute(attr, attrs[attr])
    }
}

function setStyle(ele, attrs) {
    for (var attr in attrs) {
        ele.style[attr] = attrs[attr]
    }
}

function createStartButton(){
    var attrs = {
        id: 'start',
        type: 'button',
        class: 'btn btn-success'
    }

    const button = document.createElement('button');
    button.innerText = 'Start Bonus Round'
    setDOMAttrs(button, attrs)
    button.style.margin = '20px'
    guessing.appendChild(button)
}

function createTile(attrs) {
    // Create empty card
    const card = document.createElement('div');
    card.setAttribute('class', 'card text-center');
    setStyle(card, {width: attrs.cardWidth, textAlign: 'center'})

    // span tag as empty card body
    const blank = document.createElement('span');
    setDOMAttrs(blank, {
        id: `${attrs.idx}`,
        class: `blank letter ${attrs.letter} card-body`
    })
    blank.innerText = '_'
    setStyle(blank, {
        padding: '5px',
        fontSize: attrs.fontSize,
        color: 'rgba(0, 0, 0, 0)'
    })

    card.appendChild(blank)
    main.appendChild(card)
}

function createTiles(){
    let numLetters = newWord.length;
    const defaultCardWidth = 7.5;
    const calculatedCardWidth = (100/numLetters)-1;
    const defaultFontSize = 6;
    const calculatedFontSize = (90/numLetters)-1

    newWord.forEach((letter, idx) => {

        const tileAttributes = {
            letter: letter,
            idx: idx,
            // If default bigger than calculated, use default
            cardWidth: defaultCardWidth > calculatedCardWidth ? `${calculatedCardWidth}vw`: `${defaultCardWidth}vw`,
            fontSize: defaultFontSize > calculatedFontSize ? `${calculatedFontSize}vw` : `${defaultFontSize}vw`
        }

        createTile(tileAttributes)
    })
}

function showRSTLNETiles() {
    // Letters in RSTLNE appear if present
    let common = newWord.filter((letter) => rstlneStr.split('').includes(letter))
    
    if (common.length < 1 ) return

    common.forEach((letter, idx) => {
        const exists = document.querySelector(`.${letter}.blank`)
        // Remove blank class so duplicate letters appear 
        exists.classList.remove('blank')
        
        // Light up tiles
        setTimeout(() => {
            exists.setAttribute('class', 'badge-light')
        }, idx*interval);

        // Common letters appear
        setTimeout(()=> {
            setTimeout(() => {
                // Light goes away
                exists.classList.remove('badge-light')
                // Letters appear
                exists.innerText = letter.toUpperCase()
                exists.style.color = 'black';
            }, interval)
        }, idx * interval);
    })
        
}

function finalMessage(guess, isWin){
    var congrats = `Congratulations, you guessed it! The word was ${guess.toUpperCase()}!`

    var lost = `I'm sorry, ${guess.toUpperCase()} was NOT the right answer. You don't win this round. The word was ${newWord.join('').toUpperCase()}`

    var msgStr = isWin ? congrats : lost

    guessing.innerText='';
    const msgElement = document.createElement('p')
    msgElement.setAttribute('class', 'lead');
    msgElement.innerText = msgStr
    guessing.appendChild(msgElement);
}
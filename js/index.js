// create playable space
const body = document.body
const main = document.createElement('div')
main.setAttribute('id', "screen");
main.style.width = '90'
main.style.padding = '120px'
body.appendChild(main)
let screen = document.getElementById('screen');

// game defaults to a round
let newWord = getRandomWord();

sessionStart()

function sessionStart() {
    const button = document.createElement('button');
    button.innerText = 'Start Game'
    button.setAttribute('id', 'start')
    button.setAttribute('type', 'button')
    body.appendChild(button)


    newWord.split('').forEach((letter, idx) => {
        const blank = document.createElement('span');
        blank.setAttribute('id', `${idx} ${letter}`);
        blank.setAttribute('class', 'blank letter')
        blank.innerText = '    _    '
        blank.style.padding = '20px'
        blank.style.fontSize = '5vh'
        screen.appendChild(blank)
    })
     
}

function newGame() {
    newWord = getRandomWord()
    newWord.split('').forEach(letter => {console.log(letter)})

}

// newGame()
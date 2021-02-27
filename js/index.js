// create playable space
const body = document.body
const main = document.createElement('div')
main.setAttribute('id', "screen");
main.style.width = '100'
main.style.padding = '70px 20px 20px 20px'
body.appendChild(main)
let screen = document.getElementById('screen');

// game defaults to a round
let newWord = getRandomWord().split('');

sessionStart()

function sessionStart() {
    const button = document.createElement('button');
    button.innerText = 'Start Game'
    button.setAttribute('id', 'start')
    button.setAttribute('type', 'button')
    button.setAttribute('class', 'btn btn-success')
    body.appendChild(button)


    newWord.forEach((letter, idx) => {
        const blank = document.createElement('span');
        blank.setAttribute('id', `${idx}`);
        blank.setAttribute('class', `blank letter ${letter}`)
        blank.innerText = '    _    '
        blank.style.padding = '50px'
        blank.style.fontSize = '12vh'
        screen.appendChild(blank)
    })
     
}

// turns span tag to form when empty letter is clicked
openGuessForm = (e) => {
    console.log('guess!', e.target.id)
    let guessing = document.getElementById(e.target.id);
    guessing.classList.add('badge-light')
    // guessing.classList.add('badge')

    // only guess for one letter at a time
    let blank = document.querySelectorAll('.blank')
    blank.forEach(letter => letter.removeEventListener('click', openGuessForm))
}

// button starts gameplay
newGame = (e) => {
    startButton.style.display = 'none'

    const common = ['r', 's', 't', 'l', 'n', 'e']
    // console.log('whoa nelly')
    // let letters = document.querySelectorAll('.letter')
    newWord.filter((letter) => common.includes(letter))
    .forEach((letter) => {
        const exists = document.querySelector(`.${letter}`)
        exists.innerText = letter.toUpperCase()
        exists.classList.remove('blank')
        console.log(letter)
    })

    let blank = document.querySelectorAll('.blank')
    blank.forEach(letter => letter.addEventListener('click', openGuessForm))
}

let startButton = document.getElementById('start')
startButton.addEventListener('click', newGame)
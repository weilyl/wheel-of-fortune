// create playable space
const body = document.body
const main = document.createElement('div')
main.setAttribute('id', "screen");
main.style.width = '90'
main.style.padding = '120px'
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
        blank.style.padding = '20px'
        blank.style.fontSize = '5vh'
        screen.appendChild(blank)
    })
     
}


// button starts gameplay
function newGame() {
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
    blank.addEventListener('click')
}

let startButton = document.getElementById('start')
startButton.addEventListener('click', newGame)
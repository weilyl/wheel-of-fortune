// create playable space
const body = document.body
const main = document.createElement('div')
main.setAttribute('id', "screen");
main.setAttribute('class', 'row');
main.style.textAlign = 'center';
main.style.width = '95'
main.style.padding = '70px 20px 20px 20px'
body.appendChild(main)
let screen = document.getElementById('screen');

// game defaults to a round

let newWord = getRandomWord().split('');
document.onload = sessionStart()
function sessionStart() {

    const button = document.createElement('button');
    button.innerText = 'Start Bonus Round'
    button.setAttribute('id', 'start')
    button.setAttribute('type', 'button')
    button.setAttribute('class', 'btn btn-success')
    body.appendChild(button)


    newWord.forEach((letter, idx) => {
        // create empty card
        const card = document.createElement('div');
        card.setAttribute('class', 'card text-center');
        card.style.width = '5vw';
        card.style.textAlign = 'center';

        // span tag as empty card body
        const blank = document.createElement('span');
        blank.setAttribute('id', `${idx}`);
        blank.setAttribute('class', `blank letter ${letter} card-body`)
        blank.innerText = '_'
        blank.style.padding = '10px';
        blank.style.fontSize = '3.5vw';
        blank.style.color = 'rgba(0, 0, 0, 0)';

        card.appendChild(blank)
        screen.appendChild(card)
    })
     
}

// when blank letter is clicked
openGuessForm = () => {
    // // misunderstood instructions :(

}

const interval = 550;

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
}

// START GAME
let startButton = document.getElementById('start')
startButton.addEventListener('click', newGame)
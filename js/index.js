// create playable space
const body = document.body
const main = document.createElement('div')
main.setAttribute('id', "screen");
main.setAttribute('class', 'row');
main.style.textAlign = 'center';
// main.style.width = '95'
main.style.padding = '20px 0'
main.style.margin = '10px'
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
    button.style.margin = '20px'
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
    const numConsonants = 3;
    const numVowels = 1;
    const letterForm = document.createElement('form');
    letterForm.style.margin = '20px'
    letterForm.setAttribute('class', 'container-fluid row')

    function makeFormGroups (cons=3, vowels=1) {
        const colSize = 12/(cons+vowels)

        for (let i = 1; i <= cons; i++) {
            const consGroup1 = document.createElement('div');
            consGroup1.setAttribute('class', `form-group col-sm col-${colSize} my-1`);

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
            consInput1.setAttribute('class', 'form-control');
            consInput1.setAttribute('placeholder', `${ith} consonant`);
        
            consGroup1.appendChild(consInput1);
            letterForm.appendChild(consGroup1);
        }

        for (let i = 1; i <= vowels; i++) {
            const vowelGroup1 = document.createElement('div');
            vowelGroup1.setAttribute('class', `form-group col-sm col-${colSize} my-1`);

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
            vowelInput1.setAttribute('class', 'form-control');
            vowelInput1.setAttribute('placeholder', `${ith} vowel`);
        
            vowelGroup1.appendChild(vowelInput1);
            letterForm.appendChild(vowelGroup1);
        }
    }
    // const consGroup1 = document.createElement('div');
    // consGroup1.setAttribute('class', 'form-group col-sm my-1');
    // letterForm.appendChild(consGroup1)
    makeFormGroups(numConsonants, numVowels);

    body.appendChild(letterForm);

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
    openGuessForm();
}

// START GAME
let startButton = document.getElementById('start')
startButton.addEventListener('click', newGame)
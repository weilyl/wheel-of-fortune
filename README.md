# How to Play
Link: https://weilyl.github.io/wheel-of-fortune/
1. Start Bonus Round
2. Tiles will populate with any letters in "RSTLNE"
3. Guess 3 consonants and 1 vowel - be warned, the game currently locks in the first valid choice you type
4. Hit 'Enter'
5. Guess the word and hit 'Enter'

# About this Project
This doesn't mimic the entire Wheel of Fortune game, but just the Bonus Round.

It is based on an assignment from The Marcy Lab School Breakthrough Fellowship. 

I am refactoring my 2021 spaghetti code using class-based design to exercise my systems-level design muscles (even though it is just frontend for now).

# The Plan
### MVP:
Refactor all current features using classes

### Stretch goals:
1. Replace hard-coded word list with a language API.
2. Create rules to filter out words for more challenging gameplay.
3. Add tooltip before/after game end (TBD - before would be for hints, after would be to preserve current gameplay experience) to offer etymology, definitions, usage in a sentence for curious players. 


# Old Version
## Gameplay
## What I was especially proud of
1. Tiles light up one by one before "turning around" when a guessed letter matches
```js
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
```

2. Dynamic font & tile size depending on word length
#### Snippet (edited for clarity):
```js

    // Handles longer words to fit better on a multitude of screens

    // Tile width
    const defaultCardWidth = 7.5;
    const calculatedCardWidth = (100/numLetters)-1;
    // Font size
    const defaultFontSize = 6;
    const calculatedFontSize = (90/numLetters)-1

    newWord.forEach((letter, idx) => {
        ... 
        // If default bigger than calculated, use calculated width

        // Tile width
        card.style.width = defaultCardWidth > calculatedCardWidth ? `${calculatedCardWidth}vw`: `${defaultCardWidth}vw`;

        // Font size 
        const blank = document.createElement('span');
        blank.style.fontSize = defaultFontSize > calculatedFontSize ? `${calculatedFontSize}vw` : `${defaultFontSize}vw`;

        card.appendChild(blank)
        screen.appendChild(card)
    })
```



# Original Instructions
# Lesson 4: Putting it All Together

For this lesson, we're going to build on everything you've learned during this unit by building a simplified version of America's favorite game show: Wheel of Fortune! Here's how it will work.

1. Your application should choose a random word. You can use the `getRandomWord` function we've included for you (based on the `random-words` npm package.)
2. Display the word to the user using underscores to replace each letter. For example, if the word is "horse", you would display "- - - - - ".
3. When the user clicks start, reveal any instances of the letters R,S,T,L,N, or E. Using the "horse" example above, we would then display: "\_ \_ R S E"
4. Via a form input, the user can then guess 3 constanants and one vowel. For example, the user might enter "B C D A" and press enter. You should validate to make sure that they enter a valid statement.
5. Finally, allow the user to submit a guess at what the word is, and tell them if they're right or wrong.

Some notes to help you as you work through the prompt.

1. We've given you some basic starter files in this directory - feel free to create additional files as needed.
2. The exact flow/UI is up to you, but try to give you users feedback as much as possible. For example, let them know which letters have already been guessed.
3. How you organize the project is up to you, but try to keep your functions neatly organized.

## Bonus

In the real Wheel of Foturne, players can guess as many words as they like during a ten second window. Update your app to:

1. Display a ten second countdown
2. Allow the user to guess during the countdown. If the win, the countdown should stop and they should be alerted that they won.
3. If the timer reaches zero, let them know that they did not win.

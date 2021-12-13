const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const hearts = document.querySelectorAll('.tries img');

let missed = 0;

const startGame = document.querySelector('.btn_reset');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');

startGame.addEventListener('click', (e) => {
  overlay.style.display = 'none';
});

let phrases = [
  'the beach was crowded with snow leopards',
  'dan ate the clouds like cotton candy',
  'tuesdays are free if you bring a gnome costume',
  'that is an appealing treasure map that I cannot read',
  'i trust everything that is written in purple ink',
  'he created a pig burger out of beef',
  'having no hair made him look even hairier'
]

function getRandomPhraseAsArray(arr) {
  function randomIndex() {
    return Math.floor(Math.random() * arr.length);
  }
  const randomPhrase = arr[randomIndex()];
  const phraseAsArray = randomPhrase.split('');
  return phraseAsArray;
}

function addPhraseToDisplay(arr) {
  const ul = document.querySelector('ul');
  const phraseArray = getRandomPhraseAsArray(arr);

  for ( let i = 0; i < phraseArray.length; i++ ) {
    const li = document.createElement('li');
    li.textContent = phraseArray[i];
    ul.appendChild(li);
    
    if ( phraseArray[i].includes(' ') ) {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
  }
}
addPhraseToDisplay(phrases);

function checkLetter(buttonClicked) {
  let matchedLetter = null;
  const letters = document.querySelectorAll('.letter');

  for ( let i = 0; i < letters.length; i++ ) {
    if ( buttonClicked === letters[i].textContent ) {
      letters[i].className = 'letter show';
      matchedLetter = buttonClicked;
    }
  }
  return matchedLetter;
}

qwerty.addEventListener('click', (e) => {
  const buttonClicked = e.target.textContent;

  if ( e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') {
    e.target.className = 'chosen';
    const chosenLetter = checkLetter(buttonClicked);
  
    if ( chosenLetter === null ) {
      hearts[missed].src = 'images/lostHeart.png';
      hearts[missed].className = 'lost';
      missed++;
      checkLoss();
    } else {
      checkWin();
    }
  }
});

function checkWin() {
  let shown = document.getElementsByClassName('show');
  let letters = document.getElementsByClassName('letter');

  if ( shown.length === letters.length ) {
    overlay.style.display = 'flex';
    overlay.className = 'win';
    phrase.style.display = 'none';
    title.textContent = "Congrats, you did it!";

    startGame.addEventListener('click', () => {
      resetGame();
    });
  } 
}

function checkLoss() {
  if ( missed === 5 ) {
    overlay.style.display = 'flex';
    overlay.className = 'lose';
    phrase.style.display = 'none';
    title.textContent = "You lost, better luck next time!";

    startGame.addEventListener('click', () => {
      resetGame();
    });
  }
}

function resetGame() {
  
  function resetHearts() {
    for ( let i = 0; i < hearts.length; i++) {
      hearts[i].src = 'images/liveHeart.png';
      hearts[i].className = 'tries';
    }
  }

  function resetPhrase() {
    phrase.firstElementChild.innerHTML = '';
  }

  function resetKeyboard() {
    let buttons = document.querySelectorAll('button');
    for ( let i = 0; i < buttons.length; i++ ) {
      buttons[i].className = '';
    }
  }

  resetHearts();
  resetPhrase();
  resetKeyboard();
  addPhraseToDisplay(phrases);
  overlay.style.display = 'none';
}
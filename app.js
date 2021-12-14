const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const hearts = document.querySelectorAll('.tries img');
const buttons = document.getElementsByTagName('button');

let missed = 0;

const startGame = document.querySelector('.btn_reset');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');

startGame.addEventListener('click', (e) => {
  overlay.style.display = 'none';
});

let phrases = [
  'who let the dogs out',
  'wake me up before you go go',
  'smooth like butter',
  'permission to dance',
  'girl of my dreams',
  'the cold wind blows',
  'i wanna go to the moon'
]

function getRandomPhraseArray(arr) {
  const randomPhrase = arr[ Math.floor( Math.random() * arr.length ) ];
  const phraseSplit = randomPhrase.split('');
  return phraseSplit;
}

const phraseArray = getRandomPhraseArray(phrases);

function addPhraseToDisplay(arr) {
  for ( let i = 0; i < arr.length; i++ ) {
    const ul = document.querySelector('#phrase ul');
    const listItem = document.createElement('li');
    listItem.textContent = arr[i];
    if ( listItem.textContent !== ' ' ) {
      listItem.className = 'letter';
    } else {
      listItem.className = 'space';
    }
    ul.append(listItem);
  }
}

addPhraseToDisplay(phraseArray);

function checkLetter( clickedButton ) {
  const checkLetter = document.querySelectorAll('li');
  let match = null;
  for ( let i = 0; i < checkLetter.length; i++ ) {
    if ( clickedButton === checkLetter[i].textContent ) {
      checkLetter[i].className = 'letter show';
      match += checkLetter[i].textContent;
    }
  }
  return match
}

qwerty.addEventListener('click', (e) => {
  let button = e.target;
  if (button.tagName === 'BUTTON' && button.className !== 'chosen') {
    button.className += 'chosen';
    button.disabled = true;
    let chosenLetter = checkLetter(button.textContent);
    if ( chosenLetter === null ) {
      hearts[missed].src = 'images/lostHeart.png';
      missed++;
    }
  }
  checkWin();
});

function checkWin() {
  const classLetter = document.getElementsByClassName('letter');
  const classShow = document.getElementsByClassName('show');
  if ( classLetter.length === classShow.length ) {
    overlay.className = 'win';
    title.textContent = "Great Job, you win!"
    overlay.style.display = 'flex';
    startGame.textContent = 'Replay'
  } else if ( missed >= 5 ) {
    overlay.className = 'lose';
    title.textContent = "Hey no worries, try again."
    overlay.style.display = 'flex';
    startGame.textContent = 'Replay'
  }
}

function resetGame() {
 let missed = 0;
  
  function resetHearts() {
    for ( let i = 0; i < hearts.length; i++ ) {
      hearts[missed].src = 'images/liveHeart.png';
    }
  }

  function resetButtons() {
    for ( let i = 0; i < buttons.length; i++ ) {
      buttons.className = ''
    }
  }

  addPhraseToDisplay(phrases);
  resetHearts();
  resetButtons();

}
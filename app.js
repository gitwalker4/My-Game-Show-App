const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const tries = document.getElementsByClassName('tries');
let missed = 0;
const startGame = document.querySelector('.btn_reset');

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
  const letters = document.querySelectorAll('.letter');
  let matchedLetter = null;

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
      const hearts = document.querySelectorAll('.tries img');
      hearts.setAttribute = ('src', 'images/lostHeart.png');
      missed++;
    }
  }
});

function checkWin() {

}
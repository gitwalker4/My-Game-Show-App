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

function getRandomPhraseArray(arr) {
  const randomPhrase = arr[ Math.floor( Math.random() * arr.length ) ];
  const phraseSplit = randomPhrase.split('');
  return phraseSplit;
}

const phraseArray = getRandomPhraseArray(phrases);

function addPhraseToDisplay(arr) {
  const ul = document.querySelector('#phrase ul');
  const listItem = document.createElement('li');

  for ( let i = 0; i < phraseArray.length; i++ ) {
    ul.append(listItem); 

    if ( listItem !== ' ' ) {
      listItem.className = 'letter';
    } else {
      listItem.className = '';
    }
  }
}

addPhraseToDisplay(phraseArray);
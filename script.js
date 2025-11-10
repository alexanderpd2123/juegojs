const symbols = ['🍎','🍎','🍌','🍌','🍇','🍇','🍊','🍊','🍒','🍒','🍉','🍉','🍓','🍓','🥝','🥝'];
let board = document.getElementById('game-board');
let cards = [];
let flippedCards = [];
let matched = [];

function shuffle(array) {
  for(let i = array.length -1; i > 0; i--){
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupBoard() {
  board.innerHTML = '';
  cards = shuffle([...symbols]);
  matched = [];
  flippedCards = [];
  cards.forEach((symbol, idx) => {
    let card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.dataset.index = idx;
    card.innerHTML = '?';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains('flipped') || flippedCards.length === 2) return;
  this.innerHTML = this.dataset.symbol;
  this.classList.add('flipped');
  flippedCards.push(this);

  if(flippedCards.length === 2){
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if(card1.dataset.symbol === card2.dataset.symbol){
    card1.classList.add('matched');
    card2.classList.add('matched');
    matched.push(card1.dataset.symbol);
    if(matched.length === symbols.length/2){
      setTimeout(() => alert('¡Ganaste!'), 400);
    }
  } else {
    card1.innerHTML = '?';
    card2.innerHTML = '?';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }
  flippedCards = [];
}

document.getElementById('reset').onclick = setupBoard;

setupBoard();

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let turns = 0;


document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tile');
    const resetButton = document.getElementById('resetButton');

    shuffle(cards);
    cards.forEach(card => card.addEventListener('click', flipCard));
    resetButton.addEventListener('click', () => resetGame(cards)); // Added reset button event listener
});

function shuffle(cards) {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    turns++;
    updateTurnCounter();

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function updateTurnCounter() {
    const counterDisplay = document.getElementById('turnCounter');
    counterDisplay.textContent = `Turns: ${turns}`;
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame(cards) {
    lockBoard = false;
    [hasFlippedCard, firstCard, secondCard] = [false, null, null];
    turns = 0;
    updateTurnCounter();

    cards.forEach(card => {
        card.classList.remove('flipped');
        card.removeEventListener('click', flipCard);
        card.addEventListener('click', flipCard);
    });

    shuffle(cards);
}

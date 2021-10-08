const cards = document.querySelectorAll('.game-card');
//variable text 
const countFlip = document.getElementById
('flip-count');
const countVictory = document.getElementById
('victory-count');
const victoryScreen = document.getElementById
('victory')
let hasFlippedCard = false;
// locker le tableau
let lockBoard = false;
let firstCard, secondCard;
let totalFlip = 0;
let pointVictory = 0;

// FONCTION FLIP card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    // verfification de l'etat cliqué
    this.classList.toggle('flip');
    if (!hasFlippedCard) {
        // clique sur le firstcard 
        hasFlippedCard = true;
        firstCard = this;
        return;
       
    }
    //  else {
    //clik second card
    hasFlippedCard = false;
    secondCard =this;
    // si cela match
    checkForMatch();
    // }    
}




// verif de l etat clqiué
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    //AJOUT DES POINTS (agrémenté de 1 grace au ++)
    totalFlip++;
    countFlip.innerText = totalFlip;
    pointVictory++;
    countVictory.innerText = pointVictory;
    if (pointVictory === 6) {
        victoryScreen.classList.add('display')
    }

}
function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        //AJOUT DES COUPS 
        totalFlip++;
        countFlip.innerText = totalFlip
        resetBoard();
        }, 1000);
}
function checkForMatch() {
    if(firstCard.dataset.cardname === secondCard.dataset.cardname) {
        disableCards();
   }else {
       // cela ne match pas 
      unflipCards();
       
   }
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Fonction aleatoire des cartes
(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor (Math.random() * 12);
        card.style.order = randomPos;
    });
})();



// BOUCLE DE REPETITION 
cards.forEach(card => card.addEventListener('click', flipCard));

//timer 
var counter = 60;
var intervalId = null;
function finish() {
  clearInterval(intervalId);
  document.getElementById("times").innerHTML = "TERMINE!";	
}
function bip() {
    counter--;
    if(counter == 0) finish();
    else {	
        document.getElementById("times").innerHTML = counter + " secondes restantes";
    }	
}
function start(){
  intervalId = setInterval(bip, 1000);
}	
if(counter == 0) 
{

}
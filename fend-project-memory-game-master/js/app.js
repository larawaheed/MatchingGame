/*
 * Create a list that holds all of your cards
 */
 let AllCards = document.querySelectorAll('.card');
 let cards = [];//Array of cards
 let opened=[];//Array of opened cards
 let moves;//for the number of moves and stars
 let time = 0;
 let startTiming = 1;//initial value of timer if ON
 let Timer = document.createElement('div');
 let Numofmoves = document.querySelector('.moves');//number of moves
 let stars = document.querySelectorAll('.fa-star');//number of stars
 Timer.className = "timer";
 document.querySelector(".score-panel").append(Timer);
  function timer() {
    Timer.textContent = time + " seconds";
    time++;
    if(startTiming==1){//if timer is on
        setTimeout(timer,1000)
    }
 }
//for loop to walk through each card when clicked
 for(i = 0; i < AllCards.length; i++){
   //we need to add a listener event to open the cards each time we click on it
    AllCards[i].addEventListener("click", Clicked);
}
let Restart = document.querySelector('.restart');
Restart.addEventListener('click', startGame);

 for(let i = 0; i < AllCards.length; i++){
    cards.push(AllCards[i].children[0].className);
 }
 startGame();
 timer();
  function startGame() {
    //setting all to starter
     opened = [];
     time = 0;
     startTiming = 1;
     moves = 0;
     Numofmoves.textContent = moves;
     stars.forEach(function changeColor(item){
         item.style.color = 'black';
     })
     AllCards.forEach(card => {
         card.className = "card";
     });
     cards = shuffle(cards);//using the shuffle icons
     for(let i = 0; i < AllCards.length; i++){
     AllCards[i].children[0].className = cards[i];
     }
 }

function Clicked(){
    let clickedCard = this;
    if (opened.length < 2){
        opened.push(clickedCard);
      clickedCard.classList.add("open");
      clickedCard.classList.add("show");
    }
    if(opened.length === 2){
        if(!(opened[0].children[0] === opened[1].children[0])){
                moves++;
                Numofmoves.textContent = moves;
                if (moves>15){
                    stars[2].style.color = 'white';
                } else if (moves > 20) {
                    stars[1].style.color = 'white';
                } else if (moves > 25){
                    stars[0].style.color = 'white';
                }
            }
        matchCards(opened);//checking matched cards with the function
        opened = [];  //now we need to empty the array to continue playing
    }

}


function matchCards(cardsArray){
    let firstCard = cardsArray[0].children[0].className;
    let secCard = cardsArray[1].children[0].className;
    if(firstCard== secCard&& !(cardsArray[0].children[0] == cardsArray[1].children[0])){
        setTimeout(function match(){
            cardsArray[0].classList.add('match')
            cardsArray[1].classList.add('match')
        }, 1000)
    }
    else {
      setTimeout( function close1stCard(){
          cardsArray[0].classList.remove("open");
          cardsArray[0].classList.remove("show");
          cardsArray[1].classList.remove("open");
          cardsArray[1].classList.remove("show");
      } ,1000)
      }
  let correct=0;//initial value
  let stars;
  //counting the number of stars based in the Moves
  if (moves<15){
      stars = 3;
  } else if (moves<20) {
      stars = 2;
  }else if (moves<25){
      stars = 1;
  }else{
      stars = 0;
  }

  for(i = 0; i < AllCards.length; i++){
      let classN = AllCards[i].className;
      if (classN.includes("match")){
          correct++;
      }
  if(correct === 14){
      startTiming = 0;
      setTimeout(function Msg(){
          Swal.fire({
              title: 'Do you want to play again?',
              text: 'Timer: ' +time+ ' seconds, '
              +'You got '+stars+' stars, '
              +'and '+moves+'moves.',
              confirmButtonText: "Yes",
              cancelButtonText: 'No',
              showCancelButton: true,//if the user chose no
            }).then((choice) => {
                if(choice.value){
                  //playing again thus restarting the game
                  startGame();
                  timer();
                } else{
                  Swal.fire(//using the sweetalert2
                      "Thank You for playing :) ",
                    )
                }
            })
          }, 1000)
          }
}}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardsArray) {
    var currentIndex = cardsArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardsArray[currentIndex];
        cardsArray[currentIndex] = cardsArray[randomIndex];
        cardsArray[randomIndex] = temporaryValue;
    }

    return cardsArray;
}

const score = JSON.parse(localStorage.getItem('score'))||{
      wins :0,
      loses : 0,
      ties : 0
    };
    document.querySelector('.js-score').innerHTML=`Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
    
    let computerMove = '';
    let result = '';

    document.body.addEventListener('keydown',(event) => {
      if(event.key === 'r'){
        pickComputerMove('Rock');
      }else if(event.key==='p'){
         pickComputerMove('Paper');
      }else if(event.key==='s'){
         pickComputerMove('Scissors');
      }else if(event.key==='a'){
        autoplay();
      }
      else if(event.key==='Backspace'){
        resetLogic();
      }
    });
    //flow = event listeners listens the event then pass the arrowFun to his parameter it saves it and runs it , event is param for arrowFun .
      document.querySelector('.js-rock-icon').addEventListener('click',() => {
        pickComputerMove('Rock');
      });

      document.querySelector('.js-paper-icon').addEventListener('click',() => {
        pickComputerMove('Paper');
      });

      document.querySelector('.js-scissors-icon').addEventListener('click',() => {
        pickComputerMove('Scissors');
      });

      const resetBtnElm = document.querySelector('.js-resetBtn');
      resetBtnElm.addEventListener('click',() => {
        resetLogic();
      });

      

      const autoPlayElm = document.querySelector('.js-auto-play');
        autoPlayElm.addEventListener('click',() => {
          autoplay();
        });

        

        //Because the decision (start/stop) is inside autoplay() Not inside addEventListener . addEventListener role: Just listens for click . It should trigger logic, not control it

        
    let intervalId;//whenever function runs it gives different id so it created as global.
    //scenario : autoplay is on so it stores true then when we click to off if statement give false so else will run now the id that is local we don't have so it won't stop.

        let isAutoPlaying = false;//by calling function false remains same no change so auto play will not be stop

        //main function should be called and give computerized random move as player Move it will start play
        
        
      function autoplay(){
        if(!isAutoPlaying){
           intervalId = setInterval(function(){
          const playerMove = computerRandomMove();//A random  move is generated (Rock / Paper / Scissors) as player

          pickComputerMove(playerMove);//call the main function pass the parameter that function gets Computer move → random inside that.
        },1000);

        isAutoPlaying = true;
        autoPlayElm.innerHTML='Stop Playing';
      }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayElm.innerHTML='Auto play';
      }
    };  
     
    function resetLogic() {
  document.querySelector('.js-render-Question').innerHTML = `
    <div>Are you sure you want to reset the score?</div> 
    <button class="js-yesBtn">Yes</button>
    <button class="js-noBtn">No</button>
  `;

  // YES button
  document.querySelector('.js-yesBtn').addEventListener('click', () => {
    localStorage.removeItem('score');

    score.wins = 0;
    score.loses = 0;
    score.ties = 0;

    updateScoreUI();
    clearMessage();
    showReset();
  });

  // NO button
  document.querySelector('.js-noBtn').addEventListener('click', () => {
    clearMessage();
  });
}

function updateScoreUI() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
}

function clearMessage() {
  document.querySelector('.js-render-Question').innerHTML = '';
}
     


    function pickComputerMove(playerMove){
      let computerPickedMove = computerRandomMove();//computer generated computer moves
      if (playerMove === 'Rock'){
      if (computerPickedMove === 'Rock'){
        result = 'Tie';
      }
      else if(computerPickedMove === 'Paper'){
        result = 'You lose';
      }
      else if(computerPickedMove === 'Scissors'){
        result = 'You win';
      }
    }
    else if (playerMove === 'Paper'){
      if(computerPickedMove === 'Rock'){
          result = 'You win';
        }
        else if(computerPickedMove === 'Paper'){
          result = 'Tie';
        }
        else if(computerPickedMove === 'Scissors'){
          result = 'You lose';
        }
    }
    else if(playerMove === 'Scissors'){
      if(computerPickedMove === 'Rock'){
          result = 'You lose';
        }
        else if(computerPickedMove === 'Paper'){
          result = 'You won';
        }
        else if(computerPickedMove === 'Scissors'){
          result = 'Tie'; 
        }
    }
    if(result === 'You win'){
      score.wins += 1;
    }else if(result === 'You lose'){
      score.loses +=1;
    }else if(result === 'Tie'){
      score.ties +=1;
    }
    localStorage.setItem('score',JSON.stringify(score));
     const resultElem = document.querySelector('.js-result');
     resultElem.innerHTML=`${result}`;
     const moveElem =document.querySelector('.js-moves');

     moveElem.innerHTML=`You  <img class="move-emoji" src="images/${playerMove}-emoji.png" alt="${playerMove}">    <img class="move-emoji" src="images/${computerPickedMove}-emoji.png" alt="${computerPickedMove}" > Computer`;

     const scoreElem =document.querySelector('.js-score');
     scoreElem.innerHTML=`Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
    }


    function showReset(){
      const resultElem = document.querySelector('.js-result');
     resultElem.innerHTML=`Reset done`
      const moveElem =document.querySelector('.js-moves');
      moveElem.innerHTML=`Play Again`;
    }


    function computerRandomMove(){
      let randomMove  = Math.random();
       
       if(randomMove >= 0 && randomMove <1/3){
        computerMove='Rock';
        }
        else if(randomMove >= 1/3 && randomMove < 2/3){
        computerMove='Paper';
        }
        else if(randomMove >= 2/3 && randomMove < 1){
        computerMove='Scissors';
        }
        return computerMove;
    }
    
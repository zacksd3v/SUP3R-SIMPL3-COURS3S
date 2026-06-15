let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isAutoPlaying = false;
let intervalId;

const autoPlay = () => {
  const buttonElement = document.querySelector('.btn-auto-event');

  if (!isAutoPlaying) {

    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    
    isAutoPlaying = true;
    buttonElement.innerHTML = 'Stop Playing';

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    buttonElement.innerHTML = 'Auto Play'; 
  }
};

document.querySelector('.btn-auto-event')
  .addEventListener('click', () => {
    autoPlay();
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } 
});

// Exercise 12v
const resetBtn = () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
};

const showConfirmElement = () => {
  document.querySelector('.js-confirm-message').innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-confirm-yes confirm-button">Yes</button>
    <button class="js-confirm-no confirm-button">No</button>
  `;

  document.querySelector('.js-confirm-yes').
    addEventListener('click', () => {
        resetBtn();
        hideConfirmElement();
    });

  document.querySelector('.js-confirm-no')
    .addEventListener('click', () => {
        hideConfirmElement();
    });
}

const hideConfirmElement = () => {
  document.querySelector('.js-confirm-message').innerHTML = '';
};

 document.querySelector('.btn-reset')
    .addEventListener('click', () => {
        //  resetBtn();
        showConfirmElement();
    });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    showConfirmElement();
  } else if (event.key === 'a') {
    autoPlay();
  }
  
});
    

// SWITCHING TO EVENT LISTINER

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="../Lesson10/images/${playerMove}-emoji.png" class="move-icon">
<img src="../Lesson10/images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

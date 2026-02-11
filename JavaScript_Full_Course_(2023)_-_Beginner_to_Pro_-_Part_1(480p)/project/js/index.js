// 🔊 Sounds
const sounds = {
    win: new Audio('sounds/win.wav'),
    lose: new Audio('sounds/lose.wav'),
    tie: new Audio('sounds/tie.wav'),
    click: new Audio('sounds/click.wav')
};

// 🧠 Game Class
class RockPaperScissors {
    constructor() {
        this.score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            loses: 0,
            ties: 0
        };
        this.updateScore();
    }

    pickComputerMove() {
        const moves = ['Rock', 'Paper', 'Scissors'];
        return moves[Math.floor(Math.random() * 3)];
    }

    play(choice) {
        sounds.click.play();

        const computerMove = this.pickComputerMove();
        let result = 'Tie';

        if (
            (choice === 'Rock' && computerMove === 'Scissors') ||
            (choice === 'Paper' && computerMove === 'Rock') ||
            (choice === 'Scissors' && computerMove === 'Paper')
        ) {
            result = 'You Win';
            this.score.wins++;
            sounds.win.play();
            this.vibrate([100,50,100]);
        } else if (choice !== computerMove) {
            result = 'You Lose!';
            this.score.loses++;
            sounds.lose.play();
            this.vibrate([300]);
        } else {
            this.score.ties++;
            sounds.tie.play();
            this.vibrate([50]);
        }

        localStorage.setItem('score', JSON.stringify(this.score));
        this.updateUI(choice, computerMove, result);
    }

    vibrate(pattern) {
        if (navigator.vibrate) navigator.vibrate(pattern);
    }

    updateUI(choice, computerMove, result) {
        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-cmpMove').innerHTML = `
            You picked ${choice}
            <img src="images/${choice}-emoji.png" class="btn-img-emoji">
            <br>
            Computer picked ${computerMove}
            <img src="images/${computerMove}-emoji.png" class="btn-img-emoji">
        `;
        this.updateScore();
    }

    updateScore() {
        document.querySelector('.js-score').innerHTML =
            `Wins: ${this.score.wins}, Losses: ${this.score.loses}, Ties: ${this.score.ties}`;
    }

    reset() {
        this.score = { wins: 0, loses: 0, ties: 0 };
        localStorage.removeItem('score');
        this.updateScore();
    }
}

const game = new RockPaperScissors();

// ⌨️ Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'r') game.play('Rock');
    if (e.key === 'p') game.play('Paper');
    if (e.key === 's') game.play('Scissors');
});

// 🤖 Auto Play
let autoPlay = false;
let autoInterval;

function toggleAutoPlay() {
    if (!autoPlay) {
        autoInterval = setInterval(() => {
            const moves = ['Rock', 'Paper', 'Scissors'];
            game.play(moves[Math.floor(Math.random() * 3)]);
        }, 1000);
        autoPlay = true;
    } else {
        clearInterval(autoInterval);
        autoPlay = false;
    }
}


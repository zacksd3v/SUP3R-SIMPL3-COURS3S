let startTime;
let elapsedTime = 0;
let timerInterval;

document.querySelector('.start')
    .addEventListener('click', () => {
         startTime = Date.now() - elapsedTime;
    
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                displayTime(elapsedTime);
            }, 10);
    });

document.querySelector('.stop')
    .addEventListener('click', () => {
        clearInterval(timerInterval);
    });


document.querySelector('.reset')
    .addEventListener('click', () => {
        clearInterval(timerInterval);
        elapsedTime = 0;
        document.querySelector("#display").innerHTML = "00:00:00";
    })

const displayTime = (time) => {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    document.querySelector("#display").innerHTML = 
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + ":" +
        (milliseconds < 10 ? "0" : "") + milliseconds;
};
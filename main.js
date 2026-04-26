const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reactioTimeText = document.querySelector(".end-screen .reaction-time-text");
const cobaLagiButton = document.querySelector(".end-screen .coba-lagi-button");
const kategori = document.querySelector(".Kategori");

let timer;
let greenDisplayed;
let timeNow;
let waitingForStart;
let waitingForGreen;
let scores;
let categorie;

const init = () => {
    greenDisplayed = false;
    waitingForStart = false;
    waitingForGreen = false;
    scores = [];
};

init();

const setGreenColor =  () => {
    clickableArea.style.backgroundColor= "#08CB00"
    message.innerHTML = "Klik Sekarang!"
    message.style.color = "#fff"
    greenDisplayed = true;
    timeNow = Date.now ();
};

const startGame = () => {
    clickableArea.style.backgroundColor = "#F93827";
    message.innerHTML = "Tunggu sampai layar berwarna hijau!";
    message.style.color = "#fff";

    let RandomNumber = Math.floor(Math.random() * 4000 + 1000);
    timer = setTimeout(setGreenColor, RandomNumber);

    waitingForStart=false;
    waitingForGreen=true;

    console.log("Random Number: ", RandomNumber);
};


mainMenu.addEventListener("click",() => {
    mainMenu.classList.remove ("active");
    startGame ();
});

const endGame = () => {
    endScreen.classList.add("active");
    clearTimeout(timer);

    let total = 0;

    scores.forEach((s) => {
        total += s;
    });

    let averageScore = Math.round(total / scores.length);
    console.log("Total:", total);
    console.log("Average Score", averageScore);

    reactioTimeText.innerHTML = `${averageScore} ms`;
    displayKategori(averageScore);
};

const displayKategori = (averageScore) => {
    let K = "";

    if (averageScore <=350) {
        K = "Normal";
    }
    else if (averageScore >=350 && averageScore <=480) {
        K = "Kelelahan Ringan";
    }
    else if (averageScore >=480 && averageScore <=610) {
        K = "Kelelahan Sedang";
    }
    else if (averageScore >=610) {
        K = "Kelelahan Berat";
    }

   kategori.innerHTML = `${K}`;
};

const displayReactionTime = (RT) => {
    clickableArea.style.backgroundColor = "#005792";
    message.innerHTML= `<div class= 'reaction-time-text'>${RT}ms</div> Click to Continue.`;
    greenDisplayed=false;
    waitingForStart=true;
    scores.push(RT)
    console.log ("Scores:", scores);

    if (scores.length >=5) {
        endGame ();
    }
};

const displayToSoon = () => {
    clickableArea.style.backgroundColor = "#005792";
    message.innerHTML = "Terlalu Cepat! Klik untuk mengulangi";
    message.style.color = "#fff";
    waitingForStart = true;
    clearTimeout(timer);
};

clickableArea.addEventListener("click", () => {
    if (greenDisplayed) {
        let clickTime = Date.now ();
        let reactionTime = clickTime - timeNow;
        console.log( "Reaction Time:", reactionTime);
        displayReactionTime(reactionTime);
        return;
    }

    if (waitingForStart) {
        startGame ();
        return;
    }

    if (waitingForGreen) {
        displayToSoon ();
    }
});

cobaLagiButton.addEventListener("click",() => {
    endScreen.classList.remove ("active");
    init();
    startGame();
});


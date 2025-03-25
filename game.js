var level = 1;
var gameOver = true;
var colors = ["green", "red", "yellow", "blue"];
var audioPath = {
    "green": "./sounds/green.mp3",
    "red": "./sounds/red.mp3",
    "yellow": "./sounds/yellow.mp3" ,
    "blue": "./sounds/blue.mp3"
};
var sequence = [];
var currSeq = 0;

function main() {
    $(document).ready(function () {
        $(document).on("keyup", function () {
            if (gameOver === true) {
                $("h1").text("Level " + level);
                gameOver = false;
                getRandomColor();
            }
        })

        $("button").click(function (event) {
            var buttonId = event.target.id;
            if (buttonId)
                onColorClicked(buttonId, audioPath[buttonId]);
        })
    });
}

function getRandomColor() {
    var random = Math.floor(Math.random() * 4);
    let color = "#" + colors[random];
    
    sequence.push(colors[random]);
    $(color).css("background-color", "black");
    setTimeout(function() {
        $(color).css("background-color", colors[random]);
    }, 500);
}

function onColorClicked(color, audioPath) {
    var button = "#" + color;
    var audio = new Audio(audioPath);

    $(button).addClass("pressed");
    setTimeout(function() {
        $(button).removeClass("pressed");
    }, 100);
    audio.play();

    // game over
    if (sequence[currSeq] !== color)
        resetGame();
    // next level
    else if ((currSeq + 1) === sequence.length)
        nextLevel();
    else
        currSeq++;
}

function nextLevel() {
    level++;
    currSeq = 0;
    $("h1").text("Level " + level);
    setTimeout(function () {
        getRandomColor();
    }, 500);
}

function resetGame() {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").css("background-color", "red");
    setTimeout(function () {
        $("body").css("background-color", "#011f3f");
    }, 500);

    $("h1").text("Game Over, Press Any Key to Restart");

    level = 1;
    currSeq = 0;
    sequence = [];
    gameOver = true;
}

main();
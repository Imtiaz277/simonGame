let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let current = 0;

$(".btn").click(function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    animatePress(userChosenColour);

    //Check if button clicked is correct
    //Check to see if user has clicked all buttons
    
    checkAnswer(userChosenColour);

});

function nextSequence(){
    level++;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$("body").keydown(function(event){
    if(gamePattern.length == 0){
        $("h1").text("Level " + level);
        nextSequence();
    }
});

function isAnswerCorrect(gamePattern, userClickedPattern, currentIndex){
    return (gamePattern[currentIndex] == userClickedPattern[currentIndex]);
}

function checkAnswer(userChosenColour){

    if(isAnswerCorrect(gamePattern, userClickedPattern, current)){
        playSound(userChosenColour);
        current++;

        if(current == level){
            setTimeout(function(){
                current = 0;
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }
    else{
        animateBackground();
        playGameOverSound();
        $("h1").text("Game over! Press any key to continue.");
        startOver();
    }

}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    
    level = 0;
    current = 0;
}

function animateBackground(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
}

function playGameOverSound(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}
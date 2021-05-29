let userClickedPattern = [];

let gamePattern = [];

let buttonColours = ["red","blue","green","yellow"];

let randomNumber;

let randomChosenColour;

let start = false;

let level = 0;

$(document).on("keydown",function(event){
    if(!start){
        if(event.key === "Enter"){
        $("#level-title").text("Level "+level);
        nextSequence();
        start = true;
        }else{
            alert("Press Enter key to start");
        }
    }
});

function nextSequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);

    let randomNumber = () => Math.round((Math.random()*3));
    randomChosenColour = buttonColours[randomNumber()];
    gamePattern.push(randomChosenColour);

    animateSound(randomChosenColour);

    console.log(gamePattern);
}

$(".btn").on("click",function(){
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);

    animateSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animateSound(currColour){
    $("#"+currColour).fadeOut(100).fadeIn(100);
    let audio = new Audio("sounds/" + currColour + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        let wrong_audio = new Audio("sounds/wrong.mp3");
        wrong_audio.play();

        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Press Enter Key to Restart");

        gameOver();
    }
}

function gameOver(){
    gamePattern = [];
    start = false;
    level = 0;
}


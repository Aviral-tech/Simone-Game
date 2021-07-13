var gamePattern=[];
var userClickedPattern=[];
var started = false;

var buttonColors=["red","blue","green","yellow"];
var randomChosenColor=buttonColors[0];
var level=0;



function nextSeq(){
    userClickedPattern = [];
    var randNum=Math.random();
    randNum=randNum*3;
    randNum=Math.floor(randNum)+1;
    randomChosenColor=buttonColors[randNum];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChosenColor);

    level++;
    $("h1").text("Level "+level);
    
}
function playSound(keyChosen){
    if(keyChosen=="red"){
        var red=new Audio("sounds/red.mp3");
        red.play();
    }
    else if(keyChosen=="blue"){
        var blue=new Audio("sounds/blue.mp3");
        blue.play();
    }
    else if(keyChosen=="green"){
        var green=new Audio("sounds/green.mp3");
        green.play();
    }
    else if(keyChosen=="yellow"){
        var yellow=new Audio("sounds/yellow.mp3");
        yellow.play();
    }
}
function animatepress(userChosenColor){
    $("#"+userChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(index){
    if(userClickedPattern[index]===gamePattern[index]){
            console.log("success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSeq();
          }, 1000);
        }
  
    }
    else{
        console.log("wrong");
        var wrong=new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    started = false;
    level=0;
}




$(".btn").click(function (e) { 
    var userChosenColor=$(this).attr("id");
    playSound(userChosenColor);
    animatepress(userChosenColor);
    
    
    userClickedPattern.push(userChosenColor);  
    checkAnswer(userClickedPattern.length-1) ;
});


//************************************************Starting the game***************************************************//
$(document).keydown(function (e) { 
    if (!started){
        $("h1").text("Level "+level);
        nextSeq();
        started=true;
    }
});







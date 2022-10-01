alert("To play the game, simply repeat the pattern of the memes. Good luck!");

var buttonImages = ["meme1", "meme2", "meme3", "meme4", "meme5", "meme6"];

var gamePattern = [];
var userClickPattern = [];

var started = false;
var level = 0;

$(document).keydown(function (){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (){

  var userChosenMeme = $(this).attr("id");
  userClickPattern.push(userChosenMeme);

  playSound(userChosenMeme);
  animatePress(userChosenMeme);

  checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("whilemScream");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over Bitch. Press Any Key to Restart");

    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 1000);

    startOver();
  }
}

function nextSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 6);
  var randomChosenMeme = buttonImages[randomNumber];
  gamePattern.push(randomChosenMeme);

  $("#" + randomChosenMeme).fadeIn(100).fadeOut(100).fadeIn(100);
  $("img.level-img").attr("src", "level" + level + ".JPG")
  playSound(randomChosenMeme);
}

function animatePress(currentMeme){
  $("#" + currentMeme).addClass("pressed");
  setTimeout(function () {
    $("#" + currentMeme).removeClass("pressed")
  }, 100);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

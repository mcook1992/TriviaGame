"use strict";

var timerCount = 10;
var currentCorrectAnswer = "";
var currentQuestionNumber = 0;
var giphLink = "";
var numberOfRightAnswers = 0;
var numberOfWrongAnswers = 0;
var countdown;

var question1 = {
  questionText: "Who is the best?",

  Answer1: { text: "You", value: false },

  Answer2: { text: "Me", value: false },

  Answer3: { text: "I", value: false },

  Answer4: { text: "Correct", value: true },

  correctAnswer: "Correct",

  link: "assets/images/darth-vader.jpg"
};

var question2 = {
  questionText: "Who is the worst? Question two",

  Answer1: { text: "Me", value: false },

  Answer2: { text: "Correct", value: true },

  Answer3: { text: "I", value: false },

  Answer4: { text: "Who?", value: false },

  correctAnswer: "Correct",

  link: "assets/images/darth-vader.jpg"
};

var questionArray = [question1, question2];

$("#start").click(function() {
  $("#start").addClass("d-none");
  $(".answer").removeClass("d-none");
  $(".explanationText").addClass("d-none");
  setUpQuestion();
});

$("#restart").click(function() {
  restart();
});

function setUpQuestion() {
  $(".questionText").text(questionArray[currentQuestionNumber].questionText);

  //getting answer one text and value
  $(".answer1").text(questionArray[currentQuestionNumber].Answer1.text);

  //getting answer two text and value
  $(".answer2").text(questionArray[currentQuestionNumber].Answer2.text);

  //getting question 3 info
  $(".answer3").text(questionArray[currentQuestionNumber].Answer3.text);

  //getting answer four
  $(".answer4").text(questionArray[currentQuestionNumber].Answer4.text);

  currentCorrectAnswer = questionArray[currentQuestionNumber].correctAnswer;

  giphLink = questionArray[currentQuestionNumber].link;

  // Code below works, but is annoying so will not count yet.

  timerCount = 30;
  $("#timeDisplay").text(timerCount);

  countdown = setInterval(timerCountDown, 1000);
}

$(".answer").on("click", function() {
  // console.log("CurrentcorrectAnswer: " + currentCorrectAnswer);

  clearInterval(countdown);

  countdown = 0;

  var comparisonAnswer = $(this).text();

  if (currentCorrectAnswer == comparisonAnswer) {
    correctAnswer();
  } else {
    wrongAnswer("Not quite");
  }
});

function timerCountDown() {
  timerCount = timerCount - 1;
  $("#timeDisplay").text(timerCount);
  if (timerCount == 0) {
    clearInterval(countdown);

    countdown = 0;

    wrongAnswer("Your ran out of time");
  }
}

// $("#timeDisplay");

function correctAnswer() {
  //changing the main text to tell the user what they got right
  $(".questionText").text("Great job!");

  //adding in the explanation text beneath the right or wrong answer
  $(".explanationText").removeClass("d-none");
  $(".explanationText").text("The correct answer was: " + currentCorrectAnswer);

  //getting rid of the spaces
  $("br").addClass("d-none");

  //hiding the other answer texts
  $(".answer").addClass("d-none");

  //adding in the appropriate image/gif
  $(".holder").removeClass("d-none");
  $(".image").attr("src", giphLink);

  //increasing number of right answers
  numberOfRightAnswers++;

  //setting up the next question

  setTimeout(nextQuestion, 3000);
}

function wrongAnswer(text) {
  $(".questionText").text(text);
  $(".explanationText").removeClass("d-none");
  $(".explanationText").text("The correct answer was: " + currentCorrectAnswer);
  $("br").addClass("d-none");
  $(".answer").addClass("d-none");
  $(".holder").removeClass("d-none");
  $(".image").attr("src", giphLink);
  numberOfWrongAnswers++;
  setTimeout(nextQuestion, 3000);
}

function goToWinPage() {
  window.location.href = "winPage.html";
}

function goToLosePage() {
  window.location.href = "losePage.html";
}

function nextQuestion() {
  currentQuestionNumber++;
  // checkforEnding();

  if (currentQuestionNumber == questionArray.length) {
    $(".buttonWrapper").removeClass("d-none");
    //bring back spaces between answers
    $("br").removeClass("d-none");

    //get rid of the hover over the answer function:
    $(".answer").addClass("noBackground");

    //get rid of the timer

    $("#wrapper").addClass("d-none");

    $(".questionText").text("You've reached the end of the quiz");
    $(".answer").removeClass("d-none");
    $(".answer1").text("Number of correct answers: " + numberOfRightAnswers);
    $(".answer2").text("Number of incorrect answers: " + numberOfWrongAnswers);
    $(".answer3").text("Score: " + numberOfRightAnswers / 2);
    $(".answer4").text("Click the restart button below to play again");
    $(".explanationText").addClass("d-none");
    $(".holder").addClass("d-none");

    // console.log("time to restart)");
  } else {
    $(".answer").removeClass("d-none");
    $("br").removeClass("d-none");
    $(".explanationText").addClass("d-none");
    $(".holder").addClass("d-none");
    setUpQuestion();
  }
}

// function checkforEnding() {
//   console.log(currentQuestionNumber);
// }

function restart() {
  currentQuestionNumber = 0;
  // $(".answer").removeClass("d-none");
  // $(".explanationText").addClass("d-none");
  $(".holder").addClass("d-none");
  setUpQuestion();
  $(".buttonWrapper").addClass("d-none");
  $("#wrapper").removeClass("d-none");
  //bringing back the highlighted answers

  $(".answer").removeClass("noBackground");
}

// function outOfTime() {}

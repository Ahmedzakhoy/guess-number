"use strict";
import { randomNumber, displayMessage, storeData } from "./helpers.js";

//selections from HTML
const allLevelsBtns = document.querySelectorAll(".top div");
const easyBtn = document.querySelector(".easy");
const intermediateBtn = document.querySelector(".intermediate");
const hardBtn = document.querySelector(".hard");
const checkBtn = document.querySelector(".check");
const guessInput = document.querySelector(".guess");

//variables to be used with their default value
let allData;
let level = 1;
let correctNumber;
let score = 0;
let startingScore = 20;
let randomNumberLimit = 20;
let difficultyElement = easyBtn;
let highScore1 = 0;
let highScore2 = 0;
let highScore3 = 0;

//reset functions
function resetFunctionality(
  randomVar = 20,
  startingVar = 20,
  highScoreVar,
  store
) {
  randomNumberLimit = randomVar;
  startingScore = startingVar;
  correctNumber = randomNumber(randomNumberLimit);
  score = startingScore;
  displayMessage(".score", score);
  displayMessage(".highscore", highScoreVar);
  displayMessage(".message", "Start guessing...");
  document.querySelector("body").style.backgroundColor = "";
  document.querySelector(".guess").value = "";
  displayMessage(".number", "?");
  store ? storeData(level, highScore1, highScore2, highScore3) : "";
}

//set level
function setLevel(store) {
  if (level === 1) {
    resetFunctionality(20, 20, highScore1, store);
  } else if (level === 2) {
    resetFunctionality(100, 10, highScore2, store);
  } else if (level === 3) {
    resetFunctionality(500, 7, highScore3, store);
  }
}

//level change event handler
const setLevelEventHandler = function (
  levelPara,
  upperLimitNumber,
  difficultyElement,
  store = true
) {
  level = levelPara;
  setLevel(store);
  allLevelsBtns.forEach((el) => el.classList.remove("active"));
  difficultyElement.classList.add("active");
  displayMessage(".between", `(Between 1 and ${upperLimitNumber})`);
};

//level buttons event listeners
easyBtn.addEventListener("click", () => setLevelEventHandler(1, 20, easyBtn));
intermediateBtn.addEventListener("click", () =>
  setLevelEventHandler(2, 100, intermediateBtn)
);
hardBtn.addEventListener("click", () => setLevelEventHandler(3, 500, hardBtn));

//enter key event
window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkBtn.click();
  }
});

//main functionality
checkBtn.addEventListener("click", function () {
  let input = Number(guessInput.value);
  guessInput.value = "";

  function highScoreUpdate(highScoreVar) {
    displayMessage(".highscore", highScoreVar);
    storeData(level, highScore1, highScore2, highScore3);
  }
  if (!input) {
    displayMessage(".message", "⛔ empty or zero is not accepted");
  } else if (input === correctNumber) {
    displayMessage(".message", "🎉 great job");
    document.querySelector("body").style.backgroundColor = "#60b347";
    displayMessage(".number", correctNumber);
    if (level === 1 && score > highScore1) {
      highScore1 = score;
      highScoreUpdate(highScore1);
    } else if (level === 2 && score > highScore2) {
      highScore2 = score;
      highScoreUpdate(highScore2);
    } else if (level === 3 && score > highScore3) {
      highScore3 = score;
      highScoreUpdate(highScore3);
    }
  } else if (input !== correctNumber) {
    if (score > 1) {
      displayMessage(
        ".message",
        input > correctNumber ? "👆 too High" : "👇 too Low"
      );
      score--;
      displayMessage(".score", score);
    } else {
      displayMessage(".message", "😭 You Lost! Try again!");
      displayMessage(".score", 0);
    }
  }
});

//again button
document.querySelector(".again").addEventListener("click", function () {
  setLevel();
});

//reset data button
document.querySelector(".reset").addEventListener("click", function () {
  localStorage.clear();
  highScore1 = highScore2 = highScore3 = 0;
  setLevelEventHandler(1, 20, easyBtn, false);
  resetFunctionality(20, 20, 0, false);
});

//init function
function init() {
  allData = JSON.parse(localStorage.getItem("data"));
  level = allData?.level ? allData.level : 1;
  if (level === 1) {
    difficultyElement = easyBtn;
  } else if (level === 2) {
    difficultyElement = intermediateBtn;
  } else if (level === 3) {
    difficultyElement = hardBtn;
  }
  highScore1 = allData?.highScore1 ? allData.highScore1 : 0;
  highScore2 = allData?.highScore2 ? allData.highScore2 : 0;
  highScore3 = allData?.highScore3 ? allData.highScore3 : 0;
  setLevelEventHandler(level, randomNumberLimit, difficultyElement, false);
}

//call init function
init();

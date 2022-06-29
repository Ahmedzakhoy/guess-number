"use strict";

//functions
function randomNumber(range = 20) {
  return Math.trunc(Math.random() * range) + 1;
}
function startingScore(number = 20) {
  return number;
}
let displayMessage = function ($class, text) {
  document.querySelector(`${$class}`).textContent = text;
};

//selections
const allLevels = document.querySelectorAll(".top div");
const easy = document.querySelector(".easy");
const intermediate = document.querySelector(".intermediate");
const hard = document.querySelector(".hard");
const check = document.querySelector(".check");
const guessInput = document.querySelector(".guess");
//variables
let allData;
let level = 1;
let correctNumber,
  score,
  starting = startingScore(20),
  randomLimit = 20,
  element;
let highScore1 = 0;
let highScore2 = 0;
let highScore3 = 0;

//store data function
function storeData() {
  allData = {
    randomLimit: randomLimit,
    level: level,
    highScore1: highScore1,
    highScore2: highScore2,
    highScore3: highScore3,
  };
  localStorage.setItem("data", JSON.stringify(allData));
}

//level functions
function setLevelFunction(
  randomVar = 20,
  startingVar = 20,
  highScoreVar,
  store
) {
  randomLimit = randomVar;
  starting = startingVar;
  correctNumber = randomNumber(randomLimit);
  score = startingScore(starting);
  displayMessage(".score", score);
  displayMessage(".highscore", highScoreVar);
  displayMessage(".message", "Start guessing...");
  document.querySelector("body").style.backgroundColor = "";
  document.querySelector(".guess").value = "";
  displayMessage(".number", "?");
  store ? storeData() : "";
}

//set level
function setLevel(store) {
  if (level === 1) {
    setLevelFunction(20, 20, highScore1, store);
  } else if (level === 2) {
    setLevelFunction(100, 10, highScore2, store);
  } else if (level === 3) {
    setLevelFunction(500, 7, highScore3, store);
  }
}

//level change event handler
const setLevelEventHandler = function (
  levelPara,
  number,
  element,
  store = true
) {
  level = levelPara;
  setLevel(store);
  allLevels.forEach((el) => el.classList.remove("active"));
  element.classList.add("active");
  displayMessage(".between", `(Between 1 and ${number})`);
};

//level buttons event handlers
easy.addEventListener("click", () => setLevelEventHandler(1, 20, easy));
intermediate.addEventListener("click", () =>
  setLevelEventHandler(2, 100, intermediate)
);
hard.addEventListener("click", () => setLevelEventHandler(3, 500, hard));

//main functionality
check.addEventListener("click", function () {
  let input = Number(guessInput.value);
  guessInput.value = "";

  function highScoreUpdate(highScoreVar) {
    displayMessage(".highscore", highScoreVar);
    storeData();
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

//enter key event
window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    check.click();
  }
});

//init function
function init() {
  allData = JSON.parse(localStorage.getItem("data"));
  level = allData?.level ? allData.level : 1;
  if (level === 1) {
    element = easy;
  } else if (level === 2) {
    element = intermediate;
  } else if (level === 3) {
    element = hard;
  }
  randomLimit = allData?.randomLimit ? allData.randomLimit : 20;
  highScore1 = allData?.highScore1 ? allData.highScore1 : 0;
  highScore2 = allData?.highScore2 ? allData.highScore2 : 0;
  highScore3 = allData?.highScore3 ? allData.highScore3 : 0;
  setLevelEventHandler(level, randomLimit, element, false);
}
init();

//again button
document.querySelector(".again").addEventListener("click", function () {
  setLevel();
});

//reset data button
document.querySelector(".reset").addEventListener("click", function () {
  localStorage.clear();
  highScore1 = highScore2 = highScore3 = 0;
  setLevelEventHandler(1, 20, easy, false);
  setLevelFunction(20, 20, 0, false);
});

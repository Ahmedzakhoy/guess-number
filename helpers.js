//function 1
export function randomNumber(range = 20) {
  return Math.trunc(Math.random() * range) + 1;
}

//function 2
export let displayMessage = function ($class, text) {
  document.querySelector(`${$class}`).textContent = text;
};

//store data function 3
export function storeData(level, highScore1, highScore2, highScore3) {
  const allData = {
    level,
    highScore1,
    highScore2,
    highScore3,
  };
  localStorage.setItem("data", JSON.stringify(allData));
  return allData;
}

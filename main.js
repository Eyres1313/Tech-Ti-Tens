// hide the true or false button until next is pressed
const tfButton = document.getElementById("tf-buttons");
tfButton.style.display = "none";

const noScore = document.getElementById("score");
noScore.style.display = "none";

const nextButton = document.getElementById("NB");

let answered = false;

function randomNumber() {
  const num = Math.floor(Math.random() * 19) + 1;
  return num;
}
// nextButton.addEventListener("click", async function () {
//   getData(2);
// });

//pulse the background red when clicking wrong answer

function pulseBackgroundred() {
  document.body.style.backgroundColor = "red"; // Set initial background color to red
  setTimeout(function () {
    body.style.backgroundColor = "#6ca3d7"; // Set final background original colour after 2 seconds
  }, 2000);
}

async function getData() {
  const questionId = randomNumber();
  // Declare a variable to store the HTTP response
  const response = await fetch(
    `https://revisiontool-kqj5.onrender.com/quiz/${questionId}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  // Check if the response failed, and if so log an error and halt the app
  if (!response.ok) {
    console.error(`Status: ${response.status}`);
    console.error(`Text: ${await response.text()}`);
    return;
  }

  // return the parsed JSON from the response
  const data = await response.json();
  return data;
}

const placeholderText = document.getElementById("statement-text");
// when next is clicked show T&F buttons -
// when next is clicked generate a random number to fetch the statment by id
// ( strech--- make it so a statment isnt returned more than once)
// when next is clicked replace the placeholder text with a statment
// send get request to api to fetch the statment
// store the answer in a variable
//taget the border

let response = "";

let score = 0;

const scoreDisplay = document.getElementById("score");
const body = document.body;
const container = document.getElementById("container");
nextButton.addEventListener("click", async function () {
  answered = false;
  response = await getData();
  console.log(response);
  //store speonses in variables
  let statement = response.data.statement;
  console.log(statement);
  let correctAns = response.data.answer;
  console.log(correctAns);
  //display the tf buttons
  tfButton.style.display = "flex";
  noScore.style.display = "flex";
  //change placeholder text to statement text
  placeholderText.innerHTML = statement;
  container.style.border = "solid 10px #e69138";
});

// target the true button
const trueButton = document.getElementById("true-button");

// target the false button
const falseButton = document.getElementById("false-button");

// for true button
trueButton.addEventListener("click", async function () {
  // const response = await getData();
  if (!answered) {
    answered = true;
    let correctAns = response.data.answer;
    if (correctAns === "True") {
      placeholderText.innerHTML = "Correct";
      container.style.border = "10px solid green";
      body.style.backgroundColor = "green"; // Set initial background color to red
      setTimeout(function () {
        document.body.style.backgroundColor = "#6ca3d7"; // Set final background original colour after 1 second
      }, 1000);
      score++;
    } else if (correctAns === "False") {
      placeholderText.innerHTML = "Incorrect";
      container.style.border = "10px solid red";
      body.style.backgroundColor = "red"; // Set initial background color to red
      setTimeout(function () {
        document.body.style.backgroundColor = "#6ca3d7"; // Set final background original colour after 1 second
      }, 1000);
    }
  }
  updateScore();
});

falseButton.addEventListener("click", async function () {
  // const response = await getData();
  if (!answered) {
    answered = true;
    let correctAns = response.data.answer;
    if (correctAns === "False") {
      placeholderText.innerHTML = "Correct";
      container.style.border = "10px solid green";
      body.style.backgroundColor = "green"; // Set initial background color to red
      setTimeout(function () {
        document.body.style.backgroundColor = "#6ca3d7"; // Set final background original colour after 1 second
      }, 1000);
      score++;
    } else if (correctAns === "True") {
      placeholderText.innerHTML = "Incorrect";
      container.style.border = "10px solid red";
      body.style.backgroundColor = "red"; // Set initial background color to red
      setTimeout(function () {
        document.body.style.backgroundColor = "#6ca3d7"; // Set final background original colour after 1 second
      }, 1000);
    }
    updateScore();
  }
});

function updateScore() {
  scoreDisplay.innerHTML = `Score: ${score}`;
}
// async function nextStatement() {
//     console.log('We are a go');

// }
// listen for button click and compare user answer to response answer
// if true, change boarder colour to green and display "well done this is true-press next to continue"
// display next question

#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { getRandIndex, handleAnswer, printLeadInfo } from "./helpers.js";
import data from "./data.js";

let askedQuestions = {
    level: 0
  },
  playerName;
async function welcome() {
  await printLeadInfo("Nigeria History");
  console.log(`
      ${chalk.bgBlue("HOW TO PLAY")} 
      I am a process on your computer.
      If you get any question wrong I will be ${chalk.bgRed("killed")}
      So get all the questions right...
  
    `);
}
const askName = async () => {
  const answers = await inquirer.prompt({
    name: "playerName",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    }
  });

  playerName = answers.playerName;
};

const startJubilating = async () => {
  await printLeadInfo(`Congratulation niaja historian`);
  console.clear();
  figlet(`${playerName} wins`, (_, data) => {
    data && console.log(gradient.pastel.multiline(data) + "\n");
    console.log(
      chalk.green(
        `Programming isn't about what you know; it's about making the command line look cool`
      )
    );
    process.exit(0);
  });
};
async function askQuestion() {
  const dificultyData =
    data[
      askedQuestions.level < 5
        ? "easy"
        : askedQuestions.level < 10
        ? "normal"
        : "hard"
    ];
  let qIndex = getRandIndex(dificultyData.length);
  if (askedQuestions.level % 5 === 0)
    askedQuestions = {
      level: askedQuestions.level
    };
  if (!askedQuestions[qIndex]) {
    askedQuestions.level++;
    askedQuestions[qIndex] = true;
    console.log(chalk.bgBlue(`Question ${askedQuestions.level}`));
    const answers = await inquirer.prompt({
      name: dificultyData[qIndex].id,
      type: "rawlist",
      message: dificultyData[qIndex].question,
      choices: dificultyData[qIndex].choices
    });
    await handleAnswer(
      answers[dificultyData[qIndex].id] ===
        dificultyData[qIndex].choices[dificultyData[qIndex].answer],
      playerName,
      !(askedQuestions.level % 5 === 0)
    );
    if (askedQuestions.level === 5)
      await printLeadInfo(`Weldone ${playerName}`);
    else if (askedQuestions.level === 10)
      await printLeadInfo(`Your knowledge of nigeria history is good.`);
    else if (askedQuestions.level === 15) await startJubilating();

    if (
      askedQuestions.level !==
      data.easy.length + data.normal.length + data.hard.length
    )
      await askQuestion();
    else await startJubilating();
  } else await askQuestion(false);
}
// await welcome();
// await askName();
// await askQuestion();
console.log(process.argv);

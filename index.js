#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import {
  getRandIndex,
  handleAnswer,
  printLeadInfo,
  handleRePlay,
  shuffleArray
} from "./helpers";
import data from "./data";

let askedQuestions = {},
  level = "Easy",
  questions = [],
  playerName;

async function welcome() {
  await printLeadInfo("Welcome to nigeria History");

  console.log(` 
      I am a process on your computer.
      If you get any question wrong I will be ${chalk.bgRed("killed")}
      So get all the questions right...

      ${chalk.yellow("[NOTE]")}

      Use arrow key or number selection to provide answer.
      Last updated ©2023.

      ${chalk.yellow("[Preference]")}
    `);
}

const getUserPreference = async () => {
  const answers = await inquirer.prompt([
    {
      name: "playerName",
      type: "input",
      message: "What is your name?",
      default() {
        return playerName || "Player-n";
      }
    },
    {
      name: "level",
      type: "rawlist",
      message: "Preferred level?",
      choices: ["Easy", "Intermediate", "Hard"],
      default() {
        return level || "Easy";
      }
    }
  ]);

  level = answers.level;
  playerName = answers.playerName;
  questions = data[level.toLowerCase()];
};

const restart = async prompt => {
  if (prompt) await getUserPreference();

  askedQuestions = {};

  await askQuestion();
};

const startJubilating = async () => {
  await printLeadInfo(`Congratulation niaja historian`);

  figlet(`${playerName} wins`, async (_, data) => {
    data && console.log(gradient.pastel.multiline(data) + "\n");

    const replay = await handleRePlay();

    if (replay) restart(true);
    else {
      console.log(
        chalk.green(
          `Programming isn't about what you know; it's about making the command line look cool`
        )
      );

      process.exit(0);
    }
  });
};

async function askQuestion() {
  let qIndex = getRandIndex(questions.length);

  let totalQAsked = Object.keys(askedQuestions).length;

  if (askedQuestions[qIndex]) await askQuestion();
  else {
    askedQuestions[qIndex] = true;
    totalQAsked = totalQAsked + 1;

    console.log(chalk.bgBlue(`Question ${totalQAsked}`));

    const answers = await inquirer.prompt({
      name: questions[qIndex].id,
      type: "rawlist",
      message: questions[qIndex].question,
      choices: shuffleArray(questions[qIndex].choices)
    });

    await handleAnswer(
      answers[questions[qIndex].id],
      questions[qIndex].answer,
      playerName,
      async replay => {
        if (replay) restart();
        else {
          if (totalQAsked === 5) await printLeadInfo(`Weldone ${playerName}`);
          else if (totalQAsked === 10)
            await printLeadInfo(
              `Wow! Your knowledge of nigeria history is good.`
            );

          if (totalQAsked !== questions.length) await askQuestion();
          else await startJubilating();
        }
      }
    );
  }
}

await welcome();
await getUserPreference();
await askQuestion();

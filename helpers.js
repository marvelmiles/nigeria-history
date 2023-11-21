import { createSpinner } from "nanospinner";
import chalkAnimation from "chalkercli";
import inquirer from "inquirer";

export const sleep = (ms = 500) =>
  new Promise(r => {
    const t = setTimeout(() => {
      clearTimeout(t);
      r();
    }, ms);
  });

export const handleRePlay = async () => {
  const { replay } = await inquirer.prompt({
    name: "replay",
    type: "list",
    choices: ["Yes", "No"],
    message: "Do you want to start Again?",
    default() {
      return "Yes";
    }
  });

  return replay === "Yes";
};

export const handleAnswer = async (answer, correctAnswer, playerName, cb) => {
  const spinner = createSpinner("Checking answer...").start();

  await sleep();

  if (answer === correctAnswer) {
    spinner.success({ text: `Weldone!` });
    cb();
  } else {
    spinner.error({ text: `Game over, you lose ${playerName}!` });
    spinner.success({ text: `Correct answer: ${correctAnswer}` });

    const replay = await handleRePlay();

    if (replay) cb(replay);
    else process.exit(1);
  }
};

export const getRandIndex = (length = 1) => {
  return Math.floor(Math.floor(Math.random() * length));
};

export const printLeadInfo = async info => {
  const rainbowTitle = chalkAnimation.rainbow(info);
  await sleep(1500);
  rainbowTitle.stop();
};

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

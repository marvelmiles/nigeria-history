import { createSpinner } from "nanospinner";
import chalkAnimation from "chalkercli";

export const sleep = (ms = 500) => new Promise(r => setTimeout(r, ms));

export const handleAnswer = async (
  isCorrect,
  playerName,
  logText = true,
  text
) => {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: logText ? `Nice work ${playerName}` : "" });
  } else {
    spinner.error({ text: `Game over, you lose ${playerName}!` });
    process.exit(1);
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

import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

function containsBannedChars(word) {
  return bannedchars.some((char) => word.includes(char));
}

function showrules() {
  console.log(
    "Each word must be at least three letters long, contain no special characters or spaces, and start with the last letter of the previous word—otherwise, the game ends."
  );
}

let wordsall = [];

let bannedchars = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "'",
  '"',
  "\\",
  "|",
  ",",
  "<",
  ".",
  ">",
  "/",
  "?",
  " ",
  "\t",
  "\n",
  "~",
];

console.log(
  "Hello, this is the word chain game. You need to continue the chain by writing a word that starts with the last letter of the previous word."
);

let firstword = prompt("Write the first word: /:!quit/!rule/!checkwords ");

if (firstword === "!quit") {
  process.exit(0);
} else if (firstword === "!rule") {
  showrules();
  firstword = prompt("Please give the first word: ");
}

while (firstword.length < 3 || containsBannedChars(firstword)) {
  console.log("Invalid word");
  firstword = prompt("Please give the correct first word: ");
  if (firstword === "!quit") {
    process.exit(0);
  } else if (firstword === "!rule") {
    showrules();
  }
}

wordsall.push(firstword);

function newword() {
  let lastword = wordsall[wordsall.length - 1];
  let lastletter = lastword[lastword.length - 1];

  let word = prompt(
    `Please give me a word at least 3 characters long that starts with "${lastletter}": `
  );

  if (word === "!quit") {
    console.log("Okay. Goodbye!");
    return;
  }

  if (word === "!rule") {
    showrules();
    return newword();
  }
  if (word === "!checkwords") {
    console.log(wordsall);
    return newword();
  }

  while (
    word.length < 3 ||
    containsBannedChars(word) ||
    wordsall.includes(word)
  ) {
    word = prompt("Wrong word. Check the rules: ");
    if (word === "!quit") {
      console.log("Okay. Goodbye!");
      return;
    }
    if (word === "!rule") {
      showrules();
      return newword();
    }
  }

  if (word[0] === lastletter) {
    console.log("Your word is perfect.");
    wordsall.push(word);
    newword();
  } else {
    console.log(`Wrong word. It must start with "${lastletter}". Game over.`);
  }
}

newword();

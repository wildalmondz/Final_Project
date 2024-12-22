const fs = require("fs");
const readline = require("readline");

// Load JSON data dynamically
const dataFile = "./data.json"; // Replace with your JSON file path
let data;
try {
  data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
} catch (error) {
  console.error("Error loading JSON file:", error.message);
  process.exit(1);
}

// Load or initialize saved progress
const progressFile = "./progress.json";
let currentIndex = 0;
try {
  if (fs.existsSync(progressFile)) {
    const savedProgress = JSON.parse(fs.readFileSync(progressFile, "utf-8"));
    currentIndex = savedProgress.index || 0;
  }
} catch (error) {
  console.error("Error loading progress file:", error.message);
}

// Display the current element
function displayElement(index) {
  const element = data.elements[index];
  console.log(`ID: ${element.id}`);
  console.log(`Name: ${element.name}`);
  console.log(`Text: ${element.text}`);
  console.log(`Position: ${element.position}`);
  console.log("----------------------------");
}

// Save current progress
function saveProgress(index) {
  fs.writeFileSync(progressFile, JSON.stringify({ index }));
}

// Display all elements
function displayAll() {
  console.log("All Elements:");
  data.elements.forEach((el) => {
    console.log(`ID: ${el.id}, Name: ${el.name}, Position: ${el.position}`);
  });
  console.log("----------------------------");
}

// Search for elements by name or position
function searchElements(key, value) {
  const results = data.elements.filter((el) => el[key] && el[key].toLowerCase() === value.toLowerCase());
  if (results.length > 0) {
    console.log(`Search Results for ${key} = "${value}":`);
    results.forEach((el) => console.log(`ID: ${el.id}, Name: ${el.name}, Position: ${el.position}`));
  } else {
    console.log(`No elements found with ${key} = "${value}".`);
  }
}

// Edit an element
function editElement(index) {
  const element = data.elements[index];
  rl.question(`Edit Name (current: ${element.name}): `, (name) => {
    if (name) element.name = name;
    rl.question(`Edit Text (current: ${element.text}): `, (text) => {
      if (text) element.text = text;
      rl.question(`Edit Position (current: ${element.position}): `, (position) => {
        if (position) element.position = position;
        console.log("Element updated successfully!");
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        displayElement(index);
        promptUser();
      });
    });
  });
}

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Command loop
function promptUser() {
  rl.question("Enter command ('n' for next, 'p' for previous, 'q' to quit, 'j' to jump to ID, 's' to search, 'e' to edit, 'a' to display all): ", (input) => {
    input = input.toLowerCase();

    if (input === "n") {
      if (currentIndex < data.ids.length - 1) {
        currentIndex++;
        displayElement(currentIndex);
      } else {
        console.log("You are at the last element. 'Next' is not possible.");
      }
    } else if (input === "p") {
      if (currentIndex > 0) {
        currentIndex--;
        displayElement(currentIndex);
      } else {
        console.log("You are at the first element. 'Previous' is not possible.");
      }
    } else if (input === "j") {
      rl.question("Enter ID to jump to: ", (id) => {
        const index = data.elements.findIndex((el) => el.id === parseInt(id, 10));
        if (index !== -1) {
          currentIndex = index;
          displayElement(currentIndex);
        } else {
          console.log("ID not found.");
        }
        promptUser();
      });
    } else if (input === "s") {
      rl.question("Search by 'name' or 'position': ", (key) => {
        if (key === "name" || key === "position") {
          rl.question(`Enter ${key}: `, (value) => {
            searchElements(key, value);
            promptUser();
          });
        } else {
          console.log("Invalid search key. Use 'name' or 'position'.");
          promptUser();
        }
      });
    } else if (input === "e") {
      editElement(currentIndex);
    } else if (input === "a") {
      displayAll();
      promptUser();
    } else if (input === "q") {
      console.log("Exiting...");
      saveProgress(currentIndex);
      rl.close();
      return;
    } else {
      console.log("Invalid command. Try again.");
      promptUser();
    }
  });
}

// Start the program
console.log("Starting navigation:");
displayElement(currentIndex);
promptUser();
// STEP 1: Load tools (like unpacking toys)
const axios = require('axios'); // Tool to talk to GitHub
const chalk = require('chalk').default; // Tool to color text
require('dotenv').config(); // Tool to read .env file

// STEP 2: Ask GitHub for user activity
async function fetchActivity(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/events/public`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`, // Send password
        },
      }
    );
    return response.data; // GitHub's reply
  } catch (error) {
    console.log(chalk.red('Error:'), error.message);
    process.exit(1); // Quit if something goes wrong
  }
}

// STEP 3: Show the activity in colors!
function showActivity(activity) {
  const recentEvents = activity.slice(0, 8); // Only show 5 events

  recentEvents.forEach((event) => {
    const date = new Date(event.created_at).toLocaleDateString();
    let message = '';

    // Decide what emoji/color to use
    switch (event.type) {
      case 'PushEvent':
        message = chalk.green(`🚀 Pushed to ${event.repo.name}`);
        break;
      case 'CreateEvent':
        message = chalk.blue(`🆕 Created ${event.repo.name}`);
        break;
      case 'IssueCommentEvent':
        message = chalk.yellow(`💬 Commented on issue: ${event.payload.issue.title}`);
        break;
      default:
        message = chalk.gray(`❓ Unknown event: ${event.type}`);
    }

    console.log(`${chalk.bold(date)}: ${message}`);
  });
}

// STEP 4: Run the program!
async function main() {
  const username = process.argv[2]; // Get username from terminal

  if (!username) {
    console.log(chalk.red('Error: Please type a username! Example:'));
    console.log(chalk.cyan('node index.js ElonMusk'));
    return;
  }

  console.log(chalk.yellow(`🔍 Searching for ${username}...`));
  const activity = await fetchActivity(username);
  showActivity(activity);
}

main();
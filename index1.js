// This is the another way to fetch the data from the github using fetch()
//instead of using the axios

const username = 'your_github_user_name'; // Replace with any GitHub username

async function fetchGitHubActivity(user) {
  try {
    const response = await fetch(`https://api.github.com/users/${user}/events/public`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const events = await response.json();
    console.log(events);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

fetchGitHubActivity(username);

// Get the navigation menu items
const navItems = document.querySelectorAll('nav ul li a');

// Get the claim button
const claimButton = document.querySelector('#claim-button');

// Get the sign-in button
const signInButton = document.querySelector('#sign-in-button');

// Get the tap button
const tapButton = document.querySelector('#tap-button');

// Get the balance element
const balanceElement = document.querySelector('#balance');

// Get the transactions element
const transactionsElement = document.querySelector('#transactions');

// Initialize the user data
let userData = {};

// Check if user data is already stored in local storage
if (localStorage.getItem('userData')) {
userData = JSON.parse(localStorage.getItem('userData'));
} else {
// If no user data is found, initialize with default values
userData = {
balance: 0,
transactionHistory: [],
lastClaimTime: null,
lastSignInTime: null
};
localStorage.setItem('userData', JSON.stringify(userData));
}

// Update the balance element
balanceElement.textContent = `PREMICOIN:🪙 ${userData.balance} | ₦${(userData.balance * 0.10).toFixed(2)}`;

// Update the transactions element
function updateTransactions() {
transactionsElement.innerHTML = '';
userData.transactionHistory.forEach((transaction) => {
const transactionElement = document.createElement('LI');
transactionElement.style.color = 'black';
transactionElement.style.fontWeight = 'bold';
transactionElement.textContent = transaction;
transactionsElement.appendChild(transactionElement);
});
}
updateTransactions();

// Add an event listener to each navigation menu item
navItems.forEach((item) => {
item.addEventListener('click', (e) => {
// Prevent default link behavior
e.preventDefault();
// Get the text content of the clicked link
const text = item.textContent.trim();
// Check the text content and redirect to the corresponding page
if (text === 'LOGOUT') {
// Do not clear local storage when user logs out
// localStorage.removeItem('userData');
window.location.href = 'login.html';
} else if (text === 'DASHBOARD') {
// Do nothing, already on dashboard page
} else if (text === 'WITHDRAW') {
window.location.href = 'withdraw.html';
}
});
});

// Function to show custom popup message
function showError(message) {
const errorBox = document.createElement('div');
errorBox.style.position = 'fixed';
errorBox.style.top = '30%';
errorBox.style.left = '50%';
errorBox.style.transform = 'translate(-50%, -50%)';
errorBox.style.background = 'white';
errorBox.style.padding = '20px';
errorBox.style.border = '1px solid black';
errorBox.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
errorBox.innerHTML = message;
document.body.appendChild(errorBox);
setTimeout(() => {
errorBox.remove();
}, 3000);
}


// Add an event listener to the claim button
claimButton.addEventListener('click', () => {
// Get the current time
const currentTime = new Date().getTime();
// Check if an hour has passed since the last claim
if (userData.lastClaimTime === null || (currentTime - userData.lastClaimTime) >= 3600000) {
// Claim the hourly reward
userData.balance += 10;
// Update the balance element
balanceElement.textContent = `PREMICOIN:🪙 ${userData.balance} | ₦${(userData.balance * 0.10).toFixed(2)}`;
// Add the transaction to the transaction history
userData.transactionHistory.unshift(`Hourly Reward: +10`);
updateTransactions();
// Update the last claim time
userData.lastClaimTime = currentTime;
// Store the user data in local storage
localStorage.setItem('userData', JSON.stringify(userData));
} else {
showError('You have already claimed an hourly reward, wait till next hour!');
}
});

// Add an event listener to the sign-in button
signInButton.addEventListener('click', () => {
// Get the current time
const currentTime = new Date().getTime();
// Check if a day has passed since the last sign-in
if (userData.lastSignInTime === null || (currentTime - userData.lastSignInTime) >= 86400000) {
// Sign-in reward
userData.balance += 20;
// Update the balance element
balanceElement.textContent = `PREMICOIN:🪙 ${userData.balance} | ₦${(userData.balance * 0.10).toFixed(2)}`;
// Add the transaction to the transaction history
userData.transactionHistory.unshift(`Sign-in Reward: +20`);
updateTransactions();
// Update the last sign-in time
userData.lastSignInTime = currentTime;
// Store the user data in local storage
localStorage.setItem('userData', JSON.stringify(userData));
} else {
showError("Can't claim now, please wait for 24hrs to claim again!");
}
});
let animationQueue = [];

tapButton.addEventListener('click', (event) => {
  // Tap to earn reward
  userData.balance += 5;
  
  // Update the balance element
  balanceElement.textContent = `PREMICOIN: 🪙${userData.balance} | ₦${(userData.balance * 0.10).toFixed(2)}`;
  
  // Store the user data in local storage
  localStorage.setItem('userData', JSON.stringify(userData));
  
  // Add animation to the queue
  animationQueue.push('+5');
  
  // Process the animation queue
  processAnimationQueue();
  
  // Prevent default click behavior
  event.preventDefault();
});

function processAnimationQueue() {
  if (animationQueue.length > 0) {
    const animationContainer = document.getElementById('animation-container');
    animationContainer.textContent = animationQueue.shift();
    animationContainer.style.position = 'absolute';
    animationContainer.style.top = '50%';
    animationContainer.style.left = '50%';
    animationContainer.style.transform = 'translate(-50%, -50%)';
    animationContainer.style.fontSize = '24px';
    animationContainer.style.fontWeight = 'bold';
    animationContainer.style.color = '#ffffff';
    animationContainer.style.display = 'block';
    animationContainer.style.animation = 'animate-text 0.5s';
    
    setTimeout(() => {
      animationContainer.style.display = 'none';
      animationContainer.style.animation = '';
      processAnimationQueue(); // Process the next animation in the queue
    }, 500);
  }
}

// Add animation keyframes
const style = document.createElement('style');
style.innerHTML = `
  @keyframes animate-text {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;
document.head.appendChild(style);

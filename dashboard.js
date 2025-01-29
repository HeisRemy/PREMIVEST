
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
alert('You have already claimed an hourly reward, wait till next hour!');
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
alert("Can't claim now, please wait for 24hrs to claim again!");
}
});

// Add an event listener to the tap button
tapButton.addEventListener('click', (event) => {
// Tap to earn reward
userData.balance += 10;
// Update the balance element
balanceElement.textContent = `PREMICOIN:🪙 ${userData.balance} | ₦${(userData.balance * 0.10).toFixed(2)}`;
// Store the user data in local storage
localStorage.setItem('userData', JSON.stringify(userData));
// Prevent default click behavior
event.preventDefault();
});
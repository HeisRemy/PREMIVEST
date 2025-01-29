
// Get the form elements
const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const button = document.querySelector('button');

// Add an event listener to the button
button.addEventListener('click', (e) => {
// Prevent default button behavior
e.preventDefault();

// Get the username and password values
const username = usernameInput.value.trim();
const password = passwordInput.value.trim();

// Check if the username and password are not empty
if (username === '' || password === '') {
alert('Please fill in both username and password.');
return;
}

// Check if the username is at least 5 characters
if (username.length < 5) {
alert('Username must be at least 5 characters.');
return;
}

// Check if the password is at least 8 characters
if (password.length < 8) {
alert('Password must be at least 8 characters.');
return;
}

// Store the username and password in local storage
localStorage.setItem('username', username);
localStorage.setItem('password', password);

// Direct the user to the dashboard page
window.location.href = 'dashboard.html';
});

// Add an event listener to the password input field
passwordInput.addEventListener('input', () => {
// Get the password input field and the eye symbol
const passwordField = document.querySelector('#password');
const eyeSymbol = document.querySelector('.eye-symbol');

// If the eye symbol is clicked, toggle the password visibility
if (eyeSymbol) {
eyeSymbol.addEventListener('click', () => {
if (passwordField.type === 'password') {
passwordField.type = 'text';
} else {
passwordField.type = 'password';
}
});
}
});

// Add the eye symbol to the password input field
const eyeSymbol = document.createElement('i');
eyeSymbol.className = 'eye-symbol';
eyeSymbol.innerHTML = '&#128065;';

// Set styles for the eye symbol
eyeSymbol.style.fontSize = '24px';
eyeSymbol.style.position = 'absolute';
eyeSymbol.style.top = '40%';
eyeSymbol.style.right = '15px';
eyeSymbol.style.transform = 'translateY(-50%)';
eyeSymbol.style.cursor = 'none';
eyeSymbol.style.color = 'blue';

passwordInput.parentNode.appendChild(eyeSymbol);
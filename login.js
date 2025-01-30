
// Get the form elements
const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const button = document.querySelector('button');

// Custom function to display error messages
function showError(message) {
  const errorBox = document.createElement("div");
  errorBox.style.position = "fixed";
  errorBox.style.top = "50%";
  errorBox.style.left = "50%";
  errorBox.style.transform = "translate(-50%, -50%)";
  errorBox.style.background = "white";
  errorBox.style.padding = "20px";
  errorBox.style.border = "1px solid black";
  errorBox.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
  errorBox.innerHTML = message;
  document.body.appendChild(errorBox);
  setTimeout(() => {
    errorBox.remove();
  }, 3000);
}

// Add an event listener to the button
button.addEventListener('click', (e) => {
  // Prevent default button behavior
  e.preventDefault();

  // Get the username and password values
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Check if the username and password are not empty
  if (username === '' || password === '') {
    showError('Please fill in both username and password.');
    return;
  }

  // Check if the username is at least 5 characters
  if (username.length < 5) {
    showError('Username must be at least 5 characters.');
    return;
  }

  // Check if the password is at least 8 characters
  if (password.length < 8) {
    showError('Password must be at least 8 characters.');
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

// Register Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
    const errorEl = document.getElementById('registerError');

    if (!name || !email || !password || !confirmPassword) {
      errorEl.textContent = "Please fill in all fields.";
      return;
    }

    if (password !== confirmPassword) {
      errorEl.textContent = "Passwords do not match.";
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(user => user.email === email);
    if (exists) {
      errorEl.textContent = "Email already registered.";
      return;
    }

    users.push({ name, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    errorEl.textContent = "";
    alert("Registration successful! You can now log in.");
    location.href = "index.html";
  });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find(user => user.email === email && user.password === password);

    if (!found) {
      errorEl.textContent = "Invalid email or password.";
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(found));
    location.href = "main.html";
  });
}

// Forgot Password Form
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('forgotEmail').value.trim().toLowerCase();
    const newPassword = document.getElementById('newPassword').value;
    const errorEl = document.getElementById('forgotError');
    const successEl = document.getElementById('forgotSuccess');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(user => user.email === email);

    if (index === -1) {
      errorEl.textContent = "Email not found.";
      successEl.textContent = "";
      return;
    }

    users[index].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    errorEl.textContent = "";
    successEl.textContent = "Password reset successful. Please login.";
    setTimeout(() => location.href = "index.html", 2000);
  });
}

// Password Toggle (Show/Hide)
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('i');
    const input = btn.parentElement.querySelector('input');
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('bi-eye');
    icon.classList.toggle('bi-eye-slash');
  });
});

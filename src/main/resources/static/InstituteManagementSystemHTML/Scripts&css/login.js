const loginForm = document.querySelector("form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#error-message");
const loginButton = document.querySelector("#login-button");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  fetch("http://localhost:8080/api/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(username + ":" + password),
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        window.location.href = "index.html";
      } else {
        errorMessage.classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

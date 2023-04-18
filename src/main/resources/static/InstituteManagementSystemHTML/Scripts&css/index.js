//Login and logout authentication
const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

if (username == null || password == null) {
  window.location.href = "login.html";
}

const logoffButton = document.querySelector("#logOut");

logoffButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

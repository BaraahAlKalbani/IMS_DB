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

document
  .getElementById("studentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Student created successfully!");
          form.reset();
        } else {
          alert("Failed to create student. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

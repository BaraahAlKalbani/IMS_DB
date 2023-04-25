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
  .getElementById("TeacherForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    let form = event.target;
    let formData = new FormData(form);
    let name = formData.get("name");
    let email = formData.get("email");
    let salary = formData.get("salary");

    fetch(`http://localhost:8080/api/teachers`, {
      method: "POST",
      body: JSON.stringify({ name: name, email: email, salary: salary }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Teacher added successfully!");
          form.reset();
        } else {
          alert("Failed to hire teacher. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

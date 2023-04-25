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
  .getElementById("CourseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    // Convert form data to JSON object
    let jsonData = {};
    for (let entry of formData.entries()) {
      jsonData[entry[0]] = entry[1];
    }

    fetch(form.action, {
      method: form.method,
      body: JSON.stringify(jsonData), // Send JSON request body
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("course added successfully!");
          form.reset();
        } else {
          alert("Failed to add course. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

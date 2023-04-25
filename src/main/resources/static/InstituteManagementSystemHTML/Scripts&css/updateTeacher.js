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
const teacherId = document.getElementById("id");

function addOptionsToSelectTeacher(selectElement) {
  fetch("http://localhost:8080/api/teachers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(username + ":" + password),
    },
  })
    .then((response) => response.json())
    .then((teachers) => {
      teachers.forEach((teacher) => {
        const option = document.createElement("option");
        option.value = teacher.teacherId;
        option.text = teacher.teacherId + ": " + teacher.name;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching teachers:", error);
    });
}
addOptionsToSelectTeacher(teacherId);
//Update Teacher

const updateTeacherForm = document.getElementById("UpdateTeacherForm");

document
  .getElementById("UpdateTeacherForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    let form = event.target;
    let formData = new FormData(form);

    let id = formData.get("id");
    let name = formData.get("name");
    let email = formData.get("email");
    let salary = formData.get("salary");

    fetch(`http://localhost:8080/api/teachers/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: name, email: email, salary: salary }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Teacher updated successfully!");
          form.reset();
        } else {
          alert("Failed to update teacher. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

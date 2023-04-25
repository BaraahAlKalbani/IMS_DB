//Login and logout authentication
const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

// if (username == null || password == null) {
//   window.location.href = "login.html";
// }

const logoffButton = document.querySelector("#logOut");
logoffButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
const studentId = document.getElementById("id");

function addOptionsToSelectstudent(selectElement) {
  fetch("http://localhost:8080/api/students", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(username + ":" + password),
    },
  })
    .then((response) => response.json())
    .then((students) => {
      students.forEach((student) => {
        const option = document.createElement("option");
        option.value = student.studentId;
        option.text = student.studentId + ": " + student.name;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching students:", error);
    });
}
addOptionsToSelectstudent(studentId);
//Update student
const updateStudentForm = document.getElementById("UpdateStudentForm");

document
  .getElementById("UpdateStudentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    let form = event.target;
    let formData = new FormData(form);

    let id = formData.get("id");
    let name = formData.get("name");
    let email = formData.get("email");
    let age = formData.get("age");
    let image = formData.get("image");

    fetch(`http://localhost:8080/api/students/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: "Basic " + btoa("Baraah" + ":" + "adm66in"),
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Student updated successfully!");
          form.reset();
        } else {
          alert("Failed to update student. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

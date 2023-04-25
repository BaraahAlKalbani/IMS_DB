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
//Delete student
const deleteStudentForm = document.getElementById("deleteStudentForm");

deleteStudentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = document.getElementById("id").value;
  // Fetch request options
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(username + ":" + password),
    },
  };

  try {
    const response = await fetch(
      `http://localhost:8080/api/students/${id}`,
      requestOptions
    );
    if (response.ok) {
      // Student deleted successfully
      alert("Student deleted successfully");
      location.reload(true);
    } else {
      // Handle error when student not deleted
      console.error("Failed to delete student:", response.statusText);
    }
  } catch (error) {
    // Handle fetch error
    console.error("Failed to delete student:", error);
  }
});

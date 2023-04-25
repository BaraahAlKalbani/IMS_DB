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
//Delete teacher
const deleteForm = document.getElementById("deleteTeacherForm");

deleteForm.addEventListener("submit", async (event) => {
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
      `http://localhost:8080/api/teachers/${id}`,
      requestOptions
    );
    if (response.ok) {
      alert("teacher deleted successfully");
      location.reload(true);
    } else {
      // Handle error when teacher not deleted
      console.error("Failed to delete teacher:", response.statusText);
    }
  } catch (error) {
    // Handle fetch error
    console.error("Failed to delete teacher:", error);
  }
});

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
const courseId = document.getElementById("id");

function addOptionsToSelectCourse(selectElement) {
  fetch("http://localhost:8080/api/courses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(username + ":" + password),
    },
  })
    .then((response) => response.json())
    .then((courses) => {
      courses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course.courseId;
        option.text = course.courseId + ": " + course.name;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching courses:", error);
    });
}
addOptionsToSelectCourse(courseId);
//Update Course

const updateCourseForm = document.getElementById("UpdateCourseForm");

document
  .getElementById("UpdateCourseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    let form = event.target;
    let formData = new FormData(form);

    let id = formData.get("id");
    let name = formData.get("name");
    let description = formData.get("description");
    fetch(`http://localhost:8080/api/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: name, description: description }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Course updated successfully!");
          form.reset();
        } else {
          alert("Failed to update course. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

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

document
  .getElementById("deleteCourseForm")
  .addEventListener("submit", async (event) => {
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
        `http://localhost:8080/api/courses/${id}`,
        requestOptions
      );
      if (response.ok) {
        alert("course deleted successfully");
        location.reload(true);
      } else {
        // Handle error when course not deleted
        console.error("Failed to delete course:", response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Failed to delete course:", error);
    }
  });

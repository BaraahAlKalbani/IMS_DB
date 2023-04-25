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

const teacherId = document.getElementById("teacher_id");

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

const courseId = document.getElementById("course_id");

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
  .getElementById("CourseForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    const data = {
      course_id: formData.get("course_id"),
      teacher_id: formData.get("teacher_id"),
    };

    fetch(form.action, {
      method: form.method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Teacher added to course successfully!");
          form.reset();
        } else {
          alert("Failed to add teacher to course. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

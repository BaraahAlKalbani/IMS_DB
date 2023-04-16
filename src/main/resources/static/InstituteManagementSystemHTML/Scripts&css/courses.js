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

//display Table
const coursesTable = document.getElementById("courses-table");

fetch("http://localhost:8080/courses", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(username + ":" + password),
  },
})
  .then((response) => response.json())
  .then((courses) => {
    courses.forEach((course) => {
      const row = coursesTable.insertRow(-1);
      row.insertCell().textContent = course.id;
      row.insertCell().textContent = course.name;
      row.insertCell().textContent = course.description;
      row.insertCell().textContent = course.teacherId;
    });
  })
  .catch((error) => {
    console.error("Error fetching courses:", error);
  });

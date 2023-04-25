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

//desplay table
const teacherTable = document.getElementById("students-table");

fetch("http://localhost:8080/api/teachers", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(username + ":" + password),
  },
})
  .then((response) => response.json())
  .then((teachers) => {
    const teacherTable = document.getElementById("teachers-table");

    teachers.forEach((teacher) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${teacher.teacherId}</td>
      <td>${teacher.name}</td>
      <td>${teacher.email}</td>
      <td>${teacher.salary}</td>
    `;
      teacherTable.appendChild(row);
    });
  });

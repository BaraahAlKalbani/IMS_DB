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
fetch("http://localhost:8080/teachers", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(username + ":" + password),
  },
})
  .then((response) => response.json())
  .then((teachers) => {
    const tableBody = document.getElementById("teachers-table");
    teachers.forEach((teacher) => {
      const row = tableBody.insertRow();
      row.insertCell().textContent = teacher.id;
      row.insertCell().textContent = teacher.name;
      row.insertCell().textContent = teacher.salary;
      row.insertCell().textContent = teacher.email;
    });
  })
  .catch((error) => console.error("Error fetching teachers:", error));

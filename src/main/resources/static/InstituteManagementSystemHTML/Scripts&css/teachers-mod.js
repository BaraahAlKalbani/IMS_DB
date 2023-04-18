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

//get id's
const teacherIdSelect1 = document.getElementById("id2");
const teacherIdSelect2 = document.getElementById("id3");

const addTab = document.getElementById("tab-nav-2");
const deleteTab = document.getElementById("tab-nav-3");

function addOptionsToSelectTeacher(selectElement) {
  fetch("http://localhost:8080/teachers", {
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
        option.value = teacher.id;
        option.text = teacher.id + " : " + teacher.name;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching teachers:", error);
    });
}

addOptionsToSelectTeacher(teacherIdSelect1);
addOptionsToSelectTeacher(teacherIdSelect2);

//add
const addBtn = document.getElementById("add");

addBtn.addEventListener("click", (event) => {
  event.preventDefault(); // prevent form submission

  const name = document.getElementById("name1").value;
  const email = document.getElementById("email1").value;
  const salary = document.getElementById("salary1").value;

  const teacher = {
    name: name,
    email: email,
    salary: salary,
  };

  if (name === "" || email === "") {
    alert("Please enter name and email.");
    return;
  }

  fetch("http://localhost:8080/teachers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(username + ":" + password),
    },
    body: JSON.stringify(teacher),
  })
    .then((response) => {
      if (response.ok) {
        alert("Teacher added successfully!!");
        console.log("Teacher added successfully");
      } else {
        console.error("Error adding teacher");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

//Update Teacher

const updateButton = document.getElementById("update");

updateButton.addEventListener("click", (event) => {
  event.preventDefault();

  const id = document.getElementById("id2").value;
  const name = document.getElementById("name2").value;
  const email = document.getElementById("email2").value;
  const salary = document.getElementById("salary2").value;

  const data = {
    name: name,
    email: email,
    salary: salary,
  };

  fetch(`http://localhost:8080/teachers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(username + ":" + password),
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Teacher updated successfully.");
      } else {
        alert("Failed to update teacher.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to update teacher.");
    });
});

//Delete Teacher
const form = document.querySelector("form");
const deleteBtn = document.getElementById("delete");

deleteBtn.addEventListener("click", (event) => {
  event.preventDefault(); // prevent form submission

  const id = document.getElementById("id3").value;

  fetch(`http://localhost:8080/teachers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(username + ":" + password),
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Teacher deleted successfully!!");
        console.log("Teacher deleted successfully");
      } else {
        console.error("Error deleting teacher");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

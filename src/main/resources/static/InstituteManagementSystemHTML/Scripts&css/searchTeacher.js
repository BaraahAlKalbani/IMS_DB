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
const teacherId = document.getElementById("id");

function addOptionsToSelectteacher(selectElement) {
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
addOptionsToSelectteacher(teacherId);
//search teacher
const TeacherForm = document.getElementById("searchTeacherForm");

TeacherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = document.getElementById("id").value;
  // Fetch request options
  const requestOptions = {
    method: "GET",
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
      const teacher = await response.json();
      // Convert the image data to a Base64 string
      const imageData = await imageResponse.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageData);
      reader.onloadend = () => {
        const teacherList = document.createElement("ul");
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span><strong>Teacher ID: </strong>${teacher.teacherId}</span><br>
            <span><strong>Name: </strong>${teacher.name}</span><br>
            <span><strong>Email: </strong>${teacher.email}</span><br>
            <span><strong>Salary: </strong>${teacher.salary}</span><br>
          `;
        teacherList.appendChild(listItem);

        // Append the list to an existing element in the DOM
        const parentElement = document.getElementById("data");
        parentElement.innerHTML = "";
        parentElement.appendChild(teacherList);
      };
    } else {
      // Handle error when teacher not found
      alert("Failed to find teacher: " + response.statusText);
    }
  } catch (error) {
    // Handle fetch error
    alert("Failed to find teacher: " + error);
  }
});

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
//search student
const StudentForm = document.getElementById("searchStudentForm");

StudentForm.addEventListener("submit", async (event) => {
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
      `http://localhost:8080/api/students/${id}`,
      requestOptions
    );
    if (response.ok) {
      const student = await response.json();

      // Fetch student image
      const imageResponse = await fetch(
        `http://localhost:8080/api/students/getImage/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "image/jpeg",
            Authorization: "Basic " + btoa(username + ":" + password),
          },
        }
      );

      if (imageResponse.ok) {
        // Convert the image data to a Base64 string
        const imageData = await imageResponse.blob();
        const reader = new FileReader();
        reader.readAsDataURL(imageData);
        reader.onloadend = () => {
          const base64data = reader.result;

          // Create the HTML elements to display the student data and image
          const studentList = document.createElement("ul");
          const listItem = document.createElement("li");
          listItem.innerHTML = `
          <img src="${base64data}" alt="${student.name} Image"><br>
            <span><strong>Student ID: </strong>${student.studentId}</span><br>
            <span><strong>Name: </strong>${student.name}</span><br>
            <span><strong>Email: </strong>${student.email}</span><br>
            <span><strong>Age: </strong>${student.age}</span><br>
          `;
          studentList.appendChild(listItem);

          // Append the list to an existing element in the DOM
          const parentElement = document.getElementById("data");
          parentElement.innerHTML = "";
          parentElement.appendChild(studentList);
        };
      } else {
        // Handle error when image not found
        alert("Failed to find student image:", imageResponse.statusText);
      }
    } else {
      // Handle error when student not found
      alert("Failed to find student:", response.statusText);
    }
  } catch (error) {
    // Handle fetch error
    alert("Failed to find student:", error);
  }
});

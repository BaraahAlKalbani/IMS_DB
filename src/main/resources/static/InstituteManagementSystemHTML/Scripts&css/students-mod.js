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

//get student Ids to display them
const studentIdSelect1 = document.getElementById("id2");
const studentIdSelect2 = document.getElementById("id3");
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
addOptionsToSelectstudent(studentIdSelect1);
addOptionsToSelectstudent(studentIdSelect2);

//add new
document.getElementById("createStudentForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  var form = event.target;
  var formData = new FormData(form);

  // Perform form submission using fetch or XMLHttpRequest
  fetch("http://localhost:8080/api/students/withImage", {
    method: "POST",
    body: formData
  })
  .then(function(response) {
    // Handle response
    if (response.ok) {
      alert("Student created successfully!"); // Show success message
      form.reset(); // Reset form
    } else {
      alert("Failed to create student. Please try again."); // Show error message
    }
  })
  .catch(function(error) {
    console.error("Error:", error);
    alert("Failed to create student. Please try again."); // Show error message
  });
});


// Update Student
const updateForm = document.forms.updateStudentForm;

if (updateForm) {
  updateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = updateForm.elements.id2.value;
    const name = updateForm.elements.name2.value;
    const email = updateForm.elements.email2.value;
    const age = updateForm.elements.age2.value;

    const data = {
      name: name,
      email: email,
      age: age,
    };

    fetch(`http://localhost:8080/api/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Student updated successfully.");
        } else {
          alert("Failed to update student.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update student.");
      });
  });
}

//Delete student
const deleteForm = document.forms.deleteStudentForm;

deleteForm.addEventListener("click", (event) => {
  event.preventDefault(); // prevent form submission

  const id = deleteForm.elements.id3.value;

  fetch(`http://localhost:8080/api/students/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(username + ":" + password),
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Student deleted successfully.");
        console.log("Student deleted successfully");
      } else {
        console.error("Error deleting student");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

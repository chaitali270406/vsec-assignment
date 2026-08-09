// Empty list to store all students
var studentList = [];

function addStudent() {
  // Step 1: Read values from input boxes
  var roll = document.getElementById("roll").value;
  var name = document.getElementById("name").value;
  var m1 = Number(document.getElementById("m1").value);
  var m2 = Number(document.getElementById("m2").value);
  var m3 = Number(document.getElementById("m3").value);

  // Simple validation check
  if (roll == "" || name == "") {
    alert("Please enter Roll No and Name!");
    return;
  }

  // Step 2: Calculate total and percentage
  var total = m1 + m2 + m3;
  var percentage = total / 3;

  // Step 3: Create a simple student object
  var student = {
    rollNo: roll,
    studentName: name,
    math: m1,
    science: m2,
    english: m3,
    totalMarks: total,
    percent: percentage
  };

  // Step 4: Save student to the list
  studentList.push(student);

  // Step 5: Update the screen
  displayTable();
  displayTopper();

  // Step 6: Clear input boxes for next entry
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("m1").value = "";
  document.getElementById("m2").value = "";
  document.getElementById("m3").value = "";
}

function displayTable() {
  var tableBody = document.getElementById("studentTable");
  tableBody.innerHTML = ""; // Clear table first

  // Loop through studentList and add rows
  for (var i = 0; i < studentList.length; i++) {
    var st = studentList[i];

    var row = "<tr>" +
      "<td>" + st.rollNo + "</td>" +
      "<td>" + st.studentName + "</td>" +
      "<td>" + st.math + "</td>" +
      "<td>" + st.science + "</td>" +
      "<td>" + st.english + "</td>" +
      "<td>" + st.totalMarks + " / 300</td>" +
      "<td>" + st.percent.toFixed(2) + "%</td>" +
    "</tr>";

    tableBody.innerHTML = tableBody.innerHTML + row;
  }
}

function displayTopper() {
  // Assume first student is the topper
  var topper = studentList[0];

  // Compare with the remaining students
  for (var i = 1; i < studentList.length; i++) {
    if (studentList[i].totalMarks > topper.totalMarks) {
      topper = studentList[i]; // Update topper if higher marks found
    }
  }

  // Show topper details
  var topperHTML = "<table border='1'>" +
    "<tr><th>Roll No</th><td>" + topper.rollNo + "</td></tr>" +
    "<tr><th>Name</th><td>" + topper.studentName + "</td></tr>" +
    "<tr><th>Total Marks</th><td>" + topper.totalMarks + " / 300</td></tr>" +
    "<tr><th>Percentage</th><td>" + topper.percent.toFixed(2) + "%</td></tr>" +
  "</table>";

  document.getElementById("topperSection").innerHTML = topperHTML;
}
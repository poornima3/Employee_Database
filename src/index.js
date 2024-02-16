(async function () {
  const data = await fetch('./src/data.json');
  const res = await data.json();

  let employess = res;
  let selectedEmployeeId = employess[0].id;
  let selectedEmployee = employess[0];

  const employeeList = document.querySelector(".employees__names--list");
  const employeeInfo = document.querySelector(".employees__single--info");

  // Add Employee Logic
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee__create")

  // making sure the user is above 18years old
  const dobInput = document.querySelector(".addEmployee__create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`;

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  })

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === 'addEmployee') {
      addEmployeeModal.style.display = "none";
    }
  })

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};

    values.forEach((val) => {
      empData[val[0]] = val[1];
    })

    empData.id = employess[employess.length - 1].id + 1;
    empData.dob = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employess.push(empData);
    renderEmployess();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
    console.log('values are', empData)
  })

  // Select Employee Logic
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === 'SPAN' && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployess();

      // render single Employee
      renderSingleEmployee();
    }
    // deleting employee
    if (e.target.tagName === "I") {
      employess = employess.filter((emp) => {
        String(emp.id) !== e.target.parentNode.id;
      });

      if (String(selectedEmployeeId.id) === e.target.parentNode.id) {
        selectedEmployeeId = employess[0]?.id || -1;
        selectedEmployee = employess[0] || {};
        renderSingleEmployee();
      }
      renderEmployess();
    }
  })

  const renderEmployess = () => {
    employeeList.innerHTML = "";
    employess.forEach(emp => {
      const employee = document.createElement("span");
      employee.classList.add("employees__names--item");
      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }

      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;

      employeeList.append(employee);
    });

  };

  // Render single employee
  const renderSingleEmployee = () => {
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }
    employeeInfo.innerHTML = `
    <img src = "${selectedEmployee.imageUrl}" />
    <span class="employees__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} ${selectedEmployee.age}</span>
    <span>${selectedEmployee.address}</span>
    <span>${selectedEmployee.email}</span>
    <span>Mobile - ${selectedEmployee.contactNumber}</span>
    <span>DOB - ${selectedEmployee.dob} </span>
    `;
  };

  renderEmployess();

})();
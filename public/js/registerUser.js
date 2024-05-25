/*
   JavaScript Files 
   
   Author: Charlene Yeo
   Date: 22/01/2024
   
   Filename: registerUser.js
   
*/

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");
  const warningDiv = document.getElementById("warningDiv");
  const notificationDiv = document.getElementById("notificationDiv");

  registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (password=== confirmPassword){
        var role = "Customer";

        // assigns role if email domain matches @company
        if (email.toLowerCase().indexOf("@company.com") !== -1) {
            role = "Admin";
        }

        const data = {
          username: username,
          email: email,
          password: password,
          role: role
      };

            // removes previous user's local storage
            localStorage.removeItem("user_id");
            localStorage.removeItem("role");
            localStorage.removeItem("token");

      axios.post('http://localhost:3000/api/register', data)
          .then((response) => {
            console.log(response)

            if (response.status== 200){
            // stores user_id, role and token in local storage
            localStorage.setItem("user_id", response.data.user_id)
            localStorage.setItem("role", response.data.role)
            localStorage.setItem("token", response.data.token);
    
            // directed to next window
            window.location.href = "profile.html";
            }
          })
          .catch((error) => {
              console.log(error);

              if (error.response.status === 422) {
                  // Email already taken
                  displayWarning("Email  is already taken");
              } else if (error.response.status === 409){
                  displayWarning("Username is already taken");
              }
          });

      registrationForm.reset()
      } else {
        // Passwords do not match
        displayWarning("Passwords do not match");
      }
  });

  // Function to display warning message
  function displayWarning(message) {
      warningDiv.innerText = message;
      warningDiv.classList.remove("d-none");

      // Hide notification after 10 seconds
      setTimeout(() => {
        notificationDiv.classList.add("d-none");
    }, 10000);
  }

});

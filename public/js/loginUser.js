/*
   JavaScript Files 
   
   Author: Charlene Yeo
   Date: 22/01/2024
   
   Filename: loginUser.js
   
*/

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const warningDiv = document.getElementById("warningDiv");

  loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const data = {
          username: username,
          password: password,
      };

      axios.post('http://localhost:3000/api/login', data)
          .then((response) => {

            console.log(response.data.token)
              if (response.status == 200) {
                  // login successful
                  if (response.data.token) {
                    console.log(response)

                      // Store the token in local storage
                      localStorage.setItem("token", response.data.token);

                      // Store user_id in local storage
                      localStorage.setItem("user_id",response.data.user_id);

                      if (response.data.role== "Admin"){
                        localStorage.setItem("role",response.data.role);
                        window.location.href = "admin.html";
                      }else 

                      window.location.href = "home.html";
                  } else {
                      alert("invalid token");
                      window.location.href = "login.html";
                  }
              }
          })
          .catch((error) => {

              if (error.response.status == 404) {
                  displayWarning("You entered an invalid username or password. Please try again.")
              } else {
                if (error.response.status == 401){
                  displayWarning("You entered an invalid username or password. Please try again.")
                }
              }
          });

      // Reset form 
      loginForm.reset();
  });
});

// display warning message
function displayWarning(message) {
  warningDiv.innerText = message;
  warningDiv.classList.remove("d-none");

  setTimeout(() => {
    warningDiv.classList.add("d-none");
}, 8000); 
}


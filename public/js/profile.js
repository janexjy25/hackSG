/*
   JavaScript Files 
   
   Author: Charlene Yeo
   Date: 22/01/2024
   
   Filename: profile.js
   
*/

document.addEventListener("DOMContentLoaded", function () {
    const playerInfo = document.getElementById("playerInfo");
    const taskInfo = document.getElementById("details");
    const forestInfo = document.getElementById("forestList");

    // Gets user details
    function getUserInfo() {
        axios.get(`http://localhost:3000/api/users/userID`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
        .then((response) => {
            console.log(response.data);

            playerInfo.innerHTML = `
            <div class="card-text">
                <dl class="row">
                    <dt class="col-sm-3">User ID:</dt>
                    <dd class="col-sm-9">${response.data.user_id}</dd>

                    <dt class="col-sm-3">Username:</dt>
                    <dd class="col-sm-9">${response.data.username}</dd>

                    <dt class="col-sm-3">Email:</dt>
                    <dd class="col-sm-9">${response.data.email}</dd>

                    <dt class="col-sm-3">Total Points:</dt>
                    <dd class="col-sm-9">${response.data.total_points}</dd>
                </dl>
            </div>
        `;
        })
        .catch((error) => {
            console.error(error);

            if (error.response.status == 404) {
                playerInfo.innerHTML = `${error.data.message}`;
                return;
            }
        });
    }

   // getting task progress info
    axios.get(`http://localhost:3000/api/task_progress/users`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
    .then((response) => {
        taskInfo.innerHTML = "";

            // loop through all task progress
            response.data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.completion_date}</td>
                    <td>${item.title}</td>
                    <td>${item.points}</td>
                `;
                taskInfo.append(row);
            });
    })
    .catch((error) => {

        // logs out user when jwt expires
      if (error.response.status == 401) {
        alert("Time out");
        window.location.href = "login.html";

        // when no results of task progress
    } else if (error.response.status == 400) {
        taskInfo.innerHTML = '<tr><td class="text-center" colspan="3">No tasks yet! Complete tasks <a href="task.html">here!</a?</td></tr>';
    }
    });

    // get forest info
    axios.get(`http://localhost:3000/api/users/forest`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
    .then((response) => {
        console.log(response.data);
        forestInfo.innerHTML = "";
    
      if (response.data.length == 0) {
        forestInfo.innerHTML = '<p>No trees yet! Shop<a href="cart.html">here<a> now!</p>';
      } else {
        // list out items in inventory
        const list = document.createElement("ul");
    
        // Loops through inventory
        response.data.forEach(item => {

          const listItem = document.createElement("li");
          listItem.textContent = `${item.quantity} x ${item.species}`;
    
          list.appendChild(listItem);
        });
    
        forestInfo.appendChild(list);
      }
    })
    .catch((error) => {
        console.error(error);
  
        if (error.response.status == 404) {
            forestInfo.innerHTML = '<p>No trees yet! Shop <a href="cart.html">here<a> now!</p>';
        }
      
    });

    getUserInfo();

});

// When "Edit username" button has been clicked
function updateUsername() {
    const username = document.getElementById("editUsername").value.trim();

    if (username == "") {
        displayWarning('Please enter a valid username.');
        return;
    }

    const data = {
        username: username
    };

    axios.put('http://localhost:3000/api/users/username', data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
    .then((response) => {
        console.log(JSON.stringify(response.data));

        if(response.status===200){
            displayNotif("Username successfully updated!");
            document.getElementById('editProfileForm').reset();
        }
    })
    .catch((error) => {
        console.error(error);

        if (error.response.status == 409){
            displayWarning("Username already exists")
        }

    });
}

// When "Edit email" button has been clicked
function updateEmail(){

    const email = document.getElementById("editEmail").value.trim();

    if (email == "") {
        displayWarning('Please enter a valid email.');
        return;
    }

    let data = {
        email: email
      };

      axios.put('http://localhost:3000/api/users/email', data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then((response) => {
        console.log(JSON.stringify(response.data));

        if(response.status===200){
            displayNotif("Email successfully updated!");
            document.getElementById('editProfileForm').reset();
        }

        document.getElementById('editProfileForm').reset();
      })
      .catch((error) => {
        console.log(error);
      });
      
}

// When "Edit email" button has been clicked
function updatePassword() {
    const oldPassword = document.getElementById("editOldPassword").value.trim();
    const newPassword = document.getElementById("editNewPassword").value.trim();

    if (oldPassword === "") {
        displayWarning('Please enter the old password.');
        return;
    } else if (newPassword === "") {
        displayWarning('Please enter the new password.');
        return;
    }

    let data = {
        password: oldPassword,
        newPassword: newPassword
    };

    axios.put('http://localhost:3000/api/password', data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
        .then((response) => {
            console.log(response);

            if(response.status===200){
                displayNotif("Password successfully updated!");
                document.getElementById('editProfileForm').reset();
            }

        })
        .catch((error) => {
            console.error("Error:", error);

            if (error.response && error.response.status === 401) {
                displayWarning("You entered an invalid email or password. Please try again.");
            }
        });
}


// display warning message
function displayWarning(message) {
    warningDiv.innerText = message;
    warningDiv.classList.remove("d-none");
  
    setTimeout(() => {
      warningDiv.classList.add("d-none");
  }, 10000); 
  }

function displayNotif(message){
    notificationDiv.innerText = message;
    notificationDiv.classList.remove("d-none");
  
    setTimeout(() => {
        notificationDiv.classList.add("d-none");
  }, 10000); 
}
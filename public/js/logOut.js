// JavaScript File
// Author: Charlene Yeo
// Date: 01/02/2024
// Filename: message.js

document.getElementById('logOutBtn').addEventListener('click', function() {
    console.log('Logout modal clicked');
    
    $('#logoutModal').modal('show');

    document.getElementById('confirmLogoutBtn').addEventListener('click', function() {
        console.log('Confirm logout button clicked');
        
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("role");
    });
});
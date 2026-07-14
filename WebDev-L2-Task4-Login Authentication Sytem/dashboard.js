// Check Login

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "index.html";
}

// Welcome Message

const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser) {
    welcomeUser.innerText = currentUser.username;
}

// User Profile Card

const profileName = document.getElementById("profileName");

if (profileName) {
    profileName.innerText = currentUser.username;
}

// Email Card

const profileEmail = document.getElementById("profileEmail");

if (profileEmail) {
    profileEmail.innerText = currentUser.email;
}

// Logout

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";

    });

}
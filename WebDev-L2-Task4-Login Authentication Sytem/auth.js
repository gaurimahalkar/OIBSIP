// Register 

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const registerMsg = document.getElementById("registerMsg");

        registerMsg.innerText = "";
        registerMsg.style.color = "red";

        if (username === "" || email === "" || password === "") {
            registerMsg.innerText = "Please fill all fields.";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            registerMsg.innerText = "Please enter a valid email address.";
            return;
        }

        if (password.length < 8) {
            registerMsg.innerText = "Password must be at least 8 characters.";
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(function(user){

            return user.email === email;

        });

        if(existingUser){

            registerMsg.innerText = "Email already registered.";
            return;

        }

        users.push({

            username: username,
            email: email,
            password: sha256(password)

        });

        localStorage.setItem("users", JSON.stringify(users));

        registerMsg.style.color = "green";
        registerMsg.innerText = "Registration Successful.";

        setTimeout(function(){

            window.location.href = "index.html";

        },1500);

    });

}
//  Login 

const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const loginMsg = document.getElementById("loginMsg");

        loginMsg.innerText = "";
        loginMsg.style.color = "red";

        if(email === "" || password === ""){

            loginMsg.innerText = "Please fill all fields.";
            return;

        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(function(item){

            return item.email === email &&
                   item.password === sha256(password);

        });

        if(!user){

            loginMsg.innerText = "Invalid Email or Password.";
            return;

        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        window.location.href = "dashboard.html";

    });

}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document
        .getElementById("username")
        .value
        .trim();

    const roomCode = document
        .getElementById("roomCode")
        .value
        .trim()
        .toUpperCase();

    if (username === "" || roomCode === "") {

        alert("Please fill all fields.");

        return;

    }

    // Save user session
    localStorage.setItem("cartshare_user", username);
    localStorage.setItem("cartshare_room", roomCode);

    // Go to dashboard
    window.location.href = "room.html";

});
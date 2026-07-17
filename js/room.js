/*
=========================================
CartShare V2 - Room Controller
=========================================
*/

// Current User
const username = getUsername();
const roomCode = getRoomCode();

// If user didn't login
if (!username || !roomCode) {

    alert("Please join a room first.");

    window.location.href = "index.html";

}

// Create room if needed
createRoom(roomCode);

// Add member
addMember(roomCode, username);

// Add activity
addActivity(
    roomCode,
    `${username} joined the room`
);

// Navbar
showUser(username);
showRoom(roomCode);

// Render UI
renderMembers(roomCode);
renderActivity(roomCode);

// Render cart (defined in cart.js)
if (typeof renderCart === "function") {
    renderCart();
}

// Save Item Button
const saveButton = document.getElementById("saveItem");

if (saveButton) {

    saveButton.addEventListener("click", addItem);

}

// Print Button
const printButton = document.getElementById("printReceipt");

if (printButton) {

    printButton.addEventListener("click", function () {

        window.print();

    });

}

/*
=========================================
Real-Time Synchronization
=========================================
*/

window.addEventListener("storage", function (event) {

    if (event.key !== STORAGE_KEY) return;

    renderMembers(roomCode);
    renderActivity(roomCode);
    renderCart();

});
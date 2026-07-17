/*
=========================================
CartShare V2 - UI Manager
=========================================
*/

/*
=========================================
Navbar
=========================================
*/

function showUser(username) {

    const element = document.getElementById("usernameDisplay");

    if (element) {
        element.textContent = username;
    }

}

function showRoom(roomCode) {

    const element = document.getElementById("roomCodeDisplay");

    if (element) {
        element.textContent = roomCode;
    }

}

/*
=========================================
Members
=========================================
*/

function renderMembers(roomCode) {

    const list = document.getElementById("memberList");

    if (!list) return;

    const members = getMembers(roomCode);

    list.innerHTML = "";

    if (members.length === 0) {

        list.innerHTML = `
            <li class="list-group-item text-muted">
                No members
            </li>
        `;

        return;

    }

    members.forEach(member => {

        list.innerHTML += `
            <li class="list-group-item">
                👤 ${member}
            </li>
        `;

    });

}

/*
=========================================
Activity Feed
=========================================
*/

function renderActivity(roomCode) {

    const list = document.getElementById("activityList");

    if (!list) return;

    const activity = getActivity(roomCode);

    list.innerHTML = "";

    if (activity.length === 0) {

        list.innerHTML = `
            <li class="list-group-item text-muted">
                No activity yet
            </li>
        `;

        return;

    }

    activity.forEach(item => {

        list.innerHTML += `
            <li class="list-group-item">
                <strong>${item.time}</strong><br>
                ${item.message}
            </li>
        `;

    });

}
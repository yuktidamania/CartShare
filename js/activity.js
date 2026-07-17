/*
=====================================
Activity Manager
=====================================
*/

function renderActivity() {

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
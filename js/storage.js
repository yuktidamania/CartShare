/*
=========================================
CartShare V2 - Storage Manager
=========================================
*/

const STORAGE_KEY = "cartshare_rooms";

/*
=========================================
User Session
=========================================
*/

function getUsername() {
    return localStorage.getItem("cartshare_user");
}

function getRoomCode() {
    return localStorage.getItem("cartshare_room");
}

/*
=========================================
Rooms
=========================================
*/

function getRooms() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function saveRooms(rooms) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
}

function createRoom(roomCode) {

    const rooms = getRooms();

    if (!rooms[roomCode]) {

        rooms[roomCode] = {

            members: [],
            cart: [],
            activity: []

        };

        saveRooms(rooms);

    }

}

function getRoom(roomCode) {

    const rooms = getRooms();

    return rooms[roomCode];

}

function saveRoom(roomCode, roomData) {

    const rooms = getRooms();

    rooms[roomCode] = roomData;

    saveRooms(rooms);

}

/*
=========================================
Members
=========================================
*/

function addMember(roomCode, username) {

    const room = getRoom(roomCode);

    if (!room) return;

    if (!room.members.includes(username)) {

        room.members.push(username);

        saveRoom(roomCode, room);

    }

}

function getMembers(roomCode) {

    const room = getRoom(roomCode);

    return room ? room.members : [];

}

/*
=========================================
Cart
=========================================
*/

function getCart(roomCode) {

    const room = getRoom(roomCode);

    return room ? room.cart : [];

}

function saveCart(roomCode, cart) {

    const room = getRoom(roomCode);

    room.cart = cart;

    saveRoom(roomCode, room);

}

function addCartItem(roomCode, item) {

    const cart = getCart(roomCode);

    cart.push(item);

    saveCart(roomCode, cart);

}

/*
=========================================
Activity
=========================================
*/

function getActivity(roomCode) {

    const room = getRoom(roomCode);

    return room ? room.activity : [];

}

function saveActivity(roomCode, activity) {

    const room = getRoom(roomCode);

    room.activity = activity;

    saveRoom(roomCode, room);

}

function addActivity(roomCode, message) {

    const activity = getActivity(roomCode);

    activity.unshift({

        message,

        time: new Date().toLocaleTimeString()

    });

    if (activity.length > 20) {

        activity.pop();

    }

    saveActivity(roomCode, activity);

}

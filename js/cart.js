/*
=========================================
CartShare V2 - Cart Manager
=========================================
*/

const FREE_SHIPPING_LIMIT = 75;

/*
=========================================
Add Item
=========================================
*/

function addItem() {

    const name = document.getElementById("itemName").value.trim();
    const qty = parseInt(document.getElementById("itemQty").value);
    const price = parseFloat(document.getElementById("itemPrice").value);

    if (name === "" || isNaN(qty) || isNaN(price)) {

        alert("Please fill all fields.");

        return;

    }

    const item = {

        id: Date.now(),

        name,

        qty,

        price,

        addedBy: username

    };

    addCartItem(roomCode, item);

    addActivity(
        roomCode,
        `${username} added ${name}`
    );

    renderCart();

    renderActivity(roomCode);

    // Clear form
    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
    document.getElementById("itemPrice").value = "";

    // Close modal
    const modalElement = document.getElementById("addItemModal");

    const modal = bootstrap.Modal.getInstance(modalElement);

    if (modal) {

        modal.hide();

    }

}

/*
=========================================
Delete Item
=========================================
*/

function deleteItem(id) {

    let cart = getCart(roomCode);

    const removed = cart.find(item => item.id === id);

    cart = cart.filter(item => item.id !== id);

    saveCart(roomCode, cart);

    if (removed) {

        addActivity(
            roomCode,
            `${username} removed ${removed.name}`
        );

    }

    renderCart();

    renderActivity(roomCode);

}

/*
=========================================
Render Cart
=========================================
*/

function renderCart() {

    const cart = getCart(roomCode);

    const table = document.getElementById("cartTable");

    table.innerHTML = "";

    if (cart.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    No Items
                </td>
            </tr>
        `;

        updateSummary();

        return;

    }

    cart.forEach(item => {

        table.innerHTML += `
            <tr>

                <td>${item.name}</td>

                <td>${item.qty}</td>

                <td>$${item.price.toFixed(2)}</td>

                <td>${item.addedBy}</td>

                <td>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteItem(${item.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

    updateSummary();

}

/*
=========================================
Summary
=========================================
*/

function updateSummary() {

    const cart = getCart(roomCode);

    let totalItems = cart.length;

    let totalQty = 0;

    let totalPrice = 0;

    cart.forEach(item => {

        totalQty += item.qty;

        totalPrice += item.qty * item.price;

    });

    document.getElementById("totalItems").textContent = totalItems;

    document.getElementById("totalQty").textContent = totalQty;

    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);

    updateProgress(totalPrice);

}

/*
=========================================
Progress Bar
=========================================
*/

function updateProgress(totalPrice) {

    let percent = (totalPrice / FREE_SHIPPING_LIMIT) * 100;

    if (percent > 100) {

        percent = 100;

    }

    const bar = document.getElementById("progressBar");

    bar.style.width = percent + "%";

    bar.textContent = Math.round(percent) + "%";

}
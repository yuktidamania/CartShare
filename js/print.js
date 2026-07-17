/*
=========================================
Print Receipt
=========================================
*/

document.addEventListener("DOMContentLoaded", function () {

    const printButton = document.getElementById("printReceipt");

    if (!printButton) return;

    printButton.addEventListener("click", function () {

        window.print();

    });

});

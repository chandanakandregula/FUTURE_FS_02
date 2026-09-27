let customers = JSON.parse(localStorage.getItem("customers")) || [];

const nameInput = document.querySelector('input[placeholder="Customer Name"]');
const emailInput = document.querySelector('input[placeholder="Email"]');
const phoneInput = document.querySelector('input[placeholder="Phone"]');
const button = document.querySelector("button");
const customerList = document.querySelector("ul");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const customerCount = document.getElementById("customerCount");
    function updateCustomerCount() {
    customerCount.textContent = "Total Customers: " + customers.length;
}

button.addEventListener("click", function() {
    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;

    if (name === "" || email === "" || phone === "") {
        alert("Please fill all fields.");
        return;
    }

    const customer = {
        name: name,
        email: email,
        phone: phone
    };

    customers.push(customer);
    updateCustomerCount();
    localStorage.setItem("customers", JSON.stringify(customers));

    addCustomerToList(customer);

    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
});

function addCustomerToList(customer) {
    const customerItem = document.createElement("li");

    const customerText = document.createElement("span");
    customerText.textContent =
        customer.name + " - " + customer.email + " - " + customer.phone;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    editButton.addEventListener("click", function() {
        const newName = prompt("Enter new name:", customer.name);
        const newEmail = prompt("Enter new email:", customer.email);
        const newPhone = prompt("Enter new phone:", customer.phone);

        if (newName === null || newEmail === null || newPhone === null) {
            return;
        }

        customer.name = newName;
        customer.email = newEmail;
        customer.phone = newPhone;

        customerText.textContent =
            customer.name + " - " + customer.email + " - " + customer.phone;

        localStorage.setItem("customers", JSON.stringify(customers));
    });

    deleteButton.addEventListener("click", function() {
        const index = customers.indexOf(customer);

        if (index !== -1) {
            customers.splice(index, 1);
        }

        localStorage.setItem("customers", JSON.stringify(customers));

        customerItem.remove();
    });

    customerItem.appendChild(customerText);
    customerItem.appendChild(editButton);
    customerItem.appendChild(deleteButton);

    customerList.appendChild(customerItem);
}
searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const customerItems = customerList.querySelectorAll("li");

    customerItems.forEach(function(item) {
        const customerText = item.textContent.toLowerCase();

        if (customerText.includes(searchText)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
});
clearSearch.addEventListener("click", function() {
    searchInput.value = "";

    const customerItems = customerList.querySelectorAll("li");

    customerItems.forEach(function(item) {
        item.style.display = "";
    });
});

customers.forEach(function(customer) {
    addCustomerToList(customer);
});
updateCustomerCount();

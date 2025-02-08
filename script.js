/**
 * Function to add an expense
 * This function handles the submission of the expense form,
 * saves the expense to Local Storage, and updates the expense list.
 */
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const expenseName = document.getElementById('expense-name').value; // Get the expense name from the input
    const expenseAmount = document.getElementById('expense-amount').value; // Get the expense amount from the input
    const expenseCategory = document.getElementById('expense-category').value; // Get the selected category

    const expense = {
        name: expenseName,
        amount: parseFloat(expenseAmount), // Convert amount to a number
        category: expenseCategory,
        date: new Date().toISOString() // Get the current date in ISO format
    };

    // Save expense to Local Storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Retrieve existing expenses or initialize an empty array
    expenses.push(expense); // Add the new expense to the array
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Save the updated expenses array to Local Storage

    // Clear form
    document.getElementById('expense-form').reset(); // Reset the form fields

    // Update expense list
    displayExpenses(); // Refresh the displayed list of expenses
});

/**
 * Function to display expenses
 * This function retrieves expenses from Local Storage and displays them
 * in the expense list, along with an edit button for each expense.
 */
function displayExpenses() {
    const expenseList = document.getElementById('expense-list'); // Get the container for the expense list
    expenseList.innerHTML = ''; // Clear the current list

    const expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Retrieve expenses from Local Storage
    expenses.forEach((expense, index) => {
        const div = document.createElement('div'); // Create a new div for each expense
        div.textContent = `${expense.name} - $${expense.amount} (${expense.category})`; // Set the text content

        // Create edit button
        const editButton = document.createElement('button'); // Create an edit button
        editButton.textContent = 'Edit'; // Set button text
        editButton.onclick = () => editExpense(index); // Set the click event to edit the expense
        div.appendChild(editButton); // Append the button to the expense div

        expenseList.appendChild(div); // Add the expense div to the list
    });
}

/**
 * Function to edit an expense
 * This function populates the expense form with the selected expense's
 * details for editing and removes the expense from the list temporarily.
 */
function editExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Retrieve expenses from Local Storage
    const expense = expenses[index]; // Get the selected expense

    // Populate the form with the expense details
    document.getElementById('expense-name').value = expense.name; // Set the name in the form
    document.getElementById('expense-amount').value = expense.amount; // Set the amount in the form
    document.getElementById('expense-category').value = expense.category; // Set the category in the form

    // Remove the expense from the list for editing
    expenses.splice(index, 1); // Remove the expense from the array
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Update Local Storage

    // Update the display
    displayExpenses(); // Refresh the displayed list of expenses
}

/**
 * Initial display of expenses
 * This function is called to display the expenses when the page loads.
 */
displayExpenses(); // Call the function to display expenses on page load

// Function to handle login
function handleLogin() {
    // Get username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate username and password criteria here
    // Redirect to index.html if valid
    window.location.href = 'index.html'; // Redirect to index.html after successful login
}

// Function to handle signup
function handleSignup() {
    // Get new username and password values
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // Validate new username and password criteria here
    // Redirect to index.html if valid
    window.location.href = 'index.html'; // Redirect to index.html after successful signup
}

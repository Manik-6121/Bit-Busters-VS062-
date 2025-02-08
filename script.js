/**
 * Function to add an expense
 * This function handles the submission of the expense form,
 * saves the expense to Local Storage, and updates the expense list.
 */
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const expenseName = document.getElementById('expense-name').value; // Get the expense name from the input
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value); // Get the expense amount from the input

    // Validate expense amount
    if (expenseAmount < 0) {
        alert("Expense amount must be zero or a positive number.");
        return; // Prevent form submission
    }

    const expenseCategory = document.getElementById('expense-category').value; // Get the selected category

    // Validate expense name
    const namePattern = /^[a-zA-Z0-9 ]+$/; // Regex for alphanumeric characters and spaces
    if (!namePattern.test(expenseName)) {
        alert("Expense name must consist of alphabets and numbers only.");
        return; // Prevent form submission
    }

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
    updateChart(); // Call to update the chart after adding a new expense
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
        div.textContent = `${expense.name} - ₹${expense.amount} (${expense.category})`; // Set the text content

        // Create edit button
        const editButton = document.createElement('button'); // Create an edit button
        editButton.textContent = 'Edit'; // Set button text
        editButton.onclick = () => editExpense(index); // Set the click event to edit the expense
        div.appendChild(editButton); // Append the button to the expense div

        expenseList.appendChild(div); // Add the expense div to the list
    });
}

/**
 * Function to handle monthly allowance input
 */
document.getElementById('set-allowance').addEventListener('click', function() {
    const allowance = parseFloat(document.getElementById('monthly-allowance').value); // Get the monthly allowance

    // Validate monthly allowance
    if (allowance < 0) {
        alert("Monthly allowance must be zero or a positive number.");
        return; // Prevent setting allowance
    }

    if (!isNaN(allowance)) {
        localStorage.setItem('monthlyAllowance', allowance); // Save the allowance to Local Storage
        updateSavings(); // Update savings display
    }
});

/**
 * Function to analyze expenses and provide recommendations
 */
function analyzeExpenses() {
    const allowance = parseFloat(localStorage.getItem('monthlyAllowance')) || 0; // Retrieve the allowance
    const expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Retrieve expenses from Local Storage
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0); // Calculate total expenses
    const savings = allowance - totalExpenses; // Calculate savings

    let recommendations = [];

    if (totalExpenses > allowance) {
        recommendations.push("Consider reducing discretionary spending to stay within your monthly allowance.");
    } else {
        recommendations.push("Great job! You're within your budget. Keep it up!");
    }

    if (savings < 0) {
        recommendations.push("You are currently in a deficit. Review your expenses and adjust your spending.");
    } else {
        recommendations.push(`You have saved ₹${savings}. Consider investing or saving this amount for future needs.`);
    }

    // Display recommendations
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = recommendations.join('<br>'); // Display recommendations as plain text
}

/**
 * Function to update savings based on expenses and allowance
 */
function updateSavings() {
    const allowance = parseFloat(localStorage.getItem('monthlyAllowance')) || 0; // Retrieve the allowance
    const expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Retrieve expenses from Local Storage
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0); // Calculate total expenses
    const savings = allowance - totalExpenses; // Calculate savings

    // Update the graph or display savings as needed
    console.log(`Total Expenses: ₹${totalExpenses}, Savings: ₹${savings}`); // Log savings for now

    analyzeExpenses(); // Call to analyze expenses and provide recommendations
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
    updateChart(); // Call to update the chart after displaying expenses
}

/**
 * Function to handle logout
 */
function handleLogout() {
    localStorage.removeItem('username'); // Remove username from local storage
    document.getElementById('username-display').textContent = ''; // Clear the displayed username
}

/**
 * Initial display of expenses
 * This function is called to display the expenses when the page loads.
 */
displayExpenses(); // Call the function to display expenses on page load


// Function to render all charts using the same data
function renderCharts(expenses) {
    const ctxBar = document.getElementById('bar-chart').getContext('2d');
    const ctxLine = document.getElementById('line-chart').getContext('2d');
    const ctxPie = document.getElementById('pie-chart').getContext('2d');

    // Clear previous chart instances if they exist
    if (window.myBarChart) {
        window.myBarChart.destroy(); // Clear previous bar chart instance
    }
    if (window.myLineChart) {
        window.myLineChart.destroy(); // Clear previous line chart instance
    }
    if (window.myPieChart) {
        window.myPieChart.destroy(); // Clear previous pie chart instance
    }

    const categories = [...new Set(expenses.map(expense => expense.category))]; // Get unique categories
    const categoryColors = {
        food: 'rgba(75, 192, 192, 0.6)',
        transport: 'rgba(255, 99, 132, 0.6)',
        entertainment: 'rgba(54, 162, 235, 0.6)',
        utilities: 'rgba(255, 206, 86, 0.6)',
    };

    const data = {
        labels: categories,
        datasets: [{
            label: 'Expenses',
            data: categories.map(category => {
                return expenses
                    .filter(expense => expense.category === category)
                    .reduce((total, expense) => total + expense.amount, 0);
            }),
            backgroundColor: categories.map(category => categoryColors[category] || 'rgba(0, 0, 0, 0.6)'),
            borderColor: categories.map(category => categoryColors[category] || 'rgba(0, 0, 0, 1)'),
            borderWidth: 1
        },
        {
            label: 'Savings',
            data: [parseFloat(localStorage.getItem('monthlyAllowance')) - expenses.reduce((total, expense) => total + expense.amount, 0)],
            backgroundColor: 'rgba(0, 255, 0, 0.6)', // Change savings color to green
            borderColor: 'rgba(0, 255, 0, 1)', // Change savings border color to green
            borderWidth: 1
        }]
    };

    // Bar Chart Configuration
    const barConfig = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Line Chart Configuration
    const lineConfig = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Pie Chart Configuration
    const pieConfig = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ₹' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    };

    // Create chart instances
    window.myBarChart = new Chart(ctxBar, barConfig); // Store the bar chart instance
    window.myLineChart = new Chart(ctxLine, lineConfig); // Store the line chart instance
    window.myPieChart = new Chart(ctxPie, pieConfig); // Store the pie chart instance
}

// Function to update all charts when expenses change
function updateCharts() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    renderCharts(expenses);
}

// Call to render all charts initially
updateCharts();

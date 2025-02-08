/**
 * Function to render the expense chart with animations
 * This function creates a chart based on the selected type and
 * retrieves data from Local Storage to display.
 */
function renderChart(chartType, ctx) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Retrieve expenses from Local Storage or initialize an empty array

    const labels = expenses.map(exp => exp.name); // Create an array of expense names for the chart labels
    const data = expenses.map(exp => exp.amount); // Create an array of expense amounts for the chart data

    const chartData = { // Data structure for the chart
        labels: labels,
        datasets: [{
            label: 'Expenses',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for the chart bars
            borderColor: 'rgba(75, 192, 192, 1)', // Border color for the chart bars
            borderWidth: 1 // Width of the border
        }]
    };

    const chartOptions = { // Options for configuring the chart's appearance and behavior
        animation: {
            duration: 1000, // Animation duration
            easing: 'easeOutBounce' // Animation easing
        },
        scales: {
            y: {
                beginAtZero: true // Start the y-axis at zero
            }
        }
    };

    // Clear the previous chart instance if it exists
    if (window.expenseChart) {
        window.expenseChart.destroy(); // Destroy the previous chart instance
    }

    // Create a new chart instance based on the selected chart type
    window.expenseChart = new Chart(ctx, {
        type: chartType, // Type of chart (bar, line, pie, etc.)
        data: chartData, // Data for the chart
        options: chartOptions // Options for the chart
    });
}

/**
 * Function to render all types of charts
 * This function creates multiple charts for different visualizations of expenses.
 */
function renderAllCharts() {
    const barChartCtx = document.getElementById('bar-chart').getContext('2d'); // Get context for bar chart
    const lineChartCtx = document.getElementById('line-chart').getContext('2d'); // Get context for line chart
    const pieChartCtx = document.getElementById('pie-chart').getContext('2d'); // Get context for pie chart

    renderChart('bar', barChartCtx); // Render bar chart
    renderChart('line', lineChartCtx); // Render line chart
    renderChart('pie', pieChartCtx); // Render pie chart
}

/**
 * Event listener for chart type selection
 * This listener updates the chart when the user selects a different chart type.
 */
document.getElementById('chart-type').addEventListener('change', function() {
    const selectedType = this.value; // Retrieve the selected chart type from the dropdown
    if (selectedType === 'breakdown') {
        renderSpendingBreakdown(); // Render the spending breakdown chart
    } else {
        renderAllCharts(); // Render all charts
    }
});

/**
 * Initial render with all chart types
 * This renders all charts when the page loads.
 */
renderAllCharts(); // Render all charts on page load

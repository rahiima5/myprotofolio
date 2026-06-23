// ==================== Chart Configuration ====================
let revenueChart, usersChart, categoryChart, trafficChart, performanceChart, productsChart;

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    setupEventListeners();
});

// ==================== Initialize Charts ====================
function initializeCharts() {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    };

    // Revenue Chart (Line)
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Revenue',
                data: [45000, 52000, 48000, 61000, 55000, 67000, 72000],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#3b82f6'
            }]
        },
        options: chartOptions
    });

    // Users Chart (Bar)
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    usersChart = new Chart(usersCtx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'New Users',
                data: [1200, 1900, 1600, 2100],
                backgroundColor: [
                    '#3b82f6',
                    '#2563eb',
                    '#1d4ed8',
                    '#1e40af'
                ],
                borderRadius: 8
            }]
        },
        options: chartOptions
    });

    // Category Chart (Doughnut)
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Fashion', 'Home', 'Sports', 'Books'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6'
                ]
            }]
        },
        options: chartOptions
    });

    // Traffic Chart (Pie)
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    trafficChart = new Chart(trafficCtx, {
        type: 'pie',
        data: {
            labels: ['Direct', 'Organic', 'Social', 'Referral'],
            datasets: [{
                data: [35, 30, 20, 15],
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ]
            }]
        },
        options: chartOptions
    });

    // Performance Chart (Radar)
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    performanceChart = new Chart(performanceCtx, {
        type: 'radar',
        data: {
            labels: ['Load Speed', 'Mobile', 'SEO', 'Security', 'UX'],
            datasets: [{
                label: 'Performance Score',
                data: [85, 90, 78, 88, 82],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                pointBackgroundColor: '#3b82f6'
            }]
        },
        options: chartOptions
    });

    // Products Chart (Horizontal Bar)
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    productsChart = new Chart(productsCtx, {
        type: 'bar',
        data: {
            labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
            datasets: [{
                label: 'Sales',
                data: [2500, 2100, 1800, 1600, 1400],
                backgroundColor: '#3b82f6',
                borderRadius: 8
            }]
        },
        options: {
            ...chartOptions,
            indexAxis: 'y'
        }
    });
}

// ==================== Update Charts ====================
function updateCharts() {
    const dateRange = document.getElementById('dateRange').value;
    const category = document.getElementById('category').value;
    const region = document.getElementById('region').value;

    console.log('Updating charts with:', { dateRange, category, region });
    
    // Simulate data update
    showNotification(`Charts updated! (${dateRange} days, ${category}, ${region})`);
    
    // In a real application, you would fetch new data and update the charts
}

// ==================== Event Listeners ====================
function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chart-menu')) {
            document.querySelectorAll('.chart-menu-dropdown').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
}

// ==================== Modal Functions ====================
function toggleDateRange() {
    const modal = document.getElementById('dateRangeModal');
    modal.classList.toggle('active');
}

function toggleNotifications() {
    const modal = document.getElementById('notificationsModal');
    modal.classList.toggle('active');
}

function applyDateRange() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate && endDate) {
        showNotification(`Date range updated: ${startDate} to ${endDate}`);
        toggleDateRange();
    }
}

// ==================== Sidebar Functions ====================
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// ==================== Filter Functions ====================
function applyFilters() {
    updateCharts();
    showNotification('Filters applied successfully!');
}

// ==================== Chart Menu ====================
function toggleMenu(button) {
    const dropdown = button.nextElementSibling;
    
    // Close all other dropdowns
    document.querySelectorAll('.chart-menu-dropdown').forEach(menu => {
        if (menu !== dropdown) {
            menu.classList.remove('active');
        }
    });
    
    dropdown.classList.toggle('active');
}

// ==================== Download & Export ====================
function downloadChart(e) {
    e.preventDefault();
    showNotification('Chart downloading...');
}

function viewDetails(e) {
    e.preventDefault();
    showNotification('Loading detailed view...');
}

function exportData() {
    showNotification('Data exported to CSV!');
}

function refreshData() {
    const btn = event.target.closest('button');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        showNotification('Data refreshed successfully!');
        updateCharts();
    }, 2000);
}

// ==================== Notifications ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== Animations ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Close Modals on Outside Click ====================
document.addEventListener('click', (e) => {
    const dateModal = document.getElementById('dateRangeModal');
    const notifModal = document.getElementById('notificationsModal');
    
    if (e.target === dateModal) {
        dateModal.classList.remove('active');
    }
    if (e.target === notifModal) {
        notifModal.classList.remove('active');
    }
});

// ==================== Responsive Sidebar ====================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
});

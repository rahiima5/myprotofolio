// ==================== DOM Elements ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const addWorkoutModal = document.getElementById('addWorkoutModal');
const addMealModal = document.getElementById('addMealModal');

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupScrollTracking();
    setupFormHandlers();
});

// ==================== Navigation ====================
function setupNavigation() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Nav links click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
        }
    });
}

// ==================== Scroll Tracking ====================
function setupScrollTracking() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== Modal Functions ====================
function toggleAddWorkout() {
    addWorkoutModal.classList.toggle('active');
}

function toggleAddMeal() {
    addMealModal.classList.toggle('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target === addWorkoutModal) {
        addWorkoutModal.classList.remove('active');
    }
    if (e.target === addMealModal) {
        addMealModal.classList.remove('active');
    }
});

// ==================== Form Handlers ====================
function setupFormHandlers() {
    const workoutForm = document.getElementById('workoutForm');
    const mealForm = document.getElementById('mealForm');

    if (workoutForm) {
        workoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Workout added successfully! 💪');
            workoutForm.reset();
            toggleAddWorkout();
        });
    }

    if (mealForm) {
        mealForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Meal logged successfully! 🍽️');
            mealForm.reset();
            toggleAddMeal();
        });
    }
}

// ==================== Workout & Meal Actions ====================
function editWorkout(button) {
    showNotification('Edit feature coming soon! ✏️');
}

function deleteWorkout(button) {
    const workoutItem = button.closest('.workout-item');
    workoutItem.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        workoutItem.remove();
        showNotification('Workout deleted! 🗑️');
    }, 300);
}

// ==================== Profile Functions ====================
function editProfile() {
    showNotification('Profile editing feature coming soon! 👤');
}

function updateMetrics() {
    showNotification('Metrics update feature coming soon! 📊');
}

function editGoals() {
    showNotification('Goals editor coming soon! 🎯');
}

function openSettings() {
    showNotification('Settings coming soon! ⚙️');
}

// ==================== Notifications ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
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

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }
`;
document.head.appendChild(style);

// ==================== Animation on Scroll ====================
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.stat-card, .workout-item, .meal-item, .profile-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.5s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

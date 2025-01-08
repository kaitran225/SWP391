const Auth = {
    init() {
        this.setupLoginHandler();
        // Hide user dropdown initially
        document.querySelector('.user-dropdown').style.display = 'none';
    },

    setupLoginHandler() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                // Show user dropdown
                document.querySelector('.user-dropdown').style.display = 'block';
                // Hide auth buttons
                document.getElementById('authButtons').querySelector('.btn-outline').style.display = 'none';
                document.getElementById('authButtons').querySelector('.btn-primary').style.display = 'none';
                
                // Set default user name
                document.getElementById('userName').textContent = 'Emma Thompson';
                
                // Add student class to body
                document.body.classList.add('is-student');
            });
        }
    }
};

// Initialize auth handling
document.addEventListener('DOMContentLoaded', () => Auth.init()); 
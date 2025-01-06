const Auth = {
    init() {
        this.checkAuthState();
        this.setupLogoutHandler();
    },

    checkAuthState() {
        // This should check your actual authentication state
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userType = localStorage.getItem('userType');
        
        if (isLoggedIn && userType === 'student') {
            this.showAuthenticatedUI();
        } else {
            this.showUnauthenticatedUI();
        }
    },

    showAuthenticatedUI() {
        document.body.classList.add('is-student');
        document.getElementById('authButtons').style.display = 'none';
        document.getElementById('userMenu').style.display = 'block';
        
        // Set user name if available
        const userName = localStorage.getItem('userName') || 'Student';
        document.getElementById('userName').textContent = userName;
    },

    showUnauthenticatedUI() {
        document.body.classList.remove('is-student');
        document.getElementById('authButtons').style.display = 'flex';
        document.getElementById('userMenu').style.display = 'none';
    },

    setupLogoutHandler() {
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });
    },

    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        this.showUnauthenticatedUI();
        window.location.href = 'pages/home.html';
    }
};

// Initialize auth handling
document.addEventListener('DOMContentLoaded', () => Auth.init()); 
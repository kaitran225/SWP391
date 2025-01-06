const Footer = {
    init() {
        this.footer = document.querySelector('.footer');
        this.lastScrollTop = 0;
        this.scrollThreshold = 20; // Minimum scroll amount before triggering
        this.setupScrollListener();
    },

    setupScrollListener() {
        const mainContent = document.getElementById('mainContent');
        
        mainContent.addEventListener('scroll', () => {
            this.handleScroll(mainContent);
        });
    },

    handleScroll(element) {
        const st = element.scrollTop;
        const maxScroll = element.scrollHeight - element.clientHeight;
        
        // Show footer when near bottom
        if (maxScroll - st <= 10) {
            this.footer.classList.add('show');
        }
        // Hide footer when scrolling up
        else if (st < this.lastScrollTop) {
            this.footer.classList.remove('show');
        }
        
        this.lastScrollTop = st;
    }
};

// Initialize footer functionality
document.addEventListener('DOMContentLoaded', () => Footer.init()); 
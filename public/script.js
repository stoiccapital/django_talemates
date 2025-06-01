document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links and pages
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // Function to handle navigation
    function handleNavigation(e) {
        e.preventDefault();
        
        // Remove active class from all links and pages
        navLinks.forEach(link => link.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

        // Get the target page ID from the href
        const targetId = this.getAttribute('href').substring(1);
        
        // Show the target page
        document.getElementById(targetId).classList.add('active');

        // Update URL without page reload
        history.pushState(null, '', this.getAttribute('href'));
    }

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'karteikarte';
        const targetLink = document.querySelector(`[href="#${hash}"]`);
        const targetPage = document.getElementById(hash);

        if (targetLink && targetPage) {
            navLinks.forEach(link => link.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            targetLink.classList.add('active');
            targetPage.classList.add('active');
        }
    });

    // Set initial active page based on URL hash or default to Karteikarte
    const initialHash = window.location.hash.substring(1) || 'karteikarte';
    const initialLink = document.querySelector(`[href="#${initialHash}"]`);
    const initialPage = document.getElementById(initialHash);

    if (initialLink && initialPage) {
        initialLink.classList.add('active');
        initialPage.classList.add('active');
    }
}); 
// js/components/Footer.js

// This function dynamically loads the CSS for the footer
function loadCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
}

// This function creates the HTML for our footer and adds it to the page.
function createFooter() {
    // Load the component's specific CSS
    loadCSS('css/components/footer.css');

    // The HTML for the footer. We use the HTML entity &#128151; for the pink heart.
    const footerHTML = `
        <footer class="site-footer">
            &copy; No-Rights Received, this is running on pure vibes &#128151;
        </footer>
    `;

    // Add the HTML to the end of the <body>
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Export the function so main.js can use it
export { createFooter };
// This function dynamically loads a CSS file into the <head>
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// This function creates the HTML for our top bar and adds it to the page.
function createToolbar() {
    // First, load the component's specific CSS
    loadCSS('css/components/toolbar.css');

    const toolbarHTML = `
        <header class="top-bar">
            <span>PIRATE</span>
        </header>
    `;

    // Add the HTML to the beginning of the <body>
    document.body.insertAdjacentHTML('afterbegin', toolbarHTML);
}

// We export the function so other files can import and use it.
export { createToolbar };
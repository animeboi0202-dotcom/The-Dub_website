// components/basecomponents/Toolbar.js

// This function injects the component's CSS into the <head>
function _injectCSS() {
    const styleId = 'toolbar-styles';
    if (document.getElementById(styleId)) {
        return;
    }

    const css = `
        /* Top Bar Styling */
        .top-bar {
            display: flex;
            align-items: center;
            margin-left: 20px;
            padding: 24px;
            height: 64px;
            background-color: rgba(32, 33, 36, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: #e8eaed;
            font-size: 40px;
            font-weight: 900;
        }

        /* NEW: Style for the toolbar link to preserve appearance */
        .top-bar a {
            text-decoration: none;
            color: inherit;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .top-bar {
                height: 56px; /* Reduced height */
                font-size: 28px; /* Smaller title font */
                margin-left: 0; /* Remove side margin */
                padding: 16px; /* Adjust padding */
            }
    `;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

/**
 * MODIFIED: This function now creates the HTML for our top bar and makes the
 * title a link on all pages except for the homepage.
 */
function createToolbar() {
    _injectCSS(); // Inject the styles

    // Check if the current page is the homepage.
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');

    // Conditionally create the content. If it's not the homepage, wrap the span in a link.
    const toolbarContent = isHomePage
        ? `<span>PIRATE</span>`
        : `<a href="/pages/list/"><span>PIRATE</span></a>`;

    const toolbarHTML = `
        <header class="top-bar">
            ${toolbarContent}
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', toolbarHTML);
}

// We export the function so other files can import and use it.
export { createToolbar };
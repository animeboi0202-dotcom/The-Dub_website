// components/basecomponents/Footer.js

function _injectCSS() {
    const styleId = 'footer-styles';
    if (document.getElementById(styleId)) {
        return;
    }

    const css = `
        /* --- STICKY FOOTER LOGIC --- */
        body {
            min-height: 100vh;
            min-height: 100dvh;
            display: flex;
            flex-direction: column;
        }

        .content-area {
            flex-grow: 1;
        }

        /* --- Original Footer Styling --- */
        .site-footer {
            text-align: center;
            padding: 20px;
            margin-top: 40px; 
            color: #a0a0a0;
            font-size: clamp(11px, 3vw, 14px);
            font-weight: 500;
            flex-shrink: 0;
            box-sizing: border-box; /* Add this for consistent padding behavior */
        }

          /* --- FINAL MOBILE STYLES BASED ON YOUR INSTRUCTIONS --- */
        @media (max-width: 768px) {
            body > .site-footer {
                /* 1. Make the footer box 90% wide and center it */
                width: 90%;
                margin: 40px auto 20px auto; /* Manages vertical and horizontal centering */
                
                /* 2. Remove all internal padding so the text can fill the box */
                padding: 0;

                /* 3. Force the text to stay on a single line */
                white-space: nowrap;
                
                /* 4. Make the font size scale with the screen width to fill the container */
                /* The 3.7vw value is a calculated starting point. You can adjust it 
                   slightly (e.g., to 3.6vw or 3.8vw) to get the perfect fit. */
                font-size: 3.7vw;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

// This function creates the HTML for our footer and adds it to the page.
// NO CHANGES ARE NEEDED HERE.
function createFooter() {
    _injectCSS(); // Inject the updated styles

    const footerHTML = `
        <footer class="site-footer">
            &copy; No-Rights Received, this is running on pure vibes &#128151;
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Export the function so it can be used anywhere
export { createFooter };
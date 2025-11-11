// components/mainpage/LinkList.js

// --- NEW: Define the default list data directly in this file ---
const defaultLinkData = [
    { url: '../op1145/', text: 'OP-1145: ai eng dub' }
    //{ url: '', text: '' }
];

// components/mainpage/LinkList.js

function _injectCSS() {
    const styleId = 'linklist-styles';
    if (document.getElementById(styleId)) {
        return;
    }

    const css = `
        .link-list-container {
            width: 50%;
            margin: 60px auto 0 auto;
            padding: 0;
            box-sizing: border-box;
        }

        .link-list {
            display: block;
            text-align: left;
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        .link-list li {
            margin-bottom: 25px;
            position: relative;
            padding-left: 35px;
        }

        .link-list li:last-child {
            margin-bottom: 0;
        }

        /* MODIFIED: Changed bullet point color */
        .link-list li::before {
            content: '•';
            color: #39FF14; /* This is the neon green from the warning box */
            font-size: 35px;
            font-weight: 900;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        /* MODIFIED: Changed link text style */
        .link-list a {
            color: #00b3ff;
            text-decoration: underline; /* Underline is now permanent */
            font-size: 24px;          /* Increased font size for desktop */
            font-weight: 900;           /* Changed to bold */
            transition: color 0.2s ease;
        }

        /* MODIFIED: Changed hover effect */
        .link-list a:hover {
            color: #33c7ff; /* A slightly brighter blue for feedback */
        }
        
        /* --- This is the existing mobile media query we will adjust --- */
        @media (max-width: 768px) {
            .link-list-container {
                width: 90%;
                margin-top: 40px;
            }
            .link-list li {
                padding-left: 25px;
            }
            /* MODIFIED: Adjusted font size for mobile */
            .link-list a {
                font-size: 24px; /* A larger, more tappable size for mobile */
            }
        }
    `;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

// MODIFIED: The function now uses the default data if no data is passed in.
export function createLinkList(linkData = defaultLinkData) {
    if (!linkData || linkData.length === 0) {
        console.error("LinkList Error: No link data was provided or is empty.");
        return;
    }

    _injectCSS(); // Inject the component's styles

    const linksHTML = linkData.map(item => `
        <li><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.text}</a></li>
    `).join('');

    const componentHTML = `
        <div class="link-list-container">
            <ul class="link-list">${linksHTML}</ul>
        </div>
    `;

    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.insertAdjacentHTML('beforeend', componentHTML);
    } else {
        console.error("LinkList Error: Could not find '.content-area' to attach to.");
    }
}
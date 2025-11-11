// components/dialgoge/WarningBox.js

function _injectCSS() {
    const styleId = 'warningbox-styles';
    if (document.getElementById(styleId)) {
        return; // Styles already added
    }

    const css = `
        /* 1. Defines the subtle pulsing animation */
        @keyframes subtle-pulse {
            0% {
                border-color: #d32f2f; /* Original Red */
            }
            50% {
                border-color: #ffaaaa; /* Lighter, soft red */
            }
            100% {
                border-color: #d32f2f; /* Original Red */
            }
        }

        /* 2. Your base styles for the warning box */
        .warning-box {
            width: fit-content; 
            margin: 40px auto 0 auto; 
            padding: 35px;
            box-sizing: border-box;
            border: 2px solid #d32f2f;
            border-radius: 8px;
            max-width: 90%;
            
            /* 3. Applies the animation with the new 5-second duration */
            animation: subtle-pulse 5s ease-in-out infinite;
        }

        /* --- Your Text Styles (Unchanged) --- */
        .warning-text {
            margin: 0;
            color: #e8eaed;
            font-size: 19px;
            line-height: 1.5;
            font-weight: 500;
            text-align: center;
        }

        .warning-text strong {
            color: #39FF14;
            font-weight: 900;
            text-decoration: underline;
        }

        /* --- Your Mobile Styles (Unchanged) --- */
        @media (max-width: 768px) {
            .warning-box {
                margin-top: 0px; 
                padding: 20px;
            }

            .warning-text {
                font-size: 14px;
            }
        }
    `;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

// MODIFIED: The function no longer accepts a 'message' argument.
// The warning message is now hardcoded directly inside.
export function createWarningBox() {
    _injectCSS(); // Inject the component's styles

    // --- NEW: The message is defined here ---
    const warningMessage = `
        All Of The Links Below Have Adult/Explicit Ads. Please Open In A Safe Environment.<br>
        You Have Been <strong>WARNED!!</strong>
    `;

    const componentHTML = `
        <div class="warning-box">
            <p class="warning-text">${warningMessage}</p>
        </div>
    `;

    // Find the main content area and add the box to it.
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.insertAdjacentHTML('beforeend', componentHTML);
    } else {
        console.error("WarningBox Error: Could not find '.content-area' to attach to.");
    }
}
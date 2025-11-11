// components/dialgoge/AdblockMessage.js

function _injectCSS() {
    const styleId = 'adblock-popup-styles';
    if (document.getElementById(styleId)) return; // Don't add styles twice

    // CSS is nearly identical to WelcomePopup for consistency.
    // Classes are renamed to avoid any potential style conflicts.
    const css = `
        .adblock-popup-backdrop {
            position: fixed; top: 0; left: 0; width: 100vw;
            height: 100vh; height: 100dvh;
            z-index: 10001; /* Higher z-index to appear above other elements */
            background-color: #202124; /* MODIFIED: Made the background opaque */
            box-sizing: border-box;

            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px;
        }
        
        .adblock-popup-dialog {
            background-color: #2d2d3a;
            border-radius: 12px;
            padding: 28px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-width: 500px;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .adblock-popup-header {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .adblock-popup-icon {
            width: 24px;
            height: 24px;
            color: #ffc107; /* A warning yellow color */
            flex-shrink: 0;
        }

        .adblock-popup-title {
            color: #ffffff;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            line-height: 1;
        }

        .adblock-popup-message {
            margin: 0;
            color: #e8eaed;
            font-size: 17px;
            font-weight: 500;
            line-height: 1.6;
            text-align: left;
            width: fit-content;
            align-self: center;
        }

        /* MODIFIED: The button style is no longer needed but is kept for potential future use */
        .adblock-popup-button {
            background-color: #00b3ff;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            align-self: center;
            margin-top: 8px;
        }
        .adblock-popup-button:hover {
            background-color: #0099e6;
        }

        /* Mobile overrides */
        @media (max-width: 768px) {
            .adblock-popup-backdrop {
                display: block;
            }
            .adblock-popup-dialog {
                position: absolute;
                top: 40%;
                transform: translateY(-50%);
                left: 15px;
                right: 15px;
                width: auto;
                padding: 24px;
                gap: 12px;
            }
            .adblock-popup-icon { width: 20px; height: 20px; }
            .adblock-popup-title { font-size: 20px; }
            .adblock-popup-message { font-size: 16px; }
        }
    `;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

/**
 * Creates and displays a popup message if it hasn't been shown in the current session.
 */
export function createAdblockMessage() {
    const popupShownKey = 'adblockMessageShown';

    // Don't show the popup if the user has already closed it in this session.
    if (sessionStorage.getItem(popupShownKey) === 'true') {
        return;
    }

    _injectCSS();

    // --- Content for the Adblock Popup ---
    const iconSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
    `;
    const titleText = "Adblocker Detected";
    // MODIFIED: The message text is now exactly what you requested.
    const messageText = `Sorry but you must watch ads. You see renting GPU's is very expensive and this dubbing thing requires a lot of GPU's. So running these ads is the only way right now.`;
    
    // --- HTML Structure (Mirrors WelcomePopup) ---
    const backdrop = document.createElement('div');
    backdrop.className = 'adblock-popup-backdrop';

    const dialog = document.createElement('div');
    dialog.className = 'adblock-popup-dialog';

    const header = document.createElement('div');
    header.className = 'adblock-popup-header';

    const icon = document.createElement('div');
    icon.className = 'adblock-popup-icon';
    icon.innerHTML = iconSVG;

    const title = document.createElement('h2');
    title.className = 'adblock-popup-title';
    title.textContent = titleText;

    const message = document.createElement('p');
    message.className = 'adblock-popup-message';
    message.textContent = messageText;

    header.appendChild(icon);
    header.appendChild(title);

    dialog.appendChild(header);
    dialog.appendChild(message);
    
    // MODIFIED: The button and its event listener have been removed.
    // const closeButton = document.createElement('button'); ...
    // dialog.appendChild(closeButton);
    
    backdrop.appendChild(dialog);
    document.body.appendChild(backdrop);

    // MODIFIED: Event handling for the button has been removed.
    // const onClose = () => { ... };
    // closeButton.addEventListener('click', onClose, { once: true });
}
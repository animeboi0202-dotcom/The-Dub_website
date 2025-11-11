// components/dialgoge/WelcomePopup.js

function _injectCSS() {
    const styleId = 'welcomepopup-styles';
    if (document.getElementById(styleId)) return;

    const css = `
        .welcome-popup-backdrop {
            position: fixed; top: 0; left: 0; width: 100vw;
            height: 100vh; height: 100dvh;
            z-index: 10000;
            background-color: #202124;
            box-sizing: border-box;

            /* --- DESKTOP CENTERING (DEFAULT) --- */
            /* This will perfectly center the dialog on larger screens */
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px; /* Padding for desktop view */
        }
        
        .welcome-popup-dialog {
            background-color: #2d2d3a;
            border-radius: 12px;
            padding: 28px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-width: 500px;
            width: 100%; /* Will respect parent's padding in flex mode */
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .welcome-popup-header {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .welcome-popup-icon {
            width: 24px;
            height: 24px;
            color: #00b3ff;
            flex-shrink: 0;
        }

        .welcome-popup-title {
            color: #ffffff;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            line-height: 1;
        }

        .welcome-popup-message {
            margin: 0;
            color: #e8eaed;
            font-size: 17px;
            font-weight: 500;
            line-height: 1.6;
            text-align: left;
            width: fit-content;
            align-self: center;
        }

        .welcome-popup-button {
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
        .welcome-popup-button:hover {
            background-color: #0099e6;
        }

        /* --- MOBILE OVERRIDES --- */
        @media (max-width: 768px) {
            .welcome-popup-backdrop {
                /* On mobile, we don't use flex for positioning */
                display: block;
            }

            .welcome-popup-dialog {
                /* --- MOBILE POSITIONING (40% HEIGHT) --- */
                position: absolute;
                top: 40%;
                /* This vertically centers the dialog on the 40% line */
                transform: translateY(-50%);

                /* This is the key to fixing the padding issue */
                /* It creates a 15px gutter on both sides */
                left: 15px;
                right: 15px;
                width: auto; /* Allow left/right to control the width */

                /* Other mobile refinements */
                padding: 24px;
                gap: 12px;
            }

            .welcome-popup-icon {
                width: 20px;
                height: 20px;
            }
            .welcome-popup-title {
                font-size: 20px;
            }
            .welcome-popup-message {
                font-size: 16px;
            }
        }
    `;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

/**
 * Creates and displays the final, refined notification popup.
 */
export function createWelcomePopup() {
    const popupShownKey = 'welcomePopupShown';
    
    if (sessionStorage.getItem(popupShownKey) === 'true') {
        return Promise.resolve();
    }

    return new Promise(resolve => {
        _injectCSS();

        // --- Content (Unchanged) ---
        const iconSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
        `;
        const titleText = "Heads-Up";
        const messageText = `This page includes Adult/Explicit ads please open in a safe environment.`;
        const buttonText = "Continue";

        // --- HTML Structure (Unchanged) ---
        const backdrop = document.createElement('div');
        backdrop.className = 'welcome-popup-backdrop';

        const dialog = document.createElement('div');
        dialog.className = 'welcome-popup-dialog';

        const header = document.createElement('div');
        header.className = 'welcome-popup-header';

        const icon = document.createElement('div');
        icon.className = 'welcome-popup-icon';
        icon.innerHTML = iconSVG;

        const title = document.createElement('h2');
        title.className = 'welcome-popup-title';
        title.textContent = titleText;

        const message = document.createElement('p');
        message.className = 'welcome-popup-message';
        message.textContent = messageText;

        const continueButton = document.createElement('button');
        continueButton.className = 'welcome-popup-button';
        continueButton.textContent = buttonText;
        
        header.appendChild(icon);
        header.appendChild(title);

        dialog.appendChild(header);
        dialog.appendChild(message);
        dialog.appendChild(continueButton);
        
        backdrop.appendChild(dialog);
        document.body.appendChild(backdrop);

        // --- Event Handling (Unchanged) ---
        const onContinue = () => {
            sessionStorage.setItem(popupShownKey, 'true');
            backdrop.remove();
            resolve();
        };

        continueButton.addEventListener('click', onContinue, { once: true });
    });
}
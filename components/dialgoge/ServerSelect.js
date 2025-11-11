// /components/dialgoge/ServerSelect.js

/**
 * Injects the CSS needed for the Server Selector component.
 */
function _injectCSS() {
    const styleId = 'serverselector-styles';
    if (document.getElementById(styleId)) return;

    const css = `
        /* --- Styles for the Server Selector --- */
        .server-selector-container {
            font-family: 'Roboto', sans-serif;
            background-color: #2D2D3A;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px; /* This creates the space below the video player */
            box-sizing: border-box;
            width: 100%; /* Ensures it fills the parent player scaffold */
        }

        .selector-row {
            display: flex;
            align-items: center;
            gap: 10px; /* Reduced gap to accommodate the icon */
        }

        /* Styles for the server icon */
        .selector-icon {
            width: 22px; /* Set a fixed size */
            height: 22px;
            color: #e8eaed; /* Match the label color */
            flex-shrink: 0; /* Prevents the icon from shrinking */
        }

        .row-label {
            font-size: 18px;
            font-weight: 500;
            color: #e8eaed;
        }

        .selector-buttons {
            display: flex;
            gap: 10px;
        }

        .server-btn {
            background-color: #43445A;
            color: #e8eaed;
            border: none;
            border-radius: 6px;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .server-btn:hover {
            background-color: #5a5b70;
        }

        /* MODIFIED: The .active style is the only one that matters now for the selected state */
        .server-btn.active {
            background-color: #00b3ff;
            color: #ffffff;
        }

        /* --- Styles for the Info Box --- */
        .info-box {
            background-color: #00b3ff;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            font-size: 16px;
            line-height: 1.5;
            text-align: center;
            margin-top: 20px;
            font-weight: 700; 
        }
        
        /* --- Responsive Styles --- */
        @media (max-width: 768px) {
            .selector-icon {
                width: 20px;
                height: 20px;
            }
            .row-label {
                font-size: 16px;
            }
            .server-btn {
                padding: 8px 14px;
                font-size: 13px;
            }
        }
    `;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

/**
 * Creates the server selection UI and handles its interactions.
 * @param {HTMLElement} parentElement - The element to attach this component to.
 * @param {Array} serverList - The list of server objects.
 * @param {Function} onServerChange - A callback function to run when a server is changed.
 */
export function createServerSelector(parentElement, serverList, onServerChange) {
    if (!parentElement || !serverList || serverList.length === 0) return;

    _injectCSS();

    // MODIFIED: The 'disabled' logic has been completely removed.
    const buttonsHTML = serverList.map((server, index) =>
        `<button class="server-btn ${index === 0 ? 'active' : ''}" data-index="${index}">${server.name}</button>`
    ).join('');

    const infoBoxText = "Please use a VPN! If the current server doesn't work try others.";

    const componentHTML = `
        <div class="server-selector-container">
            <div class="selector-row">
                <div class="selector-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/>
                    </svg>
                </div>
                <span class="row-label">Server:</span>
                <div class="selector-buttons">${buttonsHTML}</div>
            </div>
            <div class="info-box">${infoBoxText}</div>
        </div>
    `;

    parentElement.insertAdjacentHTML('beforeend', componentHTML);

    // MODIFIED: The click listeners are now attached regardless of how many servers there are.
    const serverButtons = parentElement.querySelectorAll('.server-btn');
    serverButtons.forEach(button => {
        button.addEventListener('click', () => {
            // This logic now works for any number of buttons.
            serverButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const serverIndex = parseInt(button.dataset.index, 10);
            const newEmbedCode = serverList[serverIndex].embedCode;
            
            if (typeof onServerChange === 'function') {
                onServerChange(newEmbedCode);
            }
        });
    });
}
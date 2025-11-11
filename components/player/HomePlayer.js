// ./components/player/HomePlayer.js

/**
 * Injects the necessary CSS for the home player into the document's head.
 */
function _injectCSS() {
    const styleId = 'homeplayer-styles';
    if (document.getElementById(styleId)) return;

    const css = `
        .home-player-container {
            width: 90%;
            max-width: 854px; /* Standard 16:9 width */
            margin: 40px auto 0 auto; /* Center it and give it some top margin */
            background-color: #000;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            aspect-ratio: 16 / 9;
            position: relative; /* Needed for the iframe positioning */
        }

        .home-player-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }
    `;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

/**
 * Creates a simple, single-iframe player for the homepage.
 * @param {string} embedCode - The full HTML string for the iframe.
 */
export function createHomePlayer(embedCode) {
    if (!embedCode) {
        console.error("HomePlayer Error: createHomePlayer() was called without embedCode.");
        return;
    }

    _injectCSS();

    const playerHTML = `
        <div class="home-player-container">
            ${embedCode}
        </div>
    `;

    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.insertAdjacentHTML('beforeend', playerHTML);
    } else {
        console.error("HomePlayer Error: Could not find '.content-area' to attach the player to.");
    }
}
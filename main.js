// ./main.js

import { createToolbar } from './components/basecomponents/Toolbar.js';
import { createLayout } from './components/basecomponents/Layout.js';
import { createFooter } from './components/basecomponents/Footer.js';
import { createHomePlayer } from './components/player/HomePlayer.js'; // Import the new, simple player

/**
 * Main function to assemble the ad-free homepage.
 */
function buildPage() {
    // 1. Build the basic page structure.
    createToolbar();
    createLayout();
    createFooter();

    // 2. Define the single video for the homepage player.
    const homeVideoEmbed = `<iframe src="https://www.xvideos.com/embedframe/uplkhmdd73e" frameborder=0 scrolling=no allowfullscreen=allowfullscreen></iframe>`;

    // 3. Create the simple homepage video player.
    createHomePlayer(homeVideoEmbed);

    // 4. Add the custom message below the player.
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        const messageHTML = `
            <h2 style="
                text-align: center; 
                font-weight: 700; 
                font-size: 26px; 
                color: #e8eaed; 
                margin-top: 40px; 
                width: 50%;
            ">
                Please be patient more naughty content incoming.
            </h2>
        `;
        contentArea.insertAdjacentHTML('beforeend', messageHTML);
    }
}

// Start building the page once the DOM is ready.
document.addEventListener('DOMContentLoaded', buildPage);
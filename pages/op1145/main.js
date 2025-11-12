// pages/op1145/main.js

import { createToolbar } from '../../components/basecomponents/Toolbar.js';
import { createLayout } from '../../components/basecomponents/Layout.js';
import { createFooter } from '../../components/basecomponents/Footer.js';
import { createWelcomePopup } from '../../components/dialgoge/WelcomePopup.js';
import { createPlayer } from '../../components/player/Player.js';

/**
 * Main function to assemble the ad-free video page.
 */
async function buildPage() {
    // 1. Build the basic page structure.
    createToolbar();
    createLayout();
    createFooter();

    // 2. Define the video servers for the player.
    const videoIframes = [
        { name: 'Server 1', embedCode: `<iframe src="https://streamtape.com/e/vp1WzMakm2sL6J/" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"</iframe>` }
    ];

    // 3. Create the main video player component.
    createPlayer(videoIframes);

    // 4. Immediately find the main player and make it visible.
    const mainPlayer = document.getElementById('main-content-player');
    if (mainPlayer) {
        mainPlayer.classList.remove('hidden');
    }
    
    // 5. Display the initial welcome popup.
    await createWelcomePopup();
}

// Start building the page once the DOM is ready.
document.addEventListener('DOMContentLoaded', buildPage);
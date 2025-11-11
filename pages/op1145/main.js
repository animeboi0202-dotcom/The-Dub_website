// pages/op1145/main.js

import { createToolbar } from '../../components/basecomponents/Toolbar.js';
import { createLayout } from '../../components/basecomponents/Layout.js';
import { createFooter } from '../../components/basecomponents/Footer.js';
import { createWelcomePopup } from '../../components/dialgoge/WelcomePopup.js';
import { createAdPlayer } from '../../components/player/dasPlayer.js';
import { createPlayer } from '../../components/player/Player.js';
import { createAdLayout } from '../../components/das/layout.js';
// NEW: Import the adblock checker, adjusting the path.
import { runAdblockCheck } from '../../utils/dsablockerCheck.js';

function adjustAdLayoutPosition(visiblePlayerElement) {
    const toolbar = document.querySelector('.top-bar');
    const adLayout = document.querySelector('.ad-layout-container');
    if (!toolbar || !visiblePlayerElement || !adLayout) return;

    const viewportHeight = window.innerHeight;
    const toolbarHeight = toolbar.offsetHeight;
    const playerHeight = visiblePlayerElement.offsetHeight;
    const remainingSpace = viewportHeight - toolbarHeight - playerHeight;
    adLayout.style.marginTop = remainingSpace > 0 ? `${remainingSpace}px` : '0px';
}

async function buildPage() {
    createToolbar();
    createLayout();
    createFooter();

    const videoIframes = [
        { name: 'HD', embedCode: `<iframe src="https://streamtape.com/e/r3z0WBYmPYFGme/" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"</iframe>` },
        { name: 'SD', embedCode: `<iframe src="https://streamtape.com/e/29woogJPeqfZLmp/" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"</iframe>` }
    ];

    createPlayer(videoIframes);
    createAdPlayer(() => {
        const mainPlayer = document.getElementById('main-content-player');
        if (mainPlayer) {
            mainPlayer.classList.remove('hidden');
            setTimeout(() => {
                adjustAdLayoutPosition(mainPlayer);
            }, 0);
        }
    });
    createAdLayout();

    await createWelcomePopup();

    const adPlayer = document.getElementById('ad-player-scaffold');
    adjustAdLayoutPosition(adPlayer);

    // NEW: Run the adblock check as the final step.
    runAdblockCheck();
}

document.addEventListener('DOMContentLoaded', buildPage);
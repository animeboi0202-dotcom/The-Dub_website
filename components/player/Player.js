// /components/player/Player.js

import { createServerSelector } from '../../components/dialgoge/ServerSelect.js';

function loadCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
}

export function createPlayer(serverList) {
    if (!serverList || serverList.length === 0) return;
    loadCSS('../../components/player/player.css');

    // The player's HTML is now just the wrapper and the iframe area.
    const componentHTML = `
        <div id="main-content-player" class="player-scaffold hidden">
            <div id="iframe-wrapper" class="iframe-wrapper">
                ${serverList[0].embedCode}
            </div>
        </div>
    `;

    const contentArea = document.querySelector('.content-area');
    if (!contentArea) return;
    
    contentArea.insertAdjacentHTML('beforeend', componentHTML);

    // After creating the player, find its scaffold.
    const playerScaffold = document.getElementById('main-content-player');
    
    // Define the callback function that will update the iframe.
    const handleServerChange = (newEmbedCode) => {
        const iframeWrapper = playerScaffold.querySelector('#iframe-wrapper');
        if (iframeWrapper) {
            iframeWrapper.innerHTML = newEmbedCode;
        }
    };

    // Now, create the server selector and attach it to the player scaffold.
    createServerSelector(playerScaffold, serverList, handleServerChange);
}
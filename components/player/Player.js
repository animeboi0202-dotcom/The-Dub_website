// /components/player/Player.js

import { createServerSelector } from '../../components/dialgoge/ServerSelect.js';
import { createContactBanner } from '../../components/messages/ContactBanner.js';

/**
 * Utility function to load a CSS file if it hasn't been loaded already.
 * @param {string} href - The path to the CSS file.
 */
function loadCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
}

/**
 * Creates the main video player, its server selector, and a contact banner.
 * @param {Array} serverList - An array of server objects, each with a 'name' and 'embedCode'.
 */
export function createPlayer(serverList) {
    if (!serverList || serverList.length === 0) {
        console.error("Player Error: createPlayer() was called with no server data.");
        return;
    }
    
    // Load the external CSS for this component.
    loadCSS('../../components/player/player.css');

    // Define the HTML structure for the player. It starts hidden.
    const componentHTML = `
        <div id="main-content-player" class="player-scaffold hidden">
            <div id="iframe-wrapper" class="iframe-wrapper">
                ${serverList[0].embedCode}
            </div>
        </div>
    `;

    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
        console.error("Player Error: Could not find '.content-area' to attach the player to.");
        return;
    }
    
    // Add the player structure to the page.
    contentArea.insertAdjacentHTML('beforeend', componentHTML);

    // Get a reference to the player's main container element.
    const playerScaffold = document.getElementById('main-content-player');
    
    /**
     * Callback function that updates the iframe when a new server is selected.
     * @param {string} newEmbedCode - The new iframe HTML to display.
     */
    const handleServerChange = (newEmbedCode) => {
        const iframeWrapper = playerScaffold.querySelector('#iframe-wrapper');
        if (iframeWrapper) {
            iframeWrapper.innerHTML = newEmbedCode;
        }
    };

    // 1. Create the server selector UI and attach it inside the player scaffold.
    createServerSelector(playerScaffold, serverList, handleServerChange);

    // 2. Create the contact banner and attach it inside the player scaffold.
    createContactBanner(playerScaffold);
}
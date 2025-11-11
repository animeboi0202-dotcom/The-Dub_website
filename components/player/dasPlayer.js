// /components/player/AdPlayer.js

// NEW: Import the new InfoBanner component
import { createInfoBanner } from '../messages/Info.js';

/**
 * Injects the necessary CSS for the ad player into the document's head.
 */
function _injectCSS() {
    const styleId = 'adplayer-styles';
    if (document.getElementById(styleId)) return;

    // MODIFIED: All CSS for the heading and sub-text has been removed.
    // This file is now only responsible for styling the player itself.
    const css = `
        .ad-player-scaffold {
            width: 50%; max-width: 854px; margin: 0 auto;
            display: flex; flex-direction: column; align-items: center;
        }
        .ad-player-scaffold.hidden { display: none; }

        .ad-player-container {
            width: 100%; background-color: #000; position: relative;
            border-radius: 8px; overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            aspect-ratio: 16 / 9;
        }
        .ad-player-container video { width: 100%; height: 100%; }
        .ad-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .ad-play-button {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%); width: 80px; height: 80px;
            background-color: rgba(0, 0, 0, 0.6); border: 3px solid white;
            border-radius: 50%; cursor: pointer; z-index: 100;
            display: flex; justify-content: center; align-items: center;
            transition: background-color 0.2s;
        }
        .ad-play-button:hover { background-color: rgba(0, 179, 255, 0.8); }
        .ad-play-button::after {
            content: ''; display: block; width: 0; height: 0;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
            border-left: 30px solid white; margin-left: 7px;
        }

        @media (max-width: 768px) {
            .ad-player-scaffold { width: 95%; }
        }
    `;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

export function createAdPlayer(onAdCompleteCallback) {
    _injectCSS();

    // MODIFIED: The complex message HTML has been removed.
    // The scaffold now only contains the player itself.
    const playerHTML = `
        <div id="ad-player-scaffold" class="ad-player-scaffold">
            <div id="ad-player-container" class="ad-player-container">
                <video id="ad-content-video"></video>
                <div id="ad-container" class="ad-container"></div>
                <div id="ad-play-button" class="ad-play-button"></div>
            </div>
        </div>
    `;

    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
        console.error("AdPlayer Error: Could not find '.content-area'.");
        return;
    }
    contentArea.insertAdjacentHTML('beforeend', playerHTML);

    // NEW: Find the scaffold we just created and use it as the parent
    // for our new InfoBanner component.
    const adPlayerScaffold = document.getElementById('ad-player-scaffold');
    if (adPlayerScaffold) {
        createInfoBanner(adPlayerScaffold);
    }
    
    _setupPlayerInteractions(onAdCompleteCallback);
}

// This entire function remains unchanged.
function _setupPlayerInteractions(onAdCompleteCallback) {
    const adPlayerScaffold = document.getElementById('ad-player-scaffold');
    const videoElement = document.getElementById('ad-content-video');
    const adContainer = document.getElementById('ad-container');
    const adPlayerContainer = document.getElementById('ad-player-container');
    const playButton = document.getElementById('ad-play-button');
    let adsManager = null;
    let adDisplayContainer;
    let adsLoader;
    const adTagUrls = [
        'https://liquidabroad.com/dYm/F/zJd.GgNbvYZmGXUx/ve/mA9_uAZ/UelRkkPfTgYC2hOGTpEj4kMEj/EttZNyjlYb5MMnT/gRywMSiiZms/a/WA1/pJd_Dj0wxD',
        'https://youradexchange.com/video/select.php?r=10608854'
    ];
    let currentAdTagIndex = 0;
    function playAds() {
        playButton.style.display = 'none';
        if (!adDisplayContainer.isInitialized) adDisplayContainer.initialize();
        const adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = adTagUrls[currentAdTagIndex];
        adsRequest.linearAdSlotWidth = adPlayerContainer.clientWidth;
        adsRequest.linearAdSlotHeight = adPlayerContainer.clientHeight;
        adsLoader.requestAds(adsRequest);
    }
    function onPlayButtonClick() {
        const footer = document.querySelector('.site-footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'auto' });
        }
        playAds();
    }
    if (window.google && window.google.ima) {
        adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);
        adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded);
        adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
        playButton.addEventListener('click', onPlayButtonClick);
    } else {
        console.error("AdPlayer Error: Google IMA SDK not found.");
        onAdEnded();
    }
    function onAdsManagerLoaded(e) {
        adsManager = e.getAdsManager(videoElement);
        adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, onAdEnded);
        adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, onAdEnded);
        adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
        try {
            adsManager.init(adPlayerContainer.clientWidth, adPlayerContainer.clientHeight, google.ima.ViewMode.NORMAL);
            adsManager.start();
        } catch (adError) {
            onAdEnded();
        }
    }
    function onAdEnded() {
        adPlayerScaffold.classList.add('hidden');
        if (onAdCompleteCallback && typeof onAdCompleteCallback === 'function') {
            onAdCompleteCallback();
        }
        if (adsManager) adsManager.destroy();
    }
    function onAdError(adErrorEvent) {
        console.error(`Ad Error on #${currentAdTagIndex + 1}:`, adErrorEvent.getError());
        currentAdTagIndex++;
        if (currentAdTagIndex < adTagUrls.length) {
            playAds();
        } else {
            onAdEnded();
        }
    }
    window.addEventListener('resize', () => {
        if (adsManager) {
            adsManager.resize(
                adPlayerContainer.clientWidth, adPlayerContainer.clientHeight, google.ima.ViewMode.NORMAL
            );
        }
    });
}
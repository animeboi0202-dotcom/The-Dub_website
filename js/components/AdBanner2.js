// js/components/AdBanner2.js

function loadCSS(href) {
    // This function ensures the shared CSS is loaded.
    if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
}

function createAdBanner2() {
    loadCSS('css/components/adbanner.css');

    // This check prevents the main library from being added twice.
    if (!document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]')) {
        const externalAdScript = document.createElement('script');
        externalAdScript.async = true;
        externalAdScript.type = 'application/javascript';
        externalAdScript.src = 'https://a.magsrv.com/ad-provider.js';
        document.head.appendChild(externalAdScript);
    }

    // Create the container and elements for the second ad.
    const adContainer = document.createElement('div');
    adContainer.className = 'ad-banner-container';

    const adIns = document.createElement('ins');
    adIns.className = 'eas6a97888e2';
    adIns.setAttribute('data-zoneid', '5760458'); // Zone ID for the second banner

    const inlineAdScript = document.createElement('script');
    inlineAdScript.textContent = '(AdProvider = window.AdProvider || []).push({"serve": {}});';

    adContainer.appendChild(adIns);
    adContainer.appendChild(inlineAdScript);

    // Append the final ad unit to the main content area.
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.appendChild(adContainer);
    } else {
        console.error("AdBanner2 Error: Could not find the '.content-area' to attach ad to.");
    }
}

export { createAdBanner2 };
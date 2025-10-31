// js/components/AdBanner3.js

function loadCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
}

function createAdBanner3() {
    loadCSS('css/components/adbanner.css');

    // Load the main ad library script if it's not already on the page.
    if (!document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]')) {
        const externalAdScript = document.createElement('script');
        externalAdScript.async = true;
        externalAdScript.type = 'application/javascript';
        externalAdScript.src = 'https://a.magsrv.com/ad-provider.js';
        document.head.appendChild(externalAdScript);
    }

    // Create the container and elements for this specific ad.
    const adContainer = document.createElement('div');
    adContainer.className = 'ad-banner-container';

    const adIns = document.createElement('ins');
    // Set the specific class and zone ID for this new banner.
    adIns.className = 'eas6a97888e37'; 
    adIns.setAttribute('data-zoneid', '5760484');

    const inlineAdScript = document.createElement('script');
    inlineAdScript.textContent = '(AdProvider = window.AdProvider || []).push({"serve": {}});';

    adContainer.appendChild(adIns);
    adContainer.appendChild(inlineAdScript);

    // Append the final ad unit to the main content area.
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.appendChild(adContainer);
    } else {
        console.error("AdBanner3 Error: Could not find the '.content-area' to attach ad to.");
    }
}

export { createAdBanner3 };
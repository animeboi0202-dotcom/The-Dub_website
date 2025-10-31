// js/components/AdBanner1.js

function loadCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
}

function createAdBanner1() {
    loadCSS('css/components/adbanner.css');

    const adContainer = document.createElement('div');
    // I am removing the debugging class 'ad-banner-1' as it's no longer needed.
    adContainer.className = 'ad-banner-container';

    const optionsScript = document.createElement('script');
    optionsScript.type = 'text/javascript';
    optionsScript.textContent = `
        atOptions = {
            'key' : 'f9d1df2e3a4096cc2d3faaed87fbeadf',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
        };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/f9d1df2e3a4096cc2d3faaed87fbeadf/invoke.js';

    adContainer.appendChild(optionsScript);
    adContainer.appendChild(invokeScript);

    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.appendChild(adContainer);
    } else {
        // Updated error message to match the file name.
        console.error("AdBanner1 Error: Could not find the '.content-area' to attach ad to.");
    }
}

export { createAdBanner1 };
// ./components/ads/banners/adsterra_banner.js

/**
 * Creates and injects an Adsterra banner ad into a specified parent element.
 * @param {HTMLElement} parentElement - The HTML element where the ad should be placed.
 */
export function createAdsterraBanner(parentElement) {
    if (!parentElement) {
        console.error("AdsterraBanner Error: A valid parentElement must be provided.");
        return;
    }

    // Create the first script tag to define the ad options.
    const optionsScript = document.createElement('script');
    optionsScript.type = 'text/javascript';
    optionsScript.textContent = `
        atOptions = {
            'key' : 'e46a63efa3abc45990cb36cb960e6900',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
        };
    `;

    // Create the second script tag that loads the ad from the Adsterra server.
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/e46a63efa3abc45990cb36cb960e6900/invoke.js';

    // Append the scripts to the designated parent element in the correct order.
    parentElement.appendChild(optionsScript);
    parentElement.appendChild(invokeScript);
}
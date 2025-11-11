// ./components/ads/banners/adsterra-native.js

/**
 * Creates and injects an Adsterra native ad into a specified parent element.
 * @param {HTMLElement} parentElement - The HTML element where the ad should be placed.
 */
export function createAdsterraNative(parentElement) {
    if (!parentElement) {
        console.error("AdsterraNative Error: A valid parentElement must be provided.");
        return;
    }

    // Create the script tag that loads the native ad.
    const invokeScript = document.createElement('script');
    invokeScript.async = true;
    invokeScript.setAttribute('data-cfasync', 'false');
    invokeScript.src = '//pl27999413.effectivegatecpm.com/e88986acbf2aa4038d1e29a3cddd1a81/invoke.js';

    // Create the div that the native ad script will use as a container.
    const nativeDiv = document.createElement('div');
    nativeDiv.id = 'container-e88986acbf2aa4038d1e29a3cddd1a81';

    // Append the script and the container div to the designated parent element.
    parentElement.appendChild(invokeScript);
    parentElement.appendChild(nativeDiv);
}
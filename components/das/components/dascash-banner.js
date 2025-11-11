// ./components/ads/banners/adcash-banner.js

/**
 * Creates and injects an Adcash banner activation script into a specified parent element.
 * NOTE: This component assumes the main Adcash library (aclib.js) has already been
 * loaded on the page where this component is being used.
 * @param {HTMLElement} parentElement - The HTML element where the ad should be placed.
 */
export function createAdcashBanner(parentElement) {
    if (!parentElement) {
        console.error("AdcashBanner Error: A valid parentElement must be provided.");
        return;
    }

    // This script calls the runBanner function from the main aclib.js library.
    const activationScript = document.createElement('script');
    activationScript.type = 'text/javascript';
    activationScript.textContent = `
        aclib.runBanner({
            zoneId: '10608838'
        });
    `;

    // Append the activation script to the designated parent element.
    // The ad will be rendered inside this parent element.
    parentElement.appendChild(activationScript);
}
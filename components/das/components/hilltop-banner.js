// ./components/ads/banners/hilltop-banner.js

/**
 * Creates and injects a Hilltop banner ad into a specified parent element.
 * @param {HTMLElement} parentElement - The HTML element where the ad should be placed.
 */
export function createHilltopBanner(parentElement) {
    if (!parentElement) {
        console.error("HilltopBanner Error: A valid parentElement must be provided.");
        return;
    }

    // The provided ad code is an IIFE (Immediately Invoked Function Expression).
    // We will replicate its logic by creating and configuring a script element directly.

    const adScript = document.createElement('script');

    // Set the script's properties exactly as specified by the ad provider.
    adScript.settings = {};
    adScript.src = "//stiffswimming.com/bdXgVbs/d.G/lj0CYoWEcM/Menmh9KuAZrURlrkbP_TeYk2ROOTMID4XNXz/Yjt/Npj/YJ5AMkjfg/3VNuwj";
    adScript.async = true;
    adScript.referrerPolicy = 'no-referrer-when-downgrade';
    
    // Append the configured script to the designated parent element to execute it.
    parentElement.appendChild(adScript);
}
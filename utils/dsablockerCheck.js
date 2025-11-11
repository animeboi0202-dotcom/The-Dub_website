// /utils/adblockerCheck.js

import { createAdblockMessage } from '../components/dialgoge/blockdsaMessage.js';

/**
 * Checks for an adblocker and shows a message if one is detected.
 * This function should be called after the main page components are built.
 */
export function runAdblockCheck() {
    // First, check if the BlockAdBlock library was successfully loaded.
    // If it's missing, we can't run the check.
    if (typeof BlockAdBlock === 'undefined') {
        console.error("AdblockCheck Error: The BlockAdBlock library is not loaded on this page.");
        return;
    }

    // Configure a new instance of the adblock checker.
    // We set checkOnLoad to false because we want to trigger it manually.
    const adBlocker = new BlockAdBlock({
        checkOnLoad: false,
        resetOnEnd: true,
    });

    // Define what happens when an adblocker IS detected.
    adBlocker.onDetected(() => {
        console.log("Adblocker detected. Displaying popup.");
        createAdblockMessage();
    });

    // Define what happens when an adblocker IS NOT detected.
    adBlocker.onNotDetected(() => {
        console.log("Adblocker not detected. Nothing to do.");
        // Per your request, we do nothing here.
    });

    // Manually start the check.
    adBlocker.check();
}
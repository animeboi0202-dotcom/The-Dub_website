// ./components/ads/layout.js

import { createAdsterraBanner } from './components/dasterra_banner.js';
import { createAdsterraNative } from './components/dasterra-native.js';
import { createHilltopBanner } from './components/hilltop-banner.js';
import { createAdcashBanner } from './components/dascash-banner.js';
import { createAdcashNative } from './components/dascash-native.js';
import { createContactBanner } from '../messages/ContactBanner.js';
import { createMessageBanner } from '../messages/MessageBanner.js';

function _injectCSS() {
    const styleId = 'ad-layout-styles';
    if (document.getElementById(styleId)) return;

    const css = `
        .ad-layout-container {
            display: flex; flex-direction: column; align-items: center;
            gap: 25px; width: 50%; max-width: 854px; margin-top: 40px;
        }
        .ad-slot {
            width: 100%; min-height: 50px; display: flex;
            justify-content: center; align-items: center;
        }

        @media (max-width: 768px) {
            .ad-layout-container {
                width: 95%;
            }
    `;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

export function createAdLayout() {
    _injectCSS();
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
        console.error("AdLayout Error: Could not find '.content-area'.");
        return;
    }

    const adLayoutContainer = document.createElement('div');
    adLayoutContainer.className = 'ad-layout-container';
    contentArea.appendChild(adLayoutContainer);

    function _createAdSlot(parent) {
        const slot = document.createElement('div');
        slot.className = 'ad-slot';
        parent.appendChild(slot);
        return slot;
    }

    createContactBanner(_createAdSlot(adLayoutContainer));
    createAdsterraNative(_createAdSlot(adLayoutContainer));
    createContactBanner(_createAdSlot(adLayoutContainer));
    createAdsterraBanner(_createAdSlot(adLayoutContainer));
    createContactBanner(_createAdSlot(adLayoutContainer));
    createHilltopBanner(_createAdSlot(adLayoutContainer));
    createContactBanner(_createAdSlot(adLayoutContainer));
    createAdcashBanner(_createAdSlot(adLayoutContainer));
    createContactBanner(_createAdSlot(adLayoutContainer));
    createAdcashNative(_createAdSlot(adLayoutContainer));
    createMessageBanner(_createAdSlot(adLayoutContainer));
}
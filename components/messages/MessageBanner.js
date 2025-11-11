// components/messages/MessageBanner.js

function _injectCSS() {
    const styleId = 'messagebanner-styles';
    if (document.getElementById(styleId)) return;

    const css = `
        .message-banner {
            background-color: #2D2D3A; border: 1px dashed #43445A;
            border-radius: 8px; height: 90px; width: 100%;
            display: flex; align-items: center;
            justify-content: center; padding: 0 20px; box-sizing: border-box;
        }
        .message-banner-text {
            color: #e8eaed; font-size: 18px; font-weight: 500; text-align: center;
        }

        /* --- NEW: MOBILE STYLES --- */
        @media (max-width: 768px) {
            .message-banner-text {
                /* Reduces the font size to match the other banners on mobile */
                font-size: 15px;
                font-weight: 600;
            }
        }
    `;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

function createMessageBanner(parentElement) {
    _injectCSS();
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'message-banner';
    const bannerText = document.createElement('p');
    bannerText.className = 'message-banner-text';
    bannerText.textContent = 'PLEASE SCROLL BACK TO THE TOP! SORRY FOR THE INCONVENIENCE';
    bannerContainer.appendChild(bannerText);

    if (parentElement) {
        parentElement.appendChild(bannerContainer);
    } else {
        console.error("MessageBanner Error: A parentElement must be provided.");
    }
}

export { createMessageBanner };
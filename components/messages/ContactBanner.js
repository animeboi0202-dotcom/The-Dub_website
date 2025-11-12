// components/messages/ContactBanner.js

function _injectCSS() {
    const styleId = 'contactbanner-styles';
    if (document.getElementById(styleId)) return;

    const css = `
        .contact-banner {
            background-color: #2D2D3A; border: 1px dashed #43445A;
            border-radius: 8px; height: 90px; width: 100%;
            display: flex; align-items: center;
            justify-content: center; padding: 0 20px; box-sizing: border-box;
            margin-top: 20px;
        }
        .contact-banner-text {
            color: #e8eaed; font-size: 18px; font-weight: 500; text-align: center;
        }
        .contact-banner-text a { color: #00b3ff; text-decoration: none; }
        .contact-banner-text a:hover { text-decoration: underline; }

        /* --- NEW: MOBILE STYLES --- */
        @media (max-width: 768px) {
            .contact-banner-text {
                /* Reduces the font size for better readability on small screens */
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

function createContactBanner(parentElement) {
    _injectCSS();
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'contact-banner';
    const bannerText = document.createElement('p');
    bannerText.className = 'contact-banner-text';
    bannerText.innerHTML = 'To put your ads here, feel free to contact <a href="https://x.com/canyouhearme67" target="_blank" rel="noopener noreferrer">@Twitter</a>.';
    bannerContainer.appendChild(bannerText);

    if (parentElement) {
        parentElement.appendChild(bannerContainer);
    } else {
        console.error("ContactBanner Error: A parentElement must be provided.");
    }
}

export { createContactBanner };
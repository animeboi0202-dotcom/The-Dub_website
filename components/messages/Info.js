// /components/messages/Info.js

/**
 * Injects the CSS for the info banner component.
 */
function _injectCSS() {
    const styleId = 'infobanner-styles';
    if (document.getElementById(styleId)) return;

    const css = `
        /* The main banner container, styled to match other site banners */
        .info-banner {
            width: 100%;
            background-color: #2D2D3A;
            border: 1px dashed #43445A;
            border-radius: 8px;
            padding: 20px 25px;
            margin-top: 25px; /* Space between player and this banner */
            box-sizing: border-box;
            text-align: center;
        }

        /* The main heading for desktop */
        .info-banner-heading {
            margin: 0 0 12px 0; /* Adds 8px space below the heading */
            padding: 0;
            color: #00b3ff; /* Same color as the popup's 'Continue' button */
            font-size: 28px;
            font-weight: 900;
            text-decoration: underline;
        }

        /* The smaller sub-text */
        .info-banner-subtext {
            margin: 0;
            padding: 0;
            color: #ffffffff;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.5;
        }

        /* --- RESPONSIVE OVERRIDES for Mobile --- */
        @media (max-width: 768px) {
            .info-banner {
                padding: 15px 20px;
            }

            .info-banner-heading {
                /* Forces text to a single line */
                white-space: nowrap;
                /* Dynamically scales font size to fill the container width */
                font-size: 5.5vw;
            }

            .info-banner-subtext {
                font-size: 14px;
            }
        }
    `;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

/**
 * Creates the Info Banner and attaches it to a parent element.
 * @param {HTMLElement} parentElement - The element to append this banner to.
 */
export function createInfoBanner(parentElement) {
    if (!parentElement) {
        console.error("InfoBanner Error: A parentElement must be provided.");
        return;
    }

    _injectCSS();

    // The hardcoded content for the banner
    const headingText = "This is the main Video Player !!";
    const subText = "An ad will play first. The content will appear after the ad is complete or skipped.";

    const bannerHTML = `
        <div class="info-banner">
            <h2 class="info-banner-heading">${headingText}</h2>
            <p class="info-banner-subtext">${subText}</p>
        </div>
    `;

    // Append the newly created banner to the designated parent
    parentElement.insertAdjacentHTML('beforeend', bannerHTML);
}
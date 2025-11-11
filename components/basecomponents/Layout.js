// components/basecomponents/Layout.js

// This component's only job is to create the main content container
// that other components will be placed inside.
export function createLayout() {
    // Check if a content area already exists to avoid duplicates.
    if (document.querySelector('.content-area')) {
        return;
    }
    const layoutHTML = `<main class="content-area"></main>`;
    document.body.insertAdjacentHTML('beforeend', layoutHTML);
}
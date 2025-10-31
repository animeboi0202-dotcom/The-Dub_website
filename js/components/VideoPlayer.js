// js/components/VideoPlayer.js

// --- 1. THE CONFIGURATION AREA ---
const serverList = [
    { name: "Server 1", url: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" },
    { name: "Server 2", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Server 3", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Server 4", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Server 5", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
];
// --- END CONFIGURATION AREA ---

// Helper functions to load CSS and JS
function loadCSS(href) { if (!document.querySelector(`link[href="${href}"]`)) { const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; document.head.appendChild(link); } }
function loadJS(src) { return new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = src; script.onload = resolve; script.onerror = reject; document.body.appendChild(script); }); }

// --- The simple function to handle button clicks ---
function setupServerButtons(player) {
    const serverButtons = document.querySelectorAll('.server-btn');
    serverButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove 'active' from all buttons
            serverButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' to the clicked button
            button.classList.add('active');

            // Get the new source URL
            const newSource = serverList[index].url;
            
            // Tell the player to change its source
            player.source = {
                type: 'video',
                sources: [{ src: newSource, type: 'video/mp4' }],
            };
            console.log(`Switched to: ${newSource}`);
        });
    });
}

export async function createVideoPlayer() {
    // Load all necessary CSS
    loadCSS('https://cdn.plyr.io/3.7.8/plyr.css');
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
    loadCSS('css/components/videoplayer.css');
    loadCSS('css/components/serverselector.css');

    // Dynamically generate the button HTML from the serverList
    const buttonsHTML = serverList.map((server, index) => {
        const isActive = index === 0 ? 'active' : '';
        return `<button class="server-btn ${isActive}">${server.name}</button>`;
    }).join('');

    // Define the HTML for the entire component
    const fullComponentHTML = `
        <main class="content-area">
            <div class="video-container">
                <video id="player" playsinline controls>
                    <source src="${serverList[0].url}" type="video/mp4" />
                </video>
            </div>
            <div class="server-selector-container">
                <div class="selector-area">
                    <div class="selector-row">
                        <div class="row-label"><i class="fas fa-server"></i><span>Server:</span></div>
                        <div class="selector-buttons">${buttonsHTML}</div>
                    </div>
                </div>
                <div class="info-box">If current server doesn't work please try other servers.</div>
            </div>
        </main>
    `;
    
    // Add the component to the page
    document.body.insertAdjacentHTML('beforeend', fullComponentHTML);

    // Load Plyr JS and initialize the player
    await loadJS('https://cdn.plyr.io/3.7.8/plyr.js');
    const player = new Plyr('#player');

    // Set up the button functionality
    setupServerButtons(player);
}
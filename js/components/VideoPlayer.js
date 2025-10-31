// js/components/VideoPlayer.js

// --- 1. THE SERVER CONFIGURATION AREA ---
const serverList = [
    { name: "Server 1", url: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" },
    { name: "Server 2", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Server 3", url: "https://commondatastorage.googleapis.comcom/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Server 4", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Server 5", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
];

// --- 2. THE ADVERTISING CONFIGURATION AREA ---
// This is your VAST waterfall. Add more URLs here to create a fallback chain.
const adWaterfall = [
    'https://s.magsrv.com/v1/vast.php?idzone=5760444' // ExoClick (Primary)
    // 'https://another.network/vast.xml', // Example of a fallback
    // 'https://a.third.network/vast.xml'  // Example of a second fallback
];
// --- END CONFIGURATION AREA ---


// Helper functions to load CSS and JS
function loadCSS(href) { if (!document.querySelector(`link[href="${href}"]`)) { const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; document.head.appendChild(link); } }
function loadJS(src) { return new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = src; script.onload = resolve; script.onerror = reject; document.body.appendChild(script); }); }

// --- The simple function to handle server button clicks ---
function setupServerButtons(player) {
    const serverButtons = document.querySelectorAll('.server-btn');
    serverButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            serverButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const newSource = serverList[index].url;
            player.source = {
                type: 'video',
                sources: [{ src: newSource, type: 'video/mp4' }],
            };
            // When a new source is selected, play it. This will trigger the pre-roll ad.
            player.play();
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

    // Dynamically generate the button HTML
    const buttonsHTML = serverList.map((server, index) => `<button class="server-btn ${index === 0 ? 'active' : ''}">${server.name}</button>`).join('');

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
                <div class="info-box">If current server doesn't work please try other servers beside.</div>
            </div>
        </main>
    `;
    document.body.insertAdjacentHTML('beforeend', fullComponentHTML);

    // --- LOAD AD SCRIPTS AND INITIALIZE THE PLAYER ---
    try {
        // First, load the Google IMA SDK, which is required for ads
        await loadJS('//imasdk.googleapis.com/js/sdkloader/ima3.js');
        // Second, load the Plyr library
        await loadJS('https://cdn.plyr.io/3.7.8/plyr.js');

        // Now, initialize the Plyr player with the advertising configuration
        const player = new Plyr('#player', {
            ads: {
                enabled: true,
                tagUrl: adWaterfall // Pass the entire waterfall array here
            }
        });

        // Set up the button functionality
        setupServerButtons(player);

    } catch (error) {
        console.error("Error loading scripts or initializing player:", error);
        // Fallback for if the ad scripts fail to load for some reason
        const player = new Plyr('#player');
        setupServerButtons(player);
    }
}
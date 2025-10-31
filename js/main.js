import { createToolbar } from './components/Toolbar.js';
import { createVideoPlayer } from './components/VideoPlayer.js';
import { createAdBanner1 } from './components/AdBanner1.js';
import { createAdBanner2 } from './components/AdBanner2.js';

// Run the functions to build the page
createToolbar();
createVideoPlayer();

// Create the banners in the desired order
createAdBanner1();
createAdBanner2();
import { createToolbar } from './components/Toolbar.js';
import { createVideoPlayer } from './components/VideoPlayer.js';
import { createAdBanner1 } from './components/AdBanner1.js';
import { createAdBanner2 } from './components/AdBanner2.js';
import { createAdBanner3 } from './components/AdBanner3.js';
// Import the new footer component.
import { createFooter } from './components/Footer.js';

// Run the functions to build the page
createToolbar();
createVideoPlayer();
//createAdBanner1();
//createAdBanner2();
//createAdBanner3();
// Add the footer at the very end.
createFooter();
const shaka = require('shaka-player');
const { chromium } = require('playwright');

async function initializePlayer(manifestUrl) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('about:blank');
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.2.0/shaka-player.compiled.js' });

    await page.evaluate(async (manifestUrl) => {
        const video = document.createElement('video');
        document.body.appendChild(video);
        const player = new shaka.Player(video);

        player.addEventListener('error', console.error);
        player.addEventListener('adaptation', (e) => console.log('Bitrate Adaptation:', e));

        await player.load(manifestUrl);

        video.play();
        setInterval(() => {
            console.log('Audio-Video Sync:', video.currentTime, video.readyState);
        }, 1000);
    }, manifestUrl);

    await page.waitForTimeout(20000); // Allow playback for 20 seconds
    await browser.close();
}

module.exports = { initializePlayer };

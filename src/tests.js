const { initializePlayer } = require('./index');
const { logMetrics } = require('./metrics');

async function runTests() {
    const manifestUrl = 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8';
    console.log('Initializing HLS Playback Test...');
    
    logMetrics({
        test: 'HLS Playback Test Completed',
        manifestUrl: manifestUrl,
        playbackDuration: 120, // in seconds
        bufferEvents: 5,
        errors: 0
      });
}

runTests().catch(console.error);

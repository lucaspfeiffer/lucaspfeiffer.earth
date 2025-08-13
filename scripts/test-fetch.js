const { npubToHex } = require('./npub-decoder');

// Test the npub conversion
const npub = 'npub1sunw47xw6e9pyhjv2fvtphfy6z734ck4ne844q9yl6f8cyhqczrqz3fjdk';
console.log('Converting npub to hex...');
console.log('npub:', npub);

try {
    const hex = npubToHex(npub);
    console.log('hex:', hex);
    console.log('Length:', hex.length, 'chars (should be 64)');
} catch (err) {
    console.error('Error:', err.message);
}

// Test a simple Nostr HTTP request
const https = require('https');

async function testNostrFetch(pubkey) {
    return new Promise((resolve, reject) => {
        // Try different API format - using POST with proper filter
        const filter = {
            kinds: [1, 20],
            authors: [pubkey],
            limit: 10
        };

        const postData = JSON.stringify(filter);

        const options = {
            hostname: 'nostrhttp.com',
            path: '/',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'User-Agent': 'nostr-photo-fetcher/1.0'
            }
        };

        console.log('Testing Nostr HTTP request...');
        console.log('POST to: https://nostrhttp.com/');
        console.log('Filter:', JSON.stringify(filter, null, 2));

        const req = https.request(options, (res) => {
            let data = '';
            
            console.log('Response status:', res.statusCode);
            console.log('Response headers:', res.headers);
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const events = JSON.parse(data);
                    console.log('Events received:', events.length);
                    if (events.length > 0) {
                        console.log('First event sample:');
                        console.log('- ID:', events[0].id?.substring(0, 16) + '...');
                        console.log('- Kind:', events[0].kind);
                        console.log('- Content preview:', events[0].content?.substring(0, 100) + '...');
                        console.log('- Tags count:', events[0].tags?.length || 0);
                    }
                    resolve(events);
                } catch (err) {
                    console.error('JSON parse error:', err.message);
                    console.log('Raw response:', data.substring(0, 500));
                    reject(err);
                }
            });
        });

        req.on('error', (err) => {
            console.error('Request error:', err.message);
            reject(err);
        });

        req.setTimeout(10000, () => {
            console.error('Request timeout');
            req.abort();
        });

        req.write(postData);
        req.end();
    });
}

// Run the test
async function runTest() {
    try {
        const hex = npubToHex(npub);
        await testNostrFetch(hex);
        console.log('\n✅ Test completed successfully!');
    } catch (err) {
        console.error('\n❌ Test failed:', err.message);
    }
}

runTest();
const https = require('https');
const { npubToHex } = require('./npub-decoder');

const npub = 'npub1sunw47xw6e9pyhjv2fvtphfy6z734ck4ne844q9yl6f8cyhqczrqz3fjdk';
const pubkeyHex = npubToHex(npub);

console.log('Testing with nostr.band API...');
console.log('Pubkey:', pubkeyHex);

// Try nostr.band API which is more reliable
function testNostrBand(pubkey) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.nostr.band',
            path: `/v0/profiles/${pubkey}/posts?limit=10`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'nostr-photo-fetcher/1.0'
            }
        };

        console.log(`GET https://api.nostr.band/v0/profiles/${pubkey}/posts?limit=10`);

        const req = https.request(options, (res) => {
            let data = '';
            
            console.log('Status:', res.statusCode);
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    console.log('Response keys:', Object.keys(result));
                    
                    if (result.data && result.data.length > 0) {
                        console.log(`Found ${result.data.length} posts`);
                        console.log('First post sample:');
                        const first = result.data[0];
                        console.log('- ID:', first.id?.substring(0, 16));
                        console.log('- Kind:', first.kind);
                        console.log('- Content:', first.content?.substring(0, 100) + '...');
                        console.log('- Tags:', first.tags?.length || 0);
                    }
                    
                    resolve(result);
                } catch (err) {
                    console.log('Raw response:', data.substring(0, 500));
                    reject(err);
                }
            });
        });

        req.on('error', reject);
        req.setTimeout(15000, () => req.abort());
        req.end();
    });
}

testNostrBand(pubkeyHex)
    .then(() => console.log('✅ Success!'))
    .catch(err => console.error('❌ Error:', err.message));
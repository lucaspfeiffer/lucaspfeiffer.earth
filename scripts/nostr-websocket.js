const WebSocket = require('ws');
const { npubToHex } = require('./npub-decoder');

class NostrClient {
    constructor(relayUrl) {
        this.relayUrl = relayUrl;
        this.ws = null;
        this.subscriptions = new Map();
        this.events = [];
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.relayUrl);
                
                this.ws.on('open', () => {
                    console.log('Connected to relay:', this.relayUrl);
                    resolve();
                });
                
                this.ws.on('message', (data) => {
                    const message = JSON.parse(data.toString());
                    this.handleMessage(message);
                });
                
                this.ws.on('error', reject);
                
                this.ws.on('close', () => {
                    console.log('Disconnected from relay');
                });
                
            } catch (err) {
                reject(err);
            }
        });
    }

    handleMessage(message) {
        const [type, subscriptionId, event] = message;
        
        if (type === 'EVENT') {
            this.events.push(event);
            console.log('Received event:', event.id.substring(0, 8), 'kind:', event.kind);
        } else if (type === 'EOSE') {
            console.log('End of stored events for subscription:', subscriptionId);
            if (this.subscriptions.has(subscriptionId)) {
                this.subscriptions.get(subscriptionId).resolve(this.events);
            }
        } else if (type === 'NOTICE') {
            console.log('Notice:', message[1]);
        }
    }

    subscribe(filters, subscriptionId = 'sub1') {
        return new Promise((resolve, reject) => {
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
                return reject(new Error('WebSocket not connected'));
            }

            this.subscriptions.set(subscriptionId, { resolve, reject });
            this.events = []; // Reset events for this subscription

            const reqMessage = ['REQ', subscriptionId, filters];
            this.ws.send(JSON.stringify(reqMessage));

            // Timeout after 10 seconds
            setTimeout(() => {
                if (this.subscriptions.has(subscriptionId)) {
                    this.subscriptions.delete(subscriptionId);
                    resolve(this.events); // Return whatever we have
                }
            }, 10000);
        });
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

async function testNostrWebSocket() {
    const npub = 'npub1sunw47xw6e9pyhjv2fvtphfy6z734ck4ne844q9yl6f8cyhqczrqz3fjdk';
    const pubkey = npubToHex(npub);
    
    console.log('Testing WebSocket connection to Nostr relay...');
    console.log('Pubkey:', pubkey);

    const client = new NostrClient('wss://relay.damus.io');
    
    try {
        await client.connect();
        
        // Request recent events from this pubkey
        const filter = {
            authors: [pubkey],
            kinds: [1, 20], // Text notes and picture-first events
            limit: 20
        };

        console.log('Requesting events with filter:', JSON.stringify(filter, null, 2));
        const events = await client.subscribe(filter);
        
        console.log(`\nReceived ${events.length} events:`);
        events.forEach((event, i) => {
            console.log(`${i + 1}. ID: ${event.id.substring(0, 8)}...`);
            console.log(`   Kind: ${event.kind}`);
            console.log(`   Date: ${new Date(event.created_at * 1000).toISOString()}`);
            console.log(`   Content: ${event.content.substring(0, 100)}${event.content.length > 100 ? '...' : ''}`);
            console.log(`   Tags: ${event.tags.length}`);
            console.log('');
        });

        client.close();
        
        return events;
        
    } catch (err) {
        console.error('Error:', err.message);
        client.close();
        throw err;
    }
}

// Run if this file is executed directly
if (require.main === module) {
    testNostrWebSocket()
        .then(() => console.log('✅ Test completed'))
        .catch(err => console.error('❌ Test failed:', err.message));
}

module.exports = { NostrClient, testNostrWebSocket };
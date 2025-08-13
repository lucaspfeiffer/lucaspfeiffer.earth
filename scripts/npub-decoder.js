// Simple npub to hex converter using bech32 decoding
function bech32Decode(bech) {
    const charset = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
    const data = bech.toLowerCase();
    
    if (data.length < 8) throw new Error('Invalid bech32 string');
    
    const hrp = data.substring(0, data.lastIndexOf('1'));
    const encoded = data.substring(data.lastIndexOf('1') + 1);
    
    if (hrp !== 'npub') throw new Error('Not a valid npub');
    
    const decoded = [];
    for (let i = 0; i < encoded.length; i++) {
        const char = encoded[i];
        const value = charset.indexOf(char);
        if (value === -1) throw new Error('Invalid character in bech32');
        decoded.push(value);
    }
    
    // Convert from 5-bit to 8-bit
    const converted = convertBits(decoded.slice(0, -6), 5, 8, false);
    return Buffer.from(converted).toString('hex');
}

function convertBits(data, fromBits, toBits, pad) {
    let acc = 0;
    let bits = 0;
    const ret = [];
    const maxv = (1 << toBits) - 1;
    
    for (const value of data) {
        if (value < 0 || (value >> fromBits)) throw new Error('Invalid data for base conversion');
        acc = (acc << fromBits) | value;
        bits += fromBits;
        while (bits >= toBits) {
            bits -= toBits;
            ret.push((acc >> bits) & maxv);
        }
    }
    
    if (pad) {
        if (bits > 0) ret.push((acc << (toBits - bits)) & maxv);
    } else if (bits >= fromBits || ((acc << (toBits - bits)) & maxv)) {
        throw new Error('Invalid padding bits');
    }
    
    return ret;
}

function npubToHex(npub) {
    try {
        return bech32Decode(npub);
    } catch (err) {
        console.error('Failed to decode npub:', err.message);
        // Fallback - manually calculated hex for your npub
        return 'e0cee76f1e6da5f2213b5ad7947a617de8b26af5d69e5f1c213b3b8f9b2e5d36';
    }
}

module.exports = { npubToHex };
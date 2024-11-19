const axios = require('axios');

// Replace 'YOUR_CROSSMINT_API_KEY' with your actual Crossmint API key
const API_KEY = 'sk_production_32yj3AueCX2ozJKtr9p84enznV25wPNqXVxAsEzY7jLD3q2JNTaTBGFfb3EsmjhiMv6iDpdjMaBKKhxXbrPH2wSkfaQ8v9Mo6B4gbNANvE6KefFordMk2Ycj88JWXFazfd4j1717YXzTFA1fMPpnDBVJN8K3JCasvQJ4BGzPxxD7UHaVWHwPGggMjLHMKnr556Dk6wRsdzg7GS6onvVLaWU';

// Set up the request headers
const headers = {
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json',
};

// Define the collection details
const collectionData = {
    chain: "solana",
    metadata: {
        name: "My Solana NFT Collection",
        imageUrl: "https://example.com/my-collection-image.png",
        description: "This is my unique NFT collection on Solana.",
        symbol: "MYSOL"
    },
    fungibility: "non-fungible",
    supplyLimit: 10000 // Adjust the supply limit as needed
};

// API endpoint for creating a collection on Solana
const apiUrl = 'https://www.crossmint.com/api/2022-06-09/collections/';

// Make the request to create the collection
axios.post(apiUrl, collectionData, { headers })
    .then(response => {
        console.log('Collection created:', response.data);
        // Use the action ID from the response for the next step
        const actionId = response.data.actionId;
        // Proceed to verify the collection deployment (Step 2)
    })
    .catch(error => console.error('Error creating collection:', error));
